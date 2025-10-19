import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ManageEmp } from './page/manage-emp/manage-emp';
import { AddEmployee } from './page/add-employee/add-employee';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'emp-app';
}
