import { userRolesRepository, usersRepository, modulesRepository, labActivitiesRepository, assessmentsRepository } from "@/database";
import { encryptPassword } from "@/utils";

export const runSeed = async () => {
	const roles = ["student", "instructor"];
	for (const name of roles) {
		const exists = await userRolesRepository.findOneBy({ name });
		if (!exists) {
			const role = userRolesRepository.create({ name, isEnabled: true });
			await userRolesRepository.save(role);
		}
	}

	const studentRole = await userRolesRepository.findOneBy({ name: "student" });
	const instructorRole = await userRolesRepository.findOneBy({ name: "instructor" });

	const demoStudent = await usersRepository.findOneBy({ email: "student@example.com" });
	if (!demoStudent) {
		const password = await encryptPassword("Password123!");
		const user = usersRepository.create({ firstName: "Demo", lastName: "Student", email: "student@example.com", password, isEnabled: true, userRoleId: studentRole?.id });
		await usersRepository.save(user);
	}

	const demoInstructor = await usersRepository.findOneBy({ email: "instructor@example.com" });
	if (!demoInstructor) {
		const password = await encryptPassword("Password123!");
		const user = usersRepository.create({ firstName: "Demo", lastName: "Instructor", email: "instructor@example.com", password, isEnabled: true, userRoleId: instructorRole?.id });
		await usersRepository.save(user);
	}

	const modules = [
		{ title: "Introduction to Tools/Components", description: "Module 1", steps: [{ name: "Identify tools" }, { name: "Sort components" }] },
		{ title: "Desktop/Laptop/Motherboard Assembly", description: "Module 2", steps: [{ name: "Connect monitor" }, { name: "Boot to UEFI" }] },
		{ title: "Advanced Tasks", description: "Module 3", steps: [{ name: "Assemble PC" }, { name: "Attach power" }] },
	];

	for (const m of modules) {
		const existing = await modulesRepository.findOneBy({ title: m.title });
		if (!existing) {
			const created = modulesRepository.create({ ...m, isEnabled: true });
			await modulesRepository.save(created);
		}
	}

	const module1 = await modulesRepository.findOneBy({ title: "Introduction to Tools/Components" });
	if (module1) {
		const actExists = await labActivitiesRepository.findOneBy({ title: "Identify tools on the table" });
		if (!actExists) {
			const activity = labActivitiesRepository.create({ moduleId: module1.id, title: "Identify tools on the table", description: "Identify tools", isEnabled: true, gamification: { points: 100, badges: ["First Steps"] } });
			await labActivitiesRepository.save(activity);
		}
		const assessExists = await assessmentsRepository.findOneBy({ moduleId: module1.id });
		if (!assessExists) {
			const assessment = assessmentsRepository.create({ moduleId: module1.id, quiz: { questions: [] }, isEnabled: true });
			await assessmentsRepository.save(assessment);
		}
	}
};


