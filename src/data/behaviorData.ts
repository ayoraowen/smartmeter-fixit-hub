export interface MeterBehavior {
  id: string;
  meterId: number;
  meterBrand: string;
  meterModel: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  symptoms: string[];
  solutions: string[];
  dateReported: string;
  reportedBy?: string;
}

const defaultBehaviors: MeterBehavior[] = [
  {
    id: "1",
    meterId: 1,
    meterBrand: "Schneider Electric",
    meterModel: "ION 7550",
    title: "Communication Timeout",
    description: "Meter stops responding to Modbus queries intermittently",
    severity: "high",
    symptoms: [
      "No response to TCP requests",
      "Error logs showing timeout",
      "Connection drops randomly"
    ],
    solutions: [
      "Check network cable connection",
      "Verify IP address configuration",
      "Update firmware to latest version",
      "Reduce polling frequency"
    ],
    dateReported: "2024-10-15",
    reportedBy: "System Admin"
  },
  {
    id: "2",
    meterId: 2,
    meterBrand: "Siemens",
    meterModel: "Sentron PAC3200",
    title: "Display Flickering",
    description: "LCD display flickers during high load conditions",
    severity: "medium",
    symptoms: [
      "Display becomes unreadable",
      "Occurs during peak hours",
      "Backlight issues"
    ],
    solutions: [
      "Check power supply voltage",
      "Replace display unit if under warranty",
      "Ensure ambient temperature is within spec"
    ],
    dateReported: "2024-10-20",
    reportedBy: "Field Technician"
  }
];

export const getAllBehaviors = (): MeterBehavior[] => {
  const customBehaviors = JSON.parse(localStorage.getItem("customBehaviors") || "[]");
  return [...defaultBehaviors, ...customBehaviors];
};

export const getBehaviorById = (id: string): MeterBehavior | undefined => {
  const allBehaviors = getAllBehaviors();
  return allBehaviors.find(behavior => behavior.id === id);
};

export const getBehaviorsByMeterId = (meterId: number): MeterBehavior[] => {
  const allBehaviors = getAllBehaviors();
  return allBehaviors.filter(behavior => behavior.meterId === meterId);
};

export const saveBehavior = (behavior: Omit<MeterBehavior, "id" | "dateReported">): MeterBehavior => {
  const customBehaviors = JSON.parse(localStorage.getItem("customBehaviors") || "[]");
  
  const newBehavior: MeterBehavior = {
    ...behavior,
    id: Date.now().toString(),
    dateReported: new Date().toISOString().split('T')[0]
  };
  
  customBehaviors.push(newBehavior);
  localStorage.setItem("customBehaviors", JSON.stringify(customBehaviors));
  
  return newBehavior;
};
