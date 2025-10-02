import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardLayoutComponent } from '@/app/shared/components/layouts/dashboard/dashboard-layout/dashboard-layout.component';
import { PageShellComponent } from '@/app/shared/components/layouts/page-shell/page-shell.component';
import { AdminService } from '@/app/core/services';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, DashboardLayoutComponent, PageShellComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  dashboardStats: any = {};
  loading = true;

  async ngOnInit() {
    try {
      this.dashboardStats = await AdminService.getDashboardStats();
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
    } finally {
      this.loading = false;
    }
  }
}
