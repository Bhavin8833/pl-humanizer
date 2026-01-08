import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Wand2, RefreshCcw, Search, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary-lr opacity-[0.03]" />
        <div className="container py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Humanize AI Content{" "}
              <span className="gradient-primary-text">Instantly</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Convert AI-written text into natural human-like content. Our advanced multi-pass engine transforms robotic prose into authentic, engaging writing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gradient" size="xl" asChild>
                <Link to="/humanize">
                  Start Humanizing
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="gradient-outline" size="xl" asChild>
                <Link to="/ai-detector">
                  Check AI Score
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16 md:py-20">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Powerful AI Text Tools
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Everything you need to transform and analyze AI-generated content
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Link to="/humanize" className="block h-full">
            <FeatureCard
              icon={<Wand2 className="h-6 w-6" />}
              title="AI Humanizer"
              description="Transform AI-written text into natural, human-like content using our advanced multi-pass humanization engine."
              className="h-full"
            />
          </Link>

          <Link to="/paraphrase" className="block h-full">
            <FeatureCard
              icon={<RefreshCcw className="h-6 w-6" />}
              title="Paraphrase Tool"
              description="Rewrite your text with fresh vocabulary and improved clarity while preserving the original meaning."
              className="h-full"
            />
          </Link>

          <Link to="/ai-detector" className="block h-full">
            <FeatureCard
              icon={<Search className="h-6 w-6" />}
              title="PL AI Detector"
              description="Analyze text to detect AI-generated content with detailed scoring and sentence-level breakdown."
              className="h-full"
            />
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-muted/50 py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              How It Works
            </h2>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full gradient-primary text-primary-foreground text-xl font-bold flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-foreground mb-2">Paste Your Text</h3>
              <p className="text-sm text-muted-foreground">
                Enter your AI-generated content into the input box
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full gradient-primary text-primary-foreground text-xl font-bold flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-foreground mb-2">Choose Your Mode</h3>
              <p className="text-sm text-muted-foreground">
                Select different modes like Academic, Professional, or Casual to tailor the output
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full gradient-primary text-primary-foreground text-xl font-bold flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-foreground mb-2">Get Human Text</h3>
              <p className="text-sm text-muted-foreground">
                Receive natural, human-like content ready to use
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
