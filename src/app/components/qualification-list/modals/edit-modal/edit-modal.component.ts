import {Component, Input} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Qualification} from "../../../../model/qualification";
import {FormsModule} from "@angular/forms";
import {BearerToken} from "../../../../services/bearer.service";

@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [
    FormsModule
  ],
  template: `
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="editModalLabel">Qualifikation bearbeiten</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="qualification-name" class="col-form-label">Bezeichnung:</label>
                <input type="text" class="form-control" id="qualification-name" [(ngModel)]="skillName" name="skill-name">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" (click)="setName()">Anwenden</button>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Abbrechen</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './edit-modal.component.css'
})
export class EditModalComponent {
  @Input() data!: Qualification | undefined;
  skillName: string | undefined;

  constructor(private http: HttpClient, private bearer: BearerToken) {
  }
  updateData(qualification: Qualification) {
    return this.http.put<Qualification>(`http://localhost:8089/qualifications/${qualification.id}`, qualification, {
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

  setName() {
    if (this.data) {
      this.data.skill = this.skillName || this.data.skill;
      this.skillName = '';
      this.updateData(this.data);
    }
  }
}
