import {Component, Input} from '@angular/core';
import {Qualification} from "../../model/qualification";
import {EditModalComponent} from "./modals/edit-modal/edit-modal.component";
import {DeleteModalComponent} from "./modals/delete-modal/delete-modal.component";
import {CreateModalComponent} from "./modals/create-modal/create-modal.component";
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-qualification-list',
  standalone: true,
  imports: [
    EditModalComponent,
    DeleteModalComponent,
    CreateModalComponent,
    AsyncPipe
  ],
  template: `
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Id</th>
          <th>Bezeichnung</th>
          <th>&nbsp;</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        @for (qualification of qualifications$ | async; track qualification.id) {
          <tr>
            <td>{{qualification.id}}</td>
            <td>{{qualification.skill}}</td>
            <td><button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editModal"><i class="bi bi-pencil-square"></i></button></td>
            <td><button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#deleteModal"><i class="bi bi-trash3"></i></button></td>
          </tr>
        }
      </tbody>
    </table>
    <app-edit-modal></app-edit-modal>
    <app-delete-modal></app-delete-modal>
    <app-create-modal></app-create-modal>
  `,
  styleUrl: './qualification-list.component.css'
})
export class QualificationListComponent {
  bearer = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3MzcwMTUyNTgsImlhdCI6MTczNzAxMTY1OCwianRpIjoiOWM4MDVkZDItZWJkOS00OTQxLTllN2EtYzQ3ZjUyYTQwMzYxIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiI4YTEwOGUwYS0yNzI3LTQ0YzctOGU5OS1iMzdjNzY1NWQwMmUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicHJvZHVjdF9vd25lciIsIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.JL951aD2zhS-tpXbxJfagPd_aKZ91iVcYruE4vEtIU8aG39PMHQfmxjrZOfrpbEIhsIRSRmwy4GrFVYsORiZKOEqkqH9sU6S2iEi_FYtISC9LVsFhmUzKx95I2dd7WV1AjddnXKuPiyocug6552MLc3xjN8xJmCTPODJg0rU5HtJ7iSkbaorJlnMgv1OnDTxXSfzCvmIQ1lhxM0VEyZZuG9aj5fjyJ7uResJfzoUKl93pIl4oqk5hUWW6TIlAnquV3Iau4lY5S6TPcHNxrleLdMtOolwZ6cgpypiyvCb8fOYTCaRKTXZ53BuGFwKRCW8k20eSRMzwlLBekTddeCznA';
  qualifications$: Observable<Qualification[]>;

  constructor(private http: HttpClient) {
    this.qualifications$ = of([]);
    this.fetchData();
  }

  fetchData() {
    this.qualifications$ = this.http.get<Qualification[]>('https://employee.szut.dev/qualifications', {
      headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${this.bearer}`)
    });
  }
}
