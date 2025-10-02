import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModulesService, AnalyticsService } from '@/app/core/services';
import { DashboardLayoutComponent } from '@/app/shared/components/layouts/dashboard/dashboard-layout/dashboard-layout.component';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, DashboardLayoutComponent],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss'],
})
export class StudentDashboardComponent implements OnInit {
  appTitle = 'VirtuBuild';
  modules: any[] = [];
  analytics: any[] = [];

  async ngOnInit() {
    const modulesRes = await ModulesService.list();
    this.modules = modulesRes?.data || [];
    const analyticsRes = await AnalyticsService.getMine();
    this.analytics = analyticsRes?.data || [];
  }
}


