import {Component, Input} from '@angular/core';
import {Qualification} from "../../model/qualification";
import {EditModalComponent} from "./modals/edit-modal/edit-modal.component";
import {DeleteModalComponent} from "./modals/delete-modal/delete-modal.component";
import {CreateModalComponent} from "./modals/create-modal/create-modal.component";

@Component({
  selector: 'app-qualification-list',
  standalone: true,
  imports: [
    EditModalComponent,
    DeleteModalComponent,
    CreateModalComponent
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
        @for (qualification of qualifications; track qualification.id) {
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
  @Input() qualifications: Qualification[] = [];
}
