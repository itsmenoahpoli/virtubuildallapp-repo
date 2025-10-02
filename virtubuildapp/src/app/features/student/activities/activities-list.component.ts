import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivitiesService, ModulesService } from '@/app/core/services';
import { DashboardLayoutComponent } from '@/app/shared/components/layouts/dashboard/dashboard-layout/dashboard-layout.component';
import { PageShellComponent } from '@/app/shared/components/layouts/page-shell/page-shell.component';

@Component({
  selector: 'app-activities-list',
  standalone: true,
  imports: [CommonModule, RouterModule, DashboardLayoutComponent, PageShellComponent],
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.scss'],
})
export class ActivitiesListComponent implements OnInit {
  @Input() moduleId?: number;
  appTitle = 'VirtuBuild';
  modules: any[] = [];
  activities: any[] = [];

  async ngOnInit() {
    const mods = await ModulesService.list();
    this.modules = mods?.data || [];
    const targetModuleId = this.moduleId || this.modules?.[0]?.id;
    if (targetModuleId) {
      const res = await ActivitiesService.listByModule(targetModuleId);
      this.activities = res?.data || [];
    }
  }
}


