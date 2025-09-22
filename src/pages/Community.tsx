import { Users, MessageSquare, Trophy, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

export default function Community() {
  const topContributors = [
    { name: "Mike Chen", role: "Senior Technician", contributions: 47, rating: 4.9 },
    { name: "Sarah Johnson", role: "Field Engineer", contributions: 35, rating: 4.8 },
    { name: "Alex Rodriguez", role: "Technical Lead", contributions: 29, rating: 4.7 },
    { name: "Emily Davis", role: "Support Specialist", contributions: 24, rating: 4.6 }
  ];

  const recentDiscussions = [
    {
      title: "New firmware update causing display issues",
      author: "TechSupport_Sam",
      replies: 12,
      category: "Hardware",
      timeAgo: "2 hours ago"
    },
    {
      title: "Best practices for meter calibration",
      author: "Calibration_Expert",
      replies: 8,
      category: "Maintenance",
      timeAgo: "5 hours ago"
    },
    {
      title: "IoT connectivity troubleshooting checklist",
      author: "Network_Ninja",
      replies: 15,
      category: "Network",
      timeAgo: "1 day ago"
    }
  ];

  const stats = [
    { label: "Active Members", value: "1,247", icon: Users },
    { label: "Discussions", value: "3,892", icon: MessageSquare },
    { label: "Solutions Verified", value: "15,634", icon: Trophy },
    { label: "Issues Resolved", value: "89%", icon: TrendingUp }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Users className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Community</h1>
        </div>
        <p className="text-lg text-muted-foreground">Connect with fellow technicians and share knowledge</p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6 text-center">
              <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Discussions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Recent Discussions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDiscussions.map((discussion, index) => (
                  <div key={index} className="border-b border-border last:border-0 pb-4 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-foreground hover:text-primary cursor-pointer">
                        {discussion.title}
                      </h3>
                      <Badge variant="outline">{discussion.category}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>By {discussion.author}</span>
                      <div className="flex items-center space-x-4">
                        <span>{discussion.replies} replies</span>
                        <span>{discussion.timeAgo}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Discussions
              </Button>
            </CardContent>
          </Card>

          {/* Getting Started */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-medium text-foreground mb-2">For Technicians</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Share your field experience and help others solve complex meter issues.
                  </p>
                  <Button size="sm">Join as Technician</Button>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-medium text-foreground mb-2">For Utility Staff</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Access verified solutions and contribute to organizational knowledge.
                  </p>
                  <Button size="sm" variant="secondary">Register Organization</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Contributors */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5" />
                <span>Top Contributors</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topContributors.map((contributor, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">#{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{contributor.name}</div>
                      <div className="text-xs text-muted-foreground">{contributor.role}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground">{contributor.contributions}</div>
                      <div className="text-xs text-muted-foreground">★ {contributor.rating}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View Leaderboard
              </Button>
            </CardContent>
          </Card>

          {/* Community Guidelines */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Community Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Verify solutions before sharing</li>
                <li>• Include meter model and firmware version</li>
                <li>• Use clear step-by-step instructions</li>
                <li>• Add safety warnings when necessary</li>
                <li>• Respect confidential information</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </Layout>
  );
}