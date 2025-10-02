import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { DashboardSidebarComponent } from '../dashboard-sidebar/dashboard-sidebar.component';
import { DashboardNavbarComponent } from '../dashboard-navbar/dashboard-navbar.component';
import { USER_TYPES } from '@/app/shared/utils/types.utils';
import { selectUserType, selectUserProfile } from '@/app/core/store/user';

interface UserProfile {
  name: string;
  avatar?: string;
}

interface SidebarItem {
  label: string;
  route: string;
  icon?: string;
  children?: SidebarItem[];
}

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DashboardSidebarComponent,
    DashboardNavbarComponent,
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
})
export class DashboardLayoutComponent implements OnInit {
  @Input() appTitle!: string;
  userType$;
  userProfile$;
  currentUserType: USER_TYPES | null = null;

  constructor(private store: Store) {
    this.userType$ = this.store.select(selectUserType);
    this.userProfile$ = this.store.select(selectUserProfile);
  }

  ngOnInit() {
    this.userType$.subscribe((type) => {
      this.currentUserType = type;
    });
  }

  get sidebarItems(): SidebarItem[] {
    if (!this.currentUserType) return [];

    switch (this.currentUserType) {
      case USER_TYPES.ADMIN:
        return [
          {
            label: 'Manage Instructors',
            route: '/admin/instructors',
            icon: 'person',
          },
          {
            label: 'Manage Students',
            route: '/admin/students',
            icon: 'school',
          },
          {
            label: 'Manage Contents',
            route: '/admin/contents',
            icon: 'menu_book',
            children: [
              {
                label: 'Quizzes',
                route: '/admin/contents/quizzes',
              },
              {
                label: 'Laboratories',
                route: '/admin/contents/laboratories',
              },
              {
                label: 'Assessments',
                route: '/admin/contents/assessments',
              },
            ],
          },
        ];
      case USER_TYPES.INSTRUCTOR:
        return [
          {
            label: 'Manage Laboratory Activities',
            route: '/instructor/laboratories',
            icon: 'science',
          },
          {
            label: 'Manage Assessments',
            route: '/instructor/assessments',
            icon: 'assignment',
          },
          {
            label: 'Manage Student Grades',
            route: '/instructor/grades',
            icon: 'grade',
          },
        ];
      case USER_TYPES.STUDENT:
        return [
          {
            label: 'Dashboard',
            route: '/student',
            icon: 'dashboard',
          },
          {
            label: 'Activities',
            route: '/student/activities',
            icon: 'assignment',
          },
          {
            label: 'Grades',
            route: '/student/grades',
            icon: 'grade',
          },
          {
            label: 'Analytics',
            route: '/student/analytics',
            icon: 'analytics',
          },
          {
            label: 'Progress',
            route: '/student/progress',
            icon: 'trending_up',
          },
          {
            label: 'Gamification',
            route: '/student/gamification',
            icon: 'emoji_events',
          },
          {
            label: 'Assessments',
            route: '/student/assessments',
            icon: 'quiz',
          },
        ];
      default:
        return [];
    }
  }
}
