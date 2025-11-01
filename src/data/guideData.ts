export interface Guide {
  id: number;
  meterId: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  rating: number;
  votes: number;
  author: string;
  lastUpdated: string;
  steps: GuideStep[];
  tags?: string;
}

export interface GuideStep {
  title: string;
  description: string;
  tips?: string;
}

const defaultGuides: Guide[] = [
  {
    id: 1,
    meterId: "1",
    title: "Resolving Communication Failures in Schneider ION Meters",
    category: "Communication",
    difficulty: "Intermediate",
    duration: "15 min",
    rating: 4.8,
    votes: 24,
    author: "Tech Lead Mike",
    lastUpdated: "2 days ago",
    description: "Step-by-step guide to diagnose and fix common communication issues with Schneider Electric ION series meters.",
    steps: [
      {
        title: "Check Physical Connections",
        description: "Verify all cables are securely connected to the meter and communication device.",
        tips: "Look for any visible damage to cables or connectors."
      },
      {
        title: "Verify Communication Settings",
        description: "Check baud rate, parity, and stop bits match between meter and master device.",
        tips: "Default settings are usually 9600-8-N-1."
      }
    ]
  },
  {
    id: 2,
    meterId: "2",
    title: "Factory Reset Procedure for Siemens PAC3200",
    category: "Configuration",
    difficulty: "Beginner",
    duration: "5 min",
    rating: 4.9,
    votes: 31,
    author: "Senior Tech Sarah",
    lastUpdated: "1 week ago",
    description: "Complete factory reset process including backup procedures and post-reset configuration.",
    steps: [
      {
        title: "Backup Current Settings",
        description: "Use the configuration software to save current meter settings to a file.",
        tips: "Store the backup file in a safe location with clear naming."
      }
    ]
  },
  {
    id: 3,
    meterId: "1",
    title: "Troubleshooting Power Quality Issues",
    category: "Power",
    difficulty: "Advanced",
    duration: "30 min",
    rating: 4.7,
    votes: 18,
    author: "Expert John",
    lastUpdated: "3 days ago",
    description: "Advanced diagnostics for power quality problems including harmonics, voltage sag, and frequency variations.",
    steps: [
      {
        title: "Enable Power Quality Monitoring",
        description: "Access the meter's power quality settings and enable detailed monitoring features.",
        tips: "This may increase data storage requirements on the meter."
      }
    ]
  },
  {
    id: 4,
    meterId: "3",
    title: "Firmware Update Best Practices",
    category: "Maintenance",
    difficulty: "Intermediate",
    duration: "20 min",
    rating: 4.6,
    votes: 22,
    author: "Field Engineer Lisa",
    lastUpdated: "5 days ago",
    description: "Safe firmware update procedures with rollback strategies and compatibility checks.",
    steps: [
      {
        title: "Verify Firmware Compatibility",
        description: "Check the meter model and current firmware version against the update package requirements.",
        tips: "Never skip compatibility checks as they can brick the meter."
      }
    ]
  },
  {
    id: 5,
    meterId: "1",
    title: "Network Configuration for AMI Deployment",
    category: "Network",
    difficulty: "Advanced",
    duration: "45 min",
    rating: 4.8,
    votes: 15,
    author: "Network Specialist Tom",
    lastUpdated: "1 week ago",
    description: "Complete network setup guide for Advanced Metering Infrastructure including security configuration.",
    steps: [
      {
        title: "Plan Network Architecture",
        description: "Design the network topology considering meter locations, communication requirements, and security zones.",
        tips: "Document all IP addresses and network segments for future reference."
      }
    ]
  }
];

export const getAllGuides = (): Guide[] => {
  const customGuides = JSON.parse(localStorage.getItem("customGuides") || "[]");
  return [...defaultGuides, ...customGuides];
};

export const getGuideById = (id: number): Guide | undefined => {
  const allGuides = getAllGuides();
  return allGuides.find(guide => guide.id === id);
};

export const saveGuide = (guideData: Omit<Guide, "id" | "rating" | "votes" | "author" | "lastUpdated">): Guide => {
  const customGuides = JSON.parse(localStorage.getItem("customGuides") || "[]");
  const newId = Math.max(...getAllGuides().map(g => g.id), 0) + 1;
  
  const newGuide: Guide = {
    ...guideData,
    id: newId,
    rating: 0,
    votes: 0,
    author: "You",
    lastUpdated: "Just now"
  };
  
  customGuides.push(newGuide);
  localStorage.setItem("customGuides", JSON.stringify(customGuides));
  
  return newGuide;
};
