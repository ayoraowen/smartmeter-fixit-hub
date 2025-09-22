import { Header } from "@/components/layout/Header";
import { Navigation } from "@/components/layout/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { QuickAccess } from "@/components/sections/QuickAccess";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      <HeroSection />
      <QuickAccess />
    </div>
  );
};

export default Index;
