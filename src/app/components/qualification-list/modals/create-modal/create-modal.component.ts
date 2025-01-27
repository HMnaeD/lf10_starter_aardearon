import { Component } from '@angular/core';
import {Qualification} from "../../../../model/qualification";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {QualificationDTO} from "../../../../model/qualificationDTO";

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
            <h1 class="modal-title fs-5" id="createModalLabel">New message</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label">Bezeichnung:</label>
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
  bearer = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3Mzc1NDk4NTAsImlhdCI6MTczNzU0NjI1MCwianRpIjoiM2JkN2FlZDAtZWE3NS00YjQ5LThlNWEtMTA1ZGZlM2RjMTZjIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiI2MGZhODhjNC1lMTM5LTRjNjYtYWNkNy0wMDcyYjAzM2FkMzIiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicHJvZHVjdF9vd25lciIsIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.gPgoXzJSa2MWLkN5kabRL1ze8ZmVX7zGGOjzeTzN_13eymCABCQmYFC1G5Hdh2k2fKfhUwpuOTOj9GydplRudfT8lsDQPWmuJJR2FWD5xRNqfUiyLbREs-5mov0fRpM980d3sNYF4v1WGPYyE0a7NRnJk1pODJ0nLEoebEUGVti2JfUt0TGLDvVs1L6Boz76aM47XB1ga5rfUJXa8O1rBGmJHccDqxB2fEfWq9fiev5TtmYO_PFfe94edr1KBNkN3yUiksD_GyxHOX3S6xh2MyNi3kmpxnF61eLO00iuD5hZK-SX8-aPTQNJepc9-a5A3khrfv_kh0f2-ONq6s_8Sw';
  skillName: string | undefined;

  constructor(private http: HttpClient) {
  }

  addData(qualifikation: QualificationDTO) {
    return this.http.post<Qualification>('http://localhost:8089/qualifications', qualifikation, {
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

  setQualification() {
    const qualification = new QualificationDTO(this.skillName);
    this.addData(qualification);
  }
}

