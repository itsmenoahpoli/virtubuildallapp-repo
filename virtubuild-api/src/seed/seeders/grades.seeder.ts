import { gradesRepository, usersRepository, assessmentsRepository, userRolesRepository } from "@/database";

export const seedGrades = async () => {
  console.log("Seeding grades...");
  
  const studentRole = await userRolesRepository.findOneBy({ name: "student" });
  const students = await usersRepository.findBy({ userRoleId: studentRole?.id });
  const assessments = await assessmentsRepository.find();
  
  const gradeData = [
    {
      score: 25,
      maxScore: 25,
      grade: "A+",
      feedback: "Excellent performance! You demonstrated mastery of the material.",
      isPassed: true
    },
    {
      score: 20,
      maxScore: 30,
      grade: "B",
      feedback: "Good work! Some areas need improvement.",
      isPassed: true
    },
    {
      score: 30,
      maxScore: 30,
      grade: "A+",
      feedback: "Outstanding! Perfect score on this assessment.",
      isPassed: true
    },
    {
      score: 10,
      maxScore: 10,
      grade: "A+",
      feedback: "Perfect! You understand network configuration well.",
      isPassed: true
    },
    {
      score: 15,
      maxScore: 15,
      grade: "A+",
      feedback: "Excellent! You have strong troubleshooting skills.",
      isPassed: true
    }
  ];

  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    const assessmentIndex = i % assessments.length;
    const assessment = assessments[assessmentIndex];
    const grade = gradeData[i % gradeData.length];
    
    const exists = await gradesRepository.findOneBy({
      userId: student.id,
      activityId: assessment.id
    });
    
    if (!exists) {
      const gradeRecord = gradesRepository.create({
        userId: student.id,
        activityId: assessment.id,
        ...grade
      });
      await gradesRepository.save(gradeRecord);
      console.log(`Created grade for student ${student.firstName} ${student.lastName} for assessment ${assessment.id}`);
    } else {
      console.log(`Grade already exists for student ${student.firstName} for assessment ${assessment.id}`);
    }
  }
};
