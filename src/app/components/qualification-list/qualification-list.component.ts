import {Component} from '@angular/core';
import {Qualification} from "../../model/qualification";
import {EditModalComponent} from "./modals/edit-modal/edit-modal.component";
import {DeleteModalComponent} from "./modals/delete-modal/delete-modal.component";
import {CreateModalComponent} from "./modals/create-modal/create-modal.component";
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AsyncPipe} from "@angular/common";
import {HeaderComponent} from "../../header/header.component";

@Component({
  selector: 'app-qualification-list',
  standalone: true,
  imports: [
    EditModalComponent,
    DeleteModalComponent,
    CreateModalComponent,
    AsyncPipe,
    HeaderComponent
  ],
  template: `
    <app-header></app-header>
    <div id="qualification-table" class="container mt-5">
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
    </div>
    <app-edit-modal [data]="getCurrentQualification()"></app-edit-modal>
    <app-delete-modal [data]="getCurrentId()"></app-delete-modal>
    <app-create-modal></app-create-modal>
  `,
  styleUrl: './qualification-list.component.css'
})
export class QualificationListComponent {
  bearer = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3MzgyMjUxOTQsImlhdCI6MTczODIyMTU5NCwianRpIjoiMTNiYjkyN2EtYjgwNC00M2RmLTg2NGItMTEzZTkyYmQzYjQxIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiI5M2E0YTlkZC0zMWRjLTQyNWEtYjA5NC1kMzAxMTMzYWIzYzQiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicHJvZHVjdF9vd25lciIsIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.XDIm52W4NT3xJluJRRwjCK0fEMuJhO6agXuL3Rq8OJtZNL8GdWp7VFCM5gGVw-mvD5REorOLcP_xWwQH8isZ1c5xxsAJ-067RwrkxgX0NYuAUE5X5hStv9Cu2H8676v2UhK8l72WTtOVzR81mrtKtoActHredxYm3lmiYw6S0k_QylRC5o1osdAV7pbgd_H8-YBUFsJHRU6QkfItashnRaxQnyUrfCdGcCs2ULCsWnX6Givj3vOHG6k3QYVwPlm1DivbN93zvUgJZS2SyNNsoMU9huddDHEwFri5q7QED_2IJG8u4LyV3CZCGRLU0_XD755izNmYgksdKVG248f_Hg';
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
