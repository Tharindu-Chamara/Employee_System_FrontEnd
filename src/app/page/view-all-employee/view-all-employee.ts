import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  departmentId: string;
  roleId: string;
}

@Component({
  selector: 'app-view-all-employee',
  standalone: true,
  templateUrl: './view-all-employee.html',
  styleUrls: ['./view-all-employee.css'],
  imports: [FormsModule, CommonModule],
})
export class ViewAllEmployees implements OnInit, OnDestroy {
  employees: Employee[] = [];
  loading = false;
  errorMessage: string | null = null;
  deletingId: number | null = null;

  private routerSub?: Subscription;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadEmployees();

    // Reload employees whenever this route is navigated to
    this.routerSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        console.log('NavigationEnd detected, reloading employees');
        this.loadEmployees();
      });
  }

  ngOnDestroy() {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }

  loadEmployees() {
    this.loading = true;
    this.errorMessage = null;
    this.http.get<Employee[]>('http://localhost:8080/employee').subscribe({
      next: (response) => {
        console.log('Employees Retrieved Successfully', response);
        this.employees = response;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
        this.errorMessage = 'Failed to load employees';
        this.loading = false;
      },
    });
  }

  deleteEmployee(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (!result.isConfirmed) return;

      this.deletingId = id;
      this.http
        .delete(`http://localhost:8080/employee/${id}`, {
          responseType: 'text',
        })
        .subscribe({
          next: (res) => {
            // server returns plain text like 'Deleted'
            console.log('Employee deleted:', res);
            this.employees = this.employees.filter((e) => e.id !== id);
            this.deletingId = null;
            Swal.fire('Deleted!', 'Employee has been deleted.', 'success');
          },
          error: (err) => {
            this.deletingId = null;
            console.error('Error deleting employee:', err);
            const status = err?.status ? `Status ${err.status}` : '';
            const serverMsg = err?.error || err?.message || '';
            const text =
              [status, serverMsg].filter(Boolean).join(' - ') ||
              'Failed to delete employee';
            Swal.fire('Error', text, 'error');
          },
        });
    });
  }

  trackById(index: number, emp: Employee): number {
    return emp ? emp.id : index;
  }
}
