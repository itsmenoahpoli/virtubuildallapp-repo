import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DashboardLayoutComponent } from '@/app/shared/components/layouts/dashboard/dashboard-layout/dashboard-layout.component';
import { PageShellComponent } from '@/app/shared/components/layouts/page-shell/page-shell.component';
import { GradesService, ActivitiesService, ModulesService, UsersService } from '@/app/core/services';

@Component({
  selector: 'app-instructor-grades',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, DashboardLayoutComponent, PageShellComponent],
  templateUrl: './instructor-grades.component.html',
  styleUrls: ['./instructor-grades.component.scss'],
})
export class InstructorGradesComponent implements OnInit {
  appTitle = 'VirtuBuild';
  modules: any[] = [];
  activities: any[] = [];
  grades: any[] = [];
  students: any[] = [];
  selectedModule: number | null = null;
  selectedActivity: number | null = null;
  loading = false;
  error: string | null = null;

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    const activityId = this.route.snapshot.queryParams['activityId'];
    if (activityId) {
      this.selectedActivity = parseInt(activityId);
    }

    await this.loadModules();
    await this.loadActivities();
    
    if (this.selectedActivity) {
      await this.loadGrades();
    }
  }

  async loadModules() {
    try {
      const response = await ModulesService.list();
      this.modules = response?.data || [];
    } catch (error) {
      console.error('Error loading modules:', error);
      this.error = 'Failed to load modules';
    }
  }

  async loadActivities() {
    try {
      const response = await ActivitiesService.list();
      this.activities = response?.data || [];
      
      if (this.selectedModule) {
        this.activities = this.activities.filter(activity => activity.moduleId === this.selectedModule);
      }
    } catch (error) {
      console.error('Error loading activities:', error);
      this.error = 'Failed to load activities';
    }
  }

  async loadGrades() {
    if (!this.selectedActivity) return;

    this.loading = true;
    this.error = null;
    try {
      const response = await GradesService.listForActivity(this.selectedActivity);
      this.grades = response?.data || [];
      
      const userIds = [...new Set(this.grades.map(grade => grade.userId))];
      await this.loadStudents(userIds);
    } catch (error) {
      console.error('Error loading grades:', error);
      this.error = 'Failed to load grades';
    } finally {
      this.loading = false;
    }
  }

  async loadStudents(userIds: number[]) {
    try {
      const response = await UsersService.getAllUsers();
      const allUsers = response?.data || [];
      this.students = allUsers.filter((user: any) => userIds.includes(user.id));
    } catch (error) {
      console.error('Error loading students:', error);
    }
  }

  onModuleChange() {
    this.selectedActivity = null;
    this.grades = [];
    this.students = [];
    this.loadActivities();
  }

  onActivityChange() {
    this.grades = [];
    this.students = [];
    this.loadGrades();
  }

  getStudentName(userId: number): string {
    const student = this.students.find(s => s.id === userId);
    return student ? `${student.firstName} ${student.lastName}` : `User ${userId}`;
  }

  getStudentEmail(userId: number): string {
    const student = this.students.find(s => s.id === userId);
    return student ? student.email : '';
  }

  getGradeStatus(score: number, passingScore: number = 70): string {
    return score >= passingScore ? 'Passed' : 'Failed';
  }

  getGradeClass(score: number, passingScore: number = 70): string {
    if (score >= 90) return 'excellent';
    if (score >= 80) return 'good';
    if (score >= 70) return 'pass';
    return 'fail';
  }

  async refreshGrades() {
    if (this.selectedActivity) {
      await this.loadGrades();
    }
  }

  getActivityName(activityId: number): string {
    const activity = this.activities.find(a => a.id === activityId);
    return activity ? activity.title : 'Unknown Activity';
  }

  trackByGradeId(index: number, grade: any): any {
    return grade.id || index;
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }

  getPassRate(): string {
    if (this.grades.length === 0) return '0';
    const passedCount = this.grades.filter(g => g.score >= 70).length;
    return (passedCount / this.grades.length * 100).toFixed(1);
  }

  getAverageScore(): string {
    if (this.grades.length === 0) return '0';
    const sum = this.grades.reduce((total, g) => total + g.score, 0);
    return (sum / this.grades.length).toFixed(1);
  }

  getHighestScore(): string {
    if (this.grades.length === 0) return '0';
    return Math.max(...this.grades.map(g => g.score)).toString();
  }
}


