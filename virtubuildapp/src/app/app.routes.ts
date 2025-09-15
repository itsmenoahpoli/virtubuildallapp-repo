import { Routes } from '@angular/router';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { SigninComponent } from './features/auth/signin/signin.component';
import { InstructorHomeComponent } from './features/dashboard/instructor/instructor-home/instructor-home.component';

export const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'instructor',
    component: InstructorHomeComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
