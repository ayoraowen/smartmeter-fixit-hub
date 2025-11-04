import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAllBehaviors } from "@/data/behaviorData";
import { Search, Plus, AlertTriangle } from "lucide-react";

export default function MeterBehaviors() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");
  const behaviors = getAllBehaviors();

  const filteredBehaviors = behaviors.filter(behavior => {
    const matchesSearch = 
      behavior.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      behavior.meterBrand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      behavior.meterModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      behavior.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = selectedSeverity === "all" || behavior.severity === selectedSeverity;
    
    return matchesSearch && matchesSeverity;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "destructive";
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "default";
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Behaviour Guides</h1>
              <p className="text-muted-foreground">
                Browse reported meter behaviours, issues, and their solutions
              </p>
            </div>
            <Button onClick={() => navigate("/behaviors/create")}>
              <Plus className="mr-2 h-4 w-4" />
              Report Behaviour
            </Button>
          </div>

          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search behaviour guides..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredBehaviors.length === 0 ? (
          <Card className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No behaviour guides found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filters
            </p>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredBehaviors.map((behavior) => (
              <Card key={behavior.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{behavior.title}</h3>
                      <Badge variant={getSeverityColor(behavior.severity)}>
                        {behavior.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {behavior.meterBrand} - {behavior.meterModel}
                    </p>
                    <p className="text-muted-foreground">{behavior.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>{behavior.symptoms.length} symptoms</span>
                    <span>{behavior.solutions.length} solutions</span>
                    <span>Reported: {behavior.dateReported}</span>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/behaviors/${behavior.id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
