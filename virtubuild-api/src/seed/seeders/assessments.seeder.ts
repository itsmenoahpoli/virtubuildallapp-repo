import { assessmentsRepository, labActivitiesRepository } from "@/database";

export const seedAssessments = async () => {
  console.log("Seeding assessments...");
  
  const labActivities = await labActivitiesRepository.find();
  
  const assessments = [
    {
      labActivityTitle: "CPU Identification Lab",
      title: "CPU Fundamentals Assessment",
      description: "Test your knowledge of CPU components and specifications",
      timeLimitMinutes: 30,
      questions: [
        {
          id: 1,
          question: "What is the primary function of a CPU?",
          questionType: "multiple_choice",
          options: [
            { value: "Store data permanently", isCorrect: false },
            { value: "Process instructions and perform calculations", isCorrect: true },
            { value: "Display graphics", isCorrect: false },
            { value: "Connect to the internet", isCorrect: false }
          ],
          correctAnswer: 1,
          points: 10,
          explanation: "The CPU is the brain of the computer that processes instructions and performs calculations."
        },
        {
          id: 2,
          question: "Which CPU socket type is most common for Intel processors?",
          questionType: "multiple_choice",
          options: [
            { value: "LGA 1151", isCorrect: true },
            { value: "AM4", isCorrect: false },
            { value: "TR4", isCorrect: false },
            { value: "LGA 2066", isCorrect: false }
          ],
          correctAnswer: 0,
          points: 15,
          explanation: "LGA 1151 is the most common socket for mainstream Intel processors."
        }
      ],
      isEnabled: true
    },
    {
      labActivityTitle: "Memory Module Recognition",
      title: "Memory Types Assessment",
      description: "Assess your understanding of different memory types and specifications",
      timeLimitMinutes: 25,
      questions: [
        {
          id: 1,
          question: "Which type of memory is volatile?",
          questionType: "multiple_choice",
          options: [
            { value: "ROM", isCorrect: false },
            { value: "RAM", isCorrect: true },
            { value: "SSD", isCorrect: false },
            { value: "HDD", isCorrect: false }
          ],
          correctAnswer: 1,
          points: 10,
          explanation: "RAM (Random Access Memory) is volatile and loses data when power is removed."
        },
        {
          id: 2,
          question: "List the main types of RAM (separated by commas):",
          questionType: "enumeration",
          options: [
            { value: "DDR4", isCorrect: true },
            { value: "DDR5", isCorrect: true },
            { value: "DDR3", isCorrect: true },
            { value: "SDRAM", isCorrect: true }
          ],
          correctAnswer: 0,
          points: 20,
          explanation: "Main types include DDR3, DDR4, DDR5, and SDRAM."
        }
      ],
      isEnabled: true
    }
  ];

  for (const assessmentData of assessments) {
    const labActivity = labActivities.find(la => la.title === assessmentData.labActivityTitle);
    if (labActivity) {
      const exists = await assessmentsRepository.findOneBy({ labActivityId: labActivity.id });
      if (!exists) {
        const assessment = assessmentsRepository.create({
          labActivityId: labActivity.id,
          title: assessmentData.title,
          description: assessmentData.description,
          timeLimitMinutes: assessmentData.timeLimitMinutes,
          questions: assessmentData.questions,
          isEnabled: assessmentData.isEnabled
        });
        await assessmentsRepository.save(assessment);
        console.log(`Created assessment: ${assessmentData.title} for lab activity: ${labActivity.title}`);
      } else {
        console.log(`Assessment already exists: ${assessmentData.title}`);
      }
    }
  }
};
