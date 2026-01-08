import { Layout } from "@/components/layout/Layout";
import { Logo } from "@/components/layout/Logo";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Wand2, Shield, Zap, Target } from "lucide-react";

export default function About() {
  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Logo size="lg" showSubtitle />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              About PL Humanize
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A powerful suite of AI text transformation tools designed to help you create natural, human-like content from AI-generated text.
            </p>
          </div>

          {/* Mission Section */}
          <div className="bg-card rounded-2xl border border-border p-8 shadow-card mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              At PL Humanize, we believe that AI-assisted writing should sound natural and authentic. Our mission is to bridge the gap between AI-generated content and human-like writing, providing tools that transform robotic prose into engaging, genuine text.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our advanced multi-pass humanization engine uses sophisticated natural language processing techniques to preserve your original meaning while eliminating the telltale signs of AI-generated content.
            </p>
          </div>

          {/* Features Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              What Makes Us Different
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <FeatureCard
                icon={<Wand2 className="h-6 w-6" />}
                title="Multi-Pass Engine"
                description="Our 3-pass humanization process includes semantic rewriting, structural disruption, and human tone polishing for maximum effectiveness."
              />
              <FeatureCard
                icon={<Target className="h-6 w-6" />}
                title="Smart Optimization"
                description="Automatic humanization that keeps refining until your text scores below the AI detection threshold."
              />
              <FeatureCard
                icon={<Shield className="h-6 w-6" />}
                title="Structure Preservation"
                description="We maintain your original paragraph structure, never merging or splitting paragraphs while rewriting content."
              />
              <FeatureCard
                icon={<Zap className="h-6 w-6" />}
                title="PL AI Detector"
                description="Built-in AI detection with sentence-level analysis to help you understand and improve your content."
              />
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-muted/50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              Our 3-Pass System
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full gradient-primary text-primary-foreground font-bold flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Semantic Rewrite
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Changes vocabulary and phrasing to break direct paraphrasing patterns and linear word-by-word similarity.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full gradient-primary text-primary-foreground font-bold flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Structural Disruption
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Reorders sentence fragments and clauses within paragraphs, adjusting flow to avoid AI token patterns.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full gradient-primary text-primary-foreground font-bold flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Human Tone Polish
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Adds human rhythm, natural transitions, contractions, and removes overly formal or academic tones.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
