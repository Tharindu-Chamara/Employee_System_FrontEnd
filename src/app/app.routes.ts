import { Routes } from '@angular/router';
import { AddEmployee } from './page/add-employee/add-employee';
import { ViewAllEmployees } from './page/view-all-employee/view-all-employee';
import { UpdateEmployee } from './page/update-employee/update-employee';

export const routes: Routes = [
  { path: 'add-employee', component: AddEmployee },
  { path: '', redirectTo: 'add-employee', pathMatch: 'full' },
  { path: 'view-employees', component: ViewAllEmployees },
  { path: 'update-employee', component: UpdateEmployee },
  { path: '**', redirectTo: 'add-employee' },
];
