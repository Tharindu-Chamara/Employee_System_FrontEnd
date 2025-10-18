import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-employee.html',
  styleUrls: ['./add-employee.css'],
})
export class AddEmployee {
  public Employee = {
    firstName: '',
    lastName: '',
    email: '',
    departmentId: '',
    roleId: '',
  };

  Addemployee() {
    console.log('Employee Added Successfully', this.Employee);
  }
}
