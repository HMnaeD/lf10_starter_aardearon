import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { Employee } from "../../../Employee";
import {FormsModule} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BearerToken} from "../../../services/bearer.service";

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent{
  @Input() employee!: Employee | undefined;
  firstName: string = '';
  lastName: string = '';
  street: string = '';
  postcode: string = '';
  city: string = '';
  phone: string = '';

  constructor(private http: HttpClient, private bearer: BearerToken) {}

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['employee'] && this.employee) {
  //     this.firstName = this.employee.firstName ?? "";
  //     this.lastName = this.employee.lastName ?? "";
  //     this.street = this.employee.street ?? "";
  //     this.postcode = this.employee.postcode ?? "";
  //     this.city = this.employee.city ?? "";
  //     this.phone = this.employee.phone ?? "";
  //   }
  // }

  updateEmployee(employee: Employee) {
   this.http.put<Employee>(`http://localhost:8089/employees/${employee.id}`, employee, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer.token}`)
    }).subscribe({
      next: (response) => {
        console.log('Erfolgreich gespeichert:', response);
        location.reload();
      },
      error: (err) => {
        console.error('Fehler beim Speichern:', err)
      }
    });
  }

  setEmployeeData() {
    if (this.employee) {
      this.employee.firstName = this.firstName || this.employee.firstName;
      this.employee.lastName = this.lastName || this.employee.lastName;
      this.employee.street = this.street || this.employee.street;
      this.employee.postcode = this.postcode || this.employee.postcode;
      this.employee.city = this.city || this.employee.city;
      this.employee.phone = this.phone || this.employee.phone;
      this.updateEmployee(this.employee);
    }
  }
}


