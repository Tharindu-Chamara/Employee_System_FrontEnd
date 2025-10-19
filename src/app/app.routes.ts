import { Routes } from '@angular/router';
import { AddEmployee } from './page/add-employee/add-employee';
import { ViewAllEmployees } from './page/view-all-employee/view-all-employee';

export const routes: Routes = [
  { path: 'add-employee', component: AddEmployee },
  { path: '', redirectTo: 'add-employee', pathMatch: 'full' },
  { path: 'view-employees', component: ViewAllEmployees },
  { path: '**', redirectTo: 'add-employee' },
];
