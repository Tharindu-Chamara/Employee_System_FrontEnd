import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-employee.html',
  styleUrls: ['./add-employee.css'],
})
export class AddEmployee {
  constructor(private http: HttpClient, private router: Router) {}

  public Employee = {
    firstName: '',
    lastName: '',
    email: '',
    departmentId: '',
    roleId: '',
  };

  addemployee() {
    this.http.post('http://localhost:8080/employee', this.Employee).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Employee Added!',
          icon: 'success',
          draggable: true,
        });
        console.log('Employee Data:', this.Employee);
        console.log('Employee Added Successfully', response);
        // Navigate to the view list so it reloads from the server
        this.router.navigate(['/view-employees']);
      },
      error: (err) => {
        console.error('Error adding employee:', err);
        Swal.fire({
          title: 'Failed to add employee',
          text: err?.message || 'Unknown error',
          icon: 'error',
          draggable: true,
        });
      },
    });
  }
}
