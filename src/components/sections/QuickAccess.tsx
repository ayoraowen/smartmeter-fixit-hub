import { ArrowRight, AlertTriangle, Wrench, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function QuickAccess() {
  const quickLinks = [
    {
      title: "Common Issues",
      description: "Most frequently reported meter problems",
      icon: AlertTriangle,
      variant: "default" as const,
      items: ["Communication failures", "Display errors", "Power issues", "Billing discrepancies"]
    },
    {
      title: "Popular Guides",
      description: "Highest-rated troubleshooting procedures",
      icon: Wrench,
      variant: "secondary" as const,
      items: ["Reset procedures", "Network configuration", "Firmware updates", "Hardware diagnostics"]
    },
    {
      title: "New Resources",
      description: "Recently added documentation",
      icon: FileText,
      variant: "outline" as const,
      items: ["v2.1 meter guides", "Security patches", "IoT connectivity", "Advanced diagnostics"]
    }
  ];

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">Quick Access</h2>
          <p className="text-lg text-muted-foreground">Jump straight to what you need</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {quickLinks.map((section, index) => (
            <Card key={index} className="hover:shadow-elevated transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <section.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{section.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-sm text-muted-foreground">
                      <ArrowRight className="h-3 w-3 mr-2 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button variant={section.variant} className="w-full">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}