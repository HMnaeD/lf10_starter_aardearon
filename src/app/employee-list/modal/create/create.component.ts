import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {QualificationDTO} from "../../../model/qualificationDTO";
import {Qualification} from "../../../model/qualification";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EmployeeDTO} from "../../../model/EmployeeDTO";

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  bearer: string = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3MzgyMzA2NDMsImlhdCI6MTczODIyNzA0MywianRpIjoiYzg4ODRiOGEtMzUxYS00NmRmLWFiMGYtMzAyOTJiMzkxYjM1IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiJlZjQ0YTdkMy02NGE4LTQxMzQtYTUxYy0wZDRhNWM5NTAwNmQiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicHJvZHVjdF9vd25lciIsIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.LQJW0KakAsit3w66g8qHxul8eYpjIbBuKu9egafpkAhsCz7Tsu5aQtPGQmij_-qSDnqPZYrgz6WjemiYRmCg_5gujYY4wg4p4J61pav5g-UsYdTIJZ8_BuTfWoTQX1_EDLW2QVLEuBNWJaV6-DcyPncd-zhcdOiiPvmZU8ozLLPNW72FEQ26Hgr2bW9gtCIUPidQFb9pgHikkmJlXLDYqx29sbyNzTodsf1Vvo1SvR2JmKeKS9DJkKkv-K8wlcLA4vYbICRkxsHOaCAMNodFKJRF3hVmytJh9Fc9xo-f-bJaAs3XNHeWY2MJFRtBV9CEq7HCIBrhPJKw0AHSw-YKxw";
  firstName: string | undefined;
  lastName: string | undefined;
  street: string | undefined;
  postcode: string | undefined;
  city: string | undefined;
  phone: string | undefined;

  constructor(private http: HttpClient) {
  }

  addData(employee: EmployeeDTO) {
    return this.http.post<Qualification>('http://localhost:8089/employees', employee, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    }).subscribe({
      next: (response) => {
        console.log('Erfolgreich gespeichert:', response);
        location.reload();
      },
      error: (err) => {
        console.error('Fehler beim Speichern:', err);
      }
    });
  }

  setEmployee() {
    const employee = new EmployeeDTO(this.firstName,this.lastName,this.street,this.postcode,this.city,this.phone)
    this.addData(employee);
  }
}
