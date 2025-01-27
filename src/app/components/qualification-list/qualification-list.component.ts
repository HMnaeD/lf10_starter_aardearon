import {Component} from '@angular/core';
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
          <th><button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#createModal"><i class="bi bi-plus-circle"></i></button></th>
        </tr>
      </thead>
      <tbody>
        @for (qualification of qualifications$ | async; track qualification.id) {
          <tr>
            <td>{{qualification.id}}</td>
            <td>{{qualification.skill}}</td>
            <td><button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editModal" (click)="setCurrentQualification(qualification)"><i class="bi bi-pencil-square"></i></button></td>
            <td><button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#deleteModal" (click)="setCurrentId(qualification.id)"><i class="bi bi-trash3"></i></button></td>
          </tr>
        }
      </tbody>
    </table>
    <app-edit-modal [data]="getCurrentQualification()"></app-edit-modal>
    <app-delete-modal [data]="getCurrentId()"></app-delete-modal>
    <app-create-modal></app-create-modal>
  `,
  styleUrl: './qualification-list.component.css'
})
export class QualificationListComponent {
  bearer = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3Mzc1NDk4NTAsImlhdCI6MTczNzU0NjI1MCwianRpIjoiM2JkN2FlZDAtZWE3NS00YjQ5LThlNWEtMTA1ZGZlM2RjMTZjIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiI2MGZhODhjNC1lMTM5LTRjNjYtYWNkNy0wMDcyYjAzM2FkMzIiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicHJvZHVjdF9vd25lciIsIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.gPgoXzJSa2MWLkN5kabRL1ze8ZmVX7zGGOjzeTzN_13eymCABCQmYFC1G5Hdh2k2fKfhUwpuOTOj9GydplRudfT8lsDQPWmuJJR2FWD5xRNqfUiyLbREs-5mov0fRpM980d3sNYF4v1WGPYyE0a7NRnJk1pODJ0nLEoebEUGVti2JfUt0TGLDvVs1L6Boz76aM47XB1ga5rfUJXa8O1rBGmJHccDqxB2fEfWq9fiev5TtmYO_PFfe94edr1KBNkN3yUiksD_GyxHOX3S6xh2MyNi3kmpxnF61eLO00iuD5hZK-SX8-aPTQNJepc9-a5A3khrfv_kh0f2-ONq6s_8Sw';
  qualifications$: Observable<Qualification[]>;
  currentId: number | undefined;
  qualification? : Qualification | undefined;

  constructor(private http: HttpClient) {
    this.qualifications$ = of([]);
    this.fetchData();
  }

  fetchData(): void {
    this.qualifications$ = this.http.get<Qualification[]>('http://localhost:8089/qualifications', {
      headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${this.bearer}`)
    });
  }

  setCurrentId(id: number | undefined): void {
    this.currentId = id;
  }

  getCurrentId(): number | undefined {
    return this.currentId;
  }

  setCurrentQualification(skill: Qualification): void {
    this.qualification = skill;
  }

  getCurrentQualification(): Qualification | undefined{
    return this.qualification;
  }
}
