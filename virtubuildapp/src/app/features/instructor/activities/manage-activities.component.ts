import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DashboardLayoutComponent } from '@/app/shared/components/layouts/dashboard/dashboard-layout/dashboard-layout.component';
import { PageShellComponent } from '@/app/shared/components/layouts/page-shell/page-shell.component';
import { ActivitiesService, ModulesService } from '@/app/core/services';

@Component({
  selector: 'app-manage-activities',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, DashboardLayoutComponent, PageShellComponent],
  templateUrl: './manage-activities.component.html',
  styleUrls: ['./manage-activities.component.scss'],
})
export class ManageActivitiesComponent implements OnInit {
  appTitle = 'VirtuBuild';
  activities: any[] = [];
  modules: any[] = [];
  selectedModule: number | null = null;
  loading = false;
  error: string | null = null;

  async ngOnInit() {
    await this.loadModules();
    await this.loadActivities();
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
    this.loading = true;
    this.error = null;
    try {
      const response = await ActivitiesService.list();
      this.activities = response?.data || [];
    } catch (error) {
      console.error('Error loading activities:', error);
      this.error = 'Failed to load activities';
    } finally {
      this.loading = false;
    }
  }

  onModuleChange() {
    this.loadActivities();
  }

  get filteredActivities() {
    if (!this.selectedModule) {
      return this.activities;
    }
    return this.activities.filter(activity => activity.moduleId === this.selectedModule);
  }

  async refreshActivities() {
    await this.loadActivities();
  }

  getModuleName(moduleId: number): string {
    const module = this.modules.find(m => m.id === moduleId);
    return module ? module.title : 'Unknown Module';
  }
}
