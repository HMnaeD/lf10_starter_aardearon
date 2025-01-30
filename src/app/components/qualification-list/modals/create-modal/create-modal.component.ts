import { Component } from '@angular/core';
import {Qualification} from "../../../../model/qualification";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {QualificationDTO} from "../../../../model/qualificationDTO";
import {BearerToken} from "../../../../services/bearer.service";

@Component({
  selector: 'app-create-modal',
  standalone: true,
  imports: [
    FormsModule
  ],
  template: `
    <div class="modal fade" id="createModal" tabindex="-1" aria-labelledby="createModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="createModalLabel">Qualifikation erstellen</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="qualification-name" class="col-form-label">Bezeichnung:</label>
              <input type="text" class="form-control" id="qualification-name" [(ngModel)]="skillName" name="skill-name">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" (click)="setQualification()">Erstellen</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Abbrechen</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './create-modal.component.css'
})
export class CreateModalComponent {
  skillName: string | undefined;

  constructor(private http: HttpClient, private bearer: BearerToken) {
  }

  addData(qualifikation: QualificationDTO) {
    return this.http.post<Qualification>('http://localhost:8089/qualifications', qualifikation, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer.token}`)
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

  setQualification() {
    const qualification = new QualificationDTO(this.skillName);
    this.addData(qualification);
  }
}

