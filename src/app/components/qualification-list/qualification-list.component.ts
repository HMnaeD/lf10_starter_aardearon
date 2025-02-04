import {Component} from '@angular/core';
import {Qualification} from "../../model/qualification";
import {EditModalComponent} from "./modals/edit-modal/edit-modal.component";
import {DeleteModalComponent} from "./modals/delete-modal/delete-modal.component";
import {CreateModalComponent} from "./modals/create-modal/create-modal.component";
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AsyncPipe} from "@angular/common";
import {HeaderComponent} from "../../header/header.component";
import {BearerToken} from "../../services/bearer.service";

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
              <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal" (click)="setCurrentQualification(qualification)"><i class="bi bi-pencil-square"></i></button></td>
              <td><button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" (click)="setCurrentId(qualification.id)"><i class="bi bi-trash3"></i></button></td>
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
  qualifications$: Observable<Qualification[]>;
  currentId: number | undefined;
  qualification? : Qualification | undefined;

  constructor(private http: HttpClient, private bearer: BearerToken) {
    this.qualifications$ = of([]);
    this.fetchData();
  }

  fetchData(): void {
    this.qualifications$ = this.http.get<Qualification[]>('http://localhost:8089/qualifications', {
      headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${this.bearer.token}`)
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
