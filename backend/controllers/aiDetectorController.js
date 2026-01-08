import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// AI detection algorithm based on ZeroGPT principles (Legacy Heuristic Mode)
import { mlService } from '../services/mlService.js';

export const detectAIContent = (text) => {
    // Basic Sentence Splitting (Legacy Regex)
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];

    let totalAIScore = 0;
    const sentenceBreakdown = []; // Mapped from "highlightedSentences"

    sentences.forEach((sentence) => {
        const trimmed = sentence.trim();
        if (!trimmed) return;

        let aiScore = 0;

        // 1. Check for AI patterns - repetitive sentence structures
        const words = trimmed.split(/\s+/);
        const avgWordLength = words.reduce((sum, w) => sum + w.length, 0) / (words.length || 1);

        // 2. AI tends to use consistent word lengths (Paranoid Mode: 5-9 chars is suspect)
        if (avgWordLength > 4.5 && avgWordLength < 9.5) aiScore += 30; // WAS 25. Punish "average" vocabulary hard.

        // 2b. Check for lack of contractions (Critical for ZeroGPT)
        const contractionPattern = /(n't|'s|'re|'ve|'ll|'d|'m)/g;
        const hasContractions = contractionPattern.test(trimmed);
        if (!hasContractions && words.length > 6) aiScore += 30; // WAS 25. Stricter.

        // 3. Check for AI-typical words and phrases (Expanded Blacklist)
        const aiWords = [
            "furthermore", "moreover", "however", "therefore", "consequently",
            "utilize", "implement", "facilitate", "leverage", "optimize",
            "in conclusion", "it is important to note", "in today's world",
            "in summary", "additionally", "subsequently", "delve", "tapestry",
            "strategic", "vision", "operational", "discipline", "transformative",
            "foster", "landscape", "realm", "underscores", "showcases",
            "pivotal", "critical", "significant", "emphasis", "focuses on",
            "aims to", "serves as", "highlights", "demonstrates"
        ];
        const lowerSentence = trimmed.toLowerCase();
        aiWords.forEach(word => {
            if (lowerSentence.includes(word)) aiScore += 20; // WAS 15. Heavy penalty for ANY buzzword.
        });

        // 4. Check sentence length uniformity (AI tends to be consistent)
        // PARANOID: AI usually writes 15-25 words. Punish that range.
        if (words.length >= 10 && words.length <= 35) aiScore += 25; // WAS 20.

        // 5. Check for perfect grammar/punctuation (Humans use dashes, semi-colons, parentheses)
        const hasTypicalHumanImperfections = /(\.\.\.|—|;|:|\(|\))/.test(trimmed);
        if (!hasTypicalHumanImperfections && words.length > 8) aiScore += 25; // WAS 20. Encourage complex punctuation.

        // 6. Check for repetitive sentence starters (The, This, It)
        const startsWithCommon = /^(The |This |It |There |In |As |For |With )/i.test(trimmed);
        if (startsWithCommon) aiScore += 15; // WAS 10.

        // 7. Check for overly formal tone
        const formalPatterns = /(one must|one should|it is essential|it is crucial|one can)/i;
        if (formalPatterns.test(lowerSentence)) aiScore += 15;

        // 8. Check for lack of personal voice
        const personalPatterns = /(I |we |you |honestly|actually|really|probably|sort of|kind of)/i;
        const hasPersonalVoice = personalPatterns.test(trimmed);
        if (!hasPersonalVoice && words.length > 12) aiScore += 15;

        // Cap the score at 100
        aiScore = Math.min(aiScore, 100);
        totalAIScore += aiScore;

        // Mark for frontend
        sentenceBreakdown.push({
            text: trimmed,
            score: aiScore // Passing the raw score instead of boolean for better UI
        });
    });

    const aiPercentage = Math.min((totalAIScore / (sentences.length * 100)) * 100, 100);
    const humanPercentage = 100 - aiPercentage;

    return {
        aiScore: aiPercentage,
        humanScore: humanPercentage,
        sentenceBreakdown,
        details: { mode: "legacy-heuristic" }
    };
};

export const detectAI = (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: "Text required" });

        console.log("Analyzing (Legacy Mode)... Length:", text.length);
        const result = detectAIContent(text);

        // INTEGRATE ML SERVICE
        if (mlService.isTrained) {
            console.log("ML Model is trained. Applying ML correction...");
            const humanProbability = mlService.getHumanScore(text); // 0.0 to 1.0 (1.0 = Human)
            const mlAiScore = Math.max(0, (1 - humanProbability) * 100);

            console.log(`Heuristic Score: ${result.aiScore}, ML Score: ${mlAiScore.toFixed(2)}`);

            // Store details
            result.heuristicScore = result.aiScore;
            result.mlScore = mlAiScore;

            // Weighted Blend (50/50) - Adjust as needed
            // If the user explicitly trained it, they likely trust the ML "match" more.
            // But let's be conservative.
            result.aiScore = (result.aiScore * 0.4) + (mlAiScore * 0.6); // Give ML slightly more weight (60%)
            result.details.mode = "hybrid-ml-heuristic";
        } else {
            console.log("ML Model not trained. Using Heuristic only.");
        }

        console.log("Final Report Result:", result.aiScore.toFixed(2), "%");

        res.json(result);
    } catch (e) {
        console.error("Detector Error:", e);
        res.status(500).json({ error: e.message });
    }
};
