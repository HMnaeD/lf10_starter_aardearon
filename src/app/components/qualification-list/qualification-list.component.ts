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
  bearer = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3MzgxNDYwNTksImlhdCI6MTczODE0MjQ1OSwianRpIjoiZDhkM2MwNGQtNDdiNi00ZTBiLWJhNTgtZTQxNDEzNzljM2ZmIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiIwOTdkMWI2OS1hY2M5LTQxYjAtYjhlYi00ZTQ3YmIwNDFlYzYiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicHJvZHVjdF9vd25lciIsIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.LEwUCCGafgNv-xfa1F9BZawfv9LeJ3nU5Wi5TQMj-k6bv1tzrsqBnhOCNwPa_clup_uy02K7rYb9IQlGtM3iFJtVvU13jUs0daG_lCDVCIkPUBMyUbs9UnJ2xzqseaQVuya1FC8tKKlHYFfgFm3uZ9u3FhJRXDo-MdLiBrA5HW1MtaskdkIW10J4Zoi42OSzwD8so-gwtyQ0LlXlA0jwckjLn8YZMLHApH0c5zBfInoT2D-GexZZS03r_5YgXUC4px-5K2_pnUdowgi5mUDt1wqEer65YHbwRyqsMwBFlayi-LuNVO8MHugUAhU0fLXJC4DCaf2pWKnyChUX5KvtdA';
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
