import { gamificationRepository, usersRepository, userRolesRepository } from "@/database";

export const seedGamification = async () => {
  console.log("Seeding gamification data...");
  
  const studentRole = await userRolesRepository.findOneBy({ name: "student" });
  const students = await usersRepository.findBy({ userRoleId: studentRole?.id });
  
  const gamificationData = [
    {
      totalPoints: 450,
      level: 3,
      badges: ["First Steps", "CPU Expert", "Memory Master"],
      achievements: [
        { name: "Quick Learner", description: "Completed first activity in under 10 minutes" },
        { name: "Hardware Hero", description: "Scored 90% or higher on 3 activities" }
      ],
      streak: 5,
      activitiesCompleted: 8
    },
    {
      totalPoints: 320,
      level: 2,
      badges: ["CPU Expert", "Board Builder"],
      achievements: [
        { name: "Persistent", description: "Completed activity after multiple attempts" }
      ],
      streak: 3,
      activitiesCompleted: 5
    },
    {
      totalPoints: 680,
      level: 4,
      badges: ["First Steps", "CPU Expert", "Memory Master", "Board Builder", "Installation Pro"],
      achievements: [
        { name: "Speed Demon", description: "Completed activity in record time" },
        { name: "Perfectionist", description: "Scored 100% on 5 activities" },
        { name: "Streak Master", description: "Maintained 7-day activity streak" }
      ],
      streak: 7,
      activitiesCompleted: 12
    },
    {
      totalPoints: 280,
      level: 2,
      badges: ["First Steps"],
      achievements: [
        { name: "Getting Started", description: "Completed your first activity" }
      ],
      streak: 1,
      activitiesCompleted: 3
    },
    {
      totalPoints: 520,
      level: 3,
      badges: ["CPU Expert", "Memory Master", "Board Builder"],
      achievements: [
        { name: "Consistent Performer", description: "Maintained 80% average score" },
        { name: "Hardware Enthusiast", description: "Completed 10 activities" }
      ],
      streak: 4,
      activitiesCompleted: 10
    }
  ];

  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    const gamification = gamificationData[i % gamificationData.length];
    
    const exists = await gamificationRepository.findOneBy({ studentId: student.id });
    if (!exists) {
      const gamificationRecord = gamificationRepository.create({
        studentId: student.id,
        ...gamification
      });
      await gamificationRepository.save(gamificationRecord);
      console.log(`Created gamification data for student ${student.firstName} ${student.lastName}`);
    } else {
      console.log(`Gamification data already exists for student ${student.firstName} ${student.lastName}`);
    }
  }
};
