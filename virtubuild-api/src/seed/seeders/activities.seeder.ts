import { labActivitiesRepository, modulesRepository } from "@/database";

export const seedActivities = async () => {
  console.log("Seeding lab activities...");
  
  const modules = await modulesRepository.find();
  
  const activities = [
    {
      moduleTitle: "Introduction to Computer Hardware",
      activities: [
        {
          title: "CPU Identification Lab",
          description: "Identify different types of CPUs and their specifications",
          isEnabled: true,
          gamification: { points: 50, badges: ["CPU Expert"] }
        },
        {
          title: "Memory Module Recognition",
          description: "Learn to identify RAM types and capacities",
          isEnabled: true,
          gamification: { points: 40, badges: ["Memory Master"] }
        },
        {
          title: "Motherboard Component Mapping",
          description: "Map out motherboard components and connections",
          isEnabled: true,
          gamification: { points: 60, badges: ["Board Builder"] }
        }
      ]
    },
    {
      moduleTitle: "Desktop Assembly Fundamentals",
      activities: [
        {
          title: "CPU Installation Simulation",
          description: "Practice installing CPU with proper technique",
          isEnabled: true,
          gamification: { points: 100, badges: ["Installation Pro"] }
        },
        {
          title: "RAM Installation Challenge",
          description: "Install memory modules in correct slots",
          isEnabled: true,
          gamification: { points: 80, badges: ["Memory Installer"] }
        },
        {
          title: "Power Supply Wiring",
          description: "Connect all power cables correctly",
          isEnabled: true,
          gamification: { points: 120, badges: ["Power Master"] }
        }
      ]
    },
    {
      moduleTitle: "Laptop Disassembly and Repair",
      activities: [
        {
          title: "Laptop Battery Removal",
          description: "Safely remove laptop battery following proper procedures",
          isEnabled: true,
          gamification: { points: 70, badges: ["Battery Expert"] }
        },
        {
          title: "Keyboard Replacement",
          description: "Replace laptop keyboard with new component",
          isEnabled: true,
          gamification: { points: 90, badges: ["Keyboard Specialist"] }
        },
        {
          title: "Screen Assembly",
          description: "Disassemble and reassemble laptop screen",
          isEnabled: true,
          gamification: { points: 150, badges: ["Screen Master"] }
        }
      ]
    },
    {
      moduleTitle: "Network Hardware Configuration",
      activities: [
        {
          title: "Router Configuration Lab",
          description: "Configure wireless router settings",
          isEnabled: true,
          gamification: { points: 80, badges: ["Network Config"] }
        },
        {
          title: "Switch Setup Challenge",
          description: "Set up network switch with VLANs",
          isEnabled: true,
          gamification: { points: 100, badges: ["Switch Master"] }
        }
      ]
    },
    {
      moduleTitle: "Troubleshooting and Diagnostics",
      activities: [
        {
          title: "Hardware Diagnostic Tools",
          description: "Use diagnostic software to identify issues",
          isEnabled: true,
          gamification: { points: 90, badges: ["Diagnostic Expert"] }
        },
        {
          title: "Performance Benchmarking",
          description: "Run performance tests and analyze results",
          isEnabled: true,
          gamification: { points: 110, badges: ["Performance Analyst"] }
        }
      ]
    }
  ];

  for (const moduleActivities of activities) {
    const module = modules.find(m => m.title === moduleActivities.moduleTitle);
    if (module) {
      for (const activityData of moduleActivities.activities) {
        const exists = await labActivitiesRepository.findOneBy({ 
          title: activityData.title,
          moduleId: module.id 
        });
        if (!exists) {
          const activity = labActivitiesRepository.create({
            ...activityData,
            moduleId: module.id
          });
          await labActivitiesRepository.save(activity);
          console.log(`Created activity: ${activityData.title} for module: ${module.title}`);
        } else {
          console.log(`Activity ${activityData.title} already exists for module: ${module.title}`);
        }
      }
    }
  }
};
