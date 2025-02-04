import {Component, Input} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BearerToken} from "../../../../services/bearer.service";

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [],
  template: `
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="deleteModalLabel">Qualifikation löschen</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p class="text-break">Sie sind dabei die Qualifikation zu löschen. Sind Sie sicher, dass Sie das möchten?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" (click)="delete()">Löschen</button>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Abbrechen</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './delete-modal.component.css'
})
export class DeleteModalComponent {
  @Input() data!: number | undefined;

  constructor(private http: HttpClient, private bearer: BearerToken) {
  }

  delete() {
    return this.http.delete(`http://localhost:8089/qualifications/${this.data}`, {
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
}
