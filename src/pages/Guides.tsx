import { useState } from "react";
import { Search, Book, Clock, Star, ChevronRight, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { getAllGuides } from "@/data/guideData";

export default function Guides() {
  const [searchTerm, setSearchTerm] = useState("");
  const guides = getAllGuides();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "success";
      case "Intermediate":
        return "warning";
      case "Advanced":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const filteredGuides = guides.filter(guide =>
    guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Book className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Troubleshooting Guides</h1>
          </div>
          <Link to="/guides/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Guide
            </Button>
          </Link>
        </div>
        <p className="text-lg text-muted-foreground">Expert-verified step-by-step solutions</p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-lg">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search guides by title, category, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Guides List */}
      <div className="space-y-4">
        {filteredGuides.map((guide) => (
          <Card key={guide.id} className="hover:shadow-card transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{guide.title}</CardTitle>
                  <p className="text-muted-foreground text-sm mb-3">{guide.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline">{guide.category}</Badge>
                    <Badge variant={getDifficultyColor(guide.difficulty) as any}>
                      {guide.difficulty}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {guide.duration}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="h-3 w-3 mr-1 fill-warning text-warning" />
                      {guide.rating} ({guide.votes} votes)
                    </div>
                  </div>
                </div>
                
                <Link to={`/guides/${guide.id}`}>
                  <Button variant="outline" size="sm">
                    View Guide
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <span>By {guide.author}</span>
                  <span>{guide.steps.length} steps</span>
                </div>
                <span>Updated {guide.lastUpdated}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredGuides.length === 0 && (
        <div className="text-center py-12">
          <Book className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No guides found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria</p>
        </div>
      )}
      </div>
    </Layout>
  );
}