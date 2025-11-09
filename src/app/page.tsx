import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-background">
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Phone className="w-6 h-6 text-foreground" />
            <span className="text-xl font-semibold text-foreground">React Dialer</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button>
                Login
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
            Professional VoIP Dialer
            <br />
            <span className="text-muted-foreground">
              Powered by Asterisk
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Make crystal-clear calls directly from your browser. 
            Integrated with FreePBX and Asterisk for enterprise-grade reliability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Link href="/login">
              <Button size="lg" className="text-lg px-8 py-6">
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
          <div className="glass-card rounded-xl p-6">
            <Phone className="w-8 h-8 mb-4 text-foreground" />
            <h3 className="text-xl font-semibold mb-2 text-foreground">Browser-Based</h3>
            <p className="text-muted-foreground">
              No downloads required. Make calls directly from your browser using WebRTC.
            </p>
          </div>
          <div className="glass-card rounded-xl p-6">
            <Phone className="w-8 h-8 mb-4 text-foreground" />
            <h3 className="text-xl font-semibold mb-2 text-foreground">Asterisk Integration</h3>
            <p className="text-muted-foreground">
              Seamlessly integrated with Asterisk and FreePBX for enterprise telephony.
            </p>
          </div>
          <div className="glass-card rounded-xl p-6">
            <Phone className="w-8 h-8 mb-4 text-foreground" />
            <h3 className="text-xl font-semibold mb-2 text-foreground">Crystal Clear</h3>
            <p className="text-muted-foreground">
              High-quality audio with JsSIP library for reliable SIP connections.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
