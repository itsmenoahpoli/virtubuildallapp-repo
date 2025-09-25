import { assessmentsRepository, modulesRepository } from "@/database";

export const seedAssessments = async () => {
  console.log("Seeding assessments...");
  
  const modules = await modulesRepository.find();
  
  const assessments = [
    {
      moduleTitle: "Introduction to Computer Hardware",
      quiz: {
        questions: [
          {
            id: 1,
            question: "What is the primary function of a CPU?",
            type: "multiple_choice",
            options: [
              "Store data permanently",
              "Process instructions and perform calculations",
              "Display graphics",
              "Connect to the internet"
            ],
            correctAnswer: 1,
            points: 10
          },
          {
            id: 2,
            question: "Which type of memory is volatile?",
            type: "multiple_choice",
            options: ["ROM", "RAM", "SSD", "HDD"],
            correctAnswer: 1,
            points: 10
          },
          {
            id: 3,
            question: "What does RAM stand for?",
            type: "text",
            correctAnswer: "Random Access Memory",
            points: 5
          }
        ]
      },
      isEnabled: true
    },
    {
      moduleTitle: "Desktop Assembly Fundamentals",
      quiz: {
        questions: [
          {
            id: 1,
            question: "What is the first step when installing a CPU?",
            type: "multiple_choice",
            options: [
              "Apply thermal paste",
              "Lift the CPU socket lever",
              "Remove the CPU from packaging",
              "Install the CPU cooler"
            ],
            correctAnswer: 1,
            points: 15
          },
          {
            id: 2,
            question: "How should RAM modules be installed?",
            type: "multiple_choice",
            options: [
              "One at a time",
              "In pairs for dual-channel",
              "All slots must be filled",
              "Only in the first slot"
            ],
            correctAnswer: 1,
            points: 15
          }
        ]
      },
      isEnabled: true
    },
    {
      moduleTitle: "Laptop Disassembly and Repair",
      quiz: {
        questions: [
          {
            id: 1,
            question: "What safety precaution is most important when working on laptops?",
            type: "multiple_choice",
            options: [
              "Wear gloves",
              "Disconnect power and remove battery",
              "Use a magnifying glass",
              "Work in bright light"
            ],
            correctAnswer: 1,
            points: 20
          },
          {
            id: 2,
            question: "Which tool is essential for laptop repair?",
            type: "multiple_choice",
            options: ["Hammer", "Screwdriver set", "Drill", "Saw"],
            correctAnswer: 1,
            points: 10
          }
        ]
      },
      isEnabled: true
    },
    {
      moduleTitle: "Network Hardware Configuration",
      quiz: {
        questions: [
          {
            id: 1,
            question: "What is the default IP address for most routers?",
            type: "multiple_choice",
            options: ["192.168.1.1", "10.0.0.1", "172.16.0.1", "All of the above"],
            correctAnswer: 3,
            points: 10
          }
        ]
      },
      isEnabled: true
    },
    {
      moduleTitle: "Troubleshooting and Diagnostics",
      quiz: {
        questions: [
          {
            id: 1,
            question: "What is the first step in hardware troubleshooting?",
            type: "multiple_choice",
            options: [
              "Replace all components",
              "Identify the problem",
              "Update all drivers",
              "Reinstall the operating system"
            ],
            correctAnswer: 1,
            points: 15
          }
        ]
      },
      isEnabled: true
    }
  ];

  for (const assessmentData of assessments) {
    const module = modules.find(m => m.title === assessmentData.moduleTitle);
    if (module) {
      const exists = await assessmentsRepository.findOneBy({ moduleId: module.id });
      if (!exists) {
        const assessment = assessmentsRepository.create({
          moduleId: module.id,
          quiz: assessmentData.quiz,
          isEnabled: assessmentData.isEnabled
        });
        await assessmentsRepository.save(assessment);
        console.log(`Created assessment for module: ${module.title}`);
      } else {
        console.log(`Assessment for module ${module.title} already exists`);
      }
    }
  }
};
