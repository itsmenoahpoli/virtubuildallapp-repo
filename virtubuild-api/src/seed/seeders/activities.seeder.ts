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
        },
        {
          title: "Memory Module Recognition",
          description: "Learn to identify RAM types and capacities",
          isEnabled: true,
        },
        {
          title: "Motherboard Component Mapping",
          description: "Map out motherboard components and connections",
          isEnabled: true,
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
        },
        {
          title: "RAM Installation Challenge",
          description: "Install memory modules in correct slots",
          isEnabled: true,
        },
        {
          title: "Power Supply Wiring",
          description: "Connect all power cables correctly",
          isEnabled: true,
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
        },
        {
          title: "Keyboard Replacement",
          description: "Replace laptop keyboard with new component",
          isEnabled: true,
        },
        {
          title: "Screen Assembly",
          description: "Disassemble and reassemble laptop screen",
          isEnabled: true,
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
        },
        {
          title: "Switch Setup Challenge",
          description: "Set up network switch with VLANs",
          isEnabled: true,
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
        },
        {
          title: "Performance Benchmarking",
          description: "Run performance tests and analyze results",
          isEnabled: true,
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
