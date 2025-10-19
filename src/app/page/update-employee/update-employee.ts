import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Employee } from '../view-all-employee/view-all-employee';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-employee.html',
  styleUrls: ['./update-employee.css'],
})
export class UpdateEmployee implements OnInit {
  employee: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    departmentId: '',
    roleId: '',
  };

  loading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    // Try to grab employee from navigation state (if routed from list with state)
    const navigation = this.router.getCurrentNavigation();
    const navEmp = navigation?.extras?.state?.['employee'] as
      | Employee
      | undefined;
    if (navEmp) {
      this.employee = { ...navEmp };
      console.log('Received employee from navigation state:', this.employee);
    }
  }

  ngOnInit(): void {
    // If we don't have an employee loaded from navigation, try route param id
    if (!this.employee || !this.employee.id) {
      const idParam = this.route.snapshot.paramMap.get('id');
      if (idParam) {
        const id = Number(idParam);
        if (!isNaN(id)) {
          this.loadEmployee(id);
        }
      }
    }
  }

  loadEmployee(id: number) {
    this.loading = true;
    this.http.get<Employee>(`http://localhost:8080/employee/${id}`).subscribe({
      next: (emp) => {
        this.employee = emp;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load employee', err);
        this.loading = false;
        Swal.fire('Error', 'Failed to load employee details', 'error');
      },
    });
  }

  updateEmployee() {
    // Basic validation
    if (!this.employee || !this.employee.id) {
      Swal.fire('Error', 'No employee selected to update', 'error');
      return;
    }

    this.loading = true;
    this.http
      .put(
        `http://localhost:8080/employee/update_emp/${this.employee.id}`,
        this.employee
      )
      .subscribe({
        next: (res) => {
          this.loading = false;
          Swal.fire('Updated', 'Employee updated successfully', 'success').then(
            () => {
              // Ensure the Bootstrap modal (if open) is closed and any backdrop removed
              try {
                const modalEl = document.getElementById('updateEmployeeModal');
                const bs = (window as any).bootstrap;
                if (modalEl) {
                  if (bs && bs.Modal) {
                    const inst =
                      bs.Modal.getInstance(modalEl) || new bs.Modal(modalEl);
                    inst.hide();
                  } else {
                    // fallback: remove show class
                    modalEl.classList.remove('show');
                  }
                }
                // remove any leftover backdrops
                const backdrops =
                  document.getElementsByClassName('modal-backdrop');
                while (backdrops.length) {
                  backdrops[0].parentNode?.removeChild(backdrops[0]);
                }
                document.body.classList.remove('modal-open');
              } catch (e) {
                console.warn('Error closing modal before navigation', e);
              }

              // navigate after cleanup
              setTimeout(() => this.router.navigate(['/add-employee']), 120);
            }
          );
        },
        error: (err) => {
          this.loading = false;
          console.error('Failed to update employee', err);
          const status = err?.status ? `Status ${err.status}` : '';
          const serverMsg = err?.error?.message || err?.message || '';
          const text =
            [status, serverMsg].filter(Boolean).join(' - ') ||
            'Failed to update employee';
          Swal.fire('Error', text, 'error');
        },
      });
  }
}
