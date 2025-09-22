import { useState } from "react";
import { Search, AlertCircle, Info, AlertTriangle, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";

export default function ErrorCodes() {
  const [searchTerm, setSearchTerm] = useState("");

  const errorCodes = [
    {
      code: "E001",
      category: "Communication",
      severity: "high",
      title: "Communication Timeout",
      description: "Failed to establish communication with the meter within the specified timeout period.",
      causes: ["Network connectivity issues", "Firewall blocking", "Meter not responding"],
      resolution: "Check network cables, verify meter power, restart communication module"
    },
    {
      code: "E101",
      category: "Hardware",
      severity: "critical",
      title: "Hardware Failure Detected",
      description: "Internal hardware component has failed and requires immediate attention.",
      causes: ["Component aging", "Power surge damage", "Manufacturing defect"],
      resolution: "Replace the meter unit or contact technical support for advanced diagnostics"
    },
    {
      code: "E205",
      category: "Power",
      severity: "medium",
      title: "Voltage Out of Range",
      description: "Measured voltage is outside the acceptable operating range.",
      causes: ["Grid voltage fluctuation", "Loose connections", "Transformer issues"],
      resolution: "Check electrical connections, verify grid voltage, inspect transformer"
    },
    {
      code: "E301",
      category: "Configuration",
      severity: "low",
      title: "Configuration Mismatch",
      description: "Meter configuration does not match the expected parameters.",
      causes: ["Manual configuration error", "Firmware update issue", "Factory reset"],
      resolution: "Reconfigure meter parameters using the configuration tool"
    },
    {
      code: "E402",
      category: "Security",
      severity: "high",
      title: "Authentication Failed",
      description: "Failed to authenticate user credentials or certificates.",
      causes: ["Expired certificates", "Wrong credentials", "Security module failure"],
      resolution: "Update certificates, verify credentials, check security module status"
    },
    {
      code: "E503",
      category: "Data",
      severity: "medium",
      title: "Data Corruption Detected",
      description: "Stored data integrity check failed, indicating potential corruption.",
      causes: ["Memory failure", "Power interruption during write", "Software bug"],
      resolution: "Run data recovery procedure, verify backup integrity, update firmware"
    }
  ];

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <XCircle className="h-4 w-4 text-destructive" />;
      case "high":
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "medium":
        return <AlertCircle className="h-4 w-4 text-accent" />;
      case "low":
        return <Info className="h-4 w-4 text-primary" />;
      default:
        return <Info className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case "critical":
        return "destructive";
      case "high":
        return "default";
      case "medium":
        return "secondary";
      case "low":
        return "outline";
      default:
        return "outline";
    }
  };

  const filteredCodes = errorCodes.filter(error =>
    error.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    error.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    error.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    error.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <AlertCircle className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Error Code Library</h1>
        </div>
        <p className="text-lg text-muted-foreground">Comprehensive database of smart meter error codes and solutions</p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-lg">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search error codes, descriptions, or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Error Code Cards */}
      <div className="space-y-4">
        {filteredCodes.map((error) => (
          <Card key={error.code} className="hover:shadow-card transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-technical/10 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-technical">{error.code}</span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{error.title}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline">{error.category}</Badge>
                      <div className="flex items-center space-x-1">
                        {getSeverityIcon(error.severity)}
                        <Badge variant={getSeverityVariant(error.severity) as any}>
                          {error.severity}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">{error.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Common Causes</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {error.causes.map((cause, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          {cause}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Resolution Steps</h4>
                    <p className="text-sm text-muted-foreground">{error.resolution}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCodes.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No error codes found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria</p>
        </div>
      )}
      </div>
    </Layout>
  );
}