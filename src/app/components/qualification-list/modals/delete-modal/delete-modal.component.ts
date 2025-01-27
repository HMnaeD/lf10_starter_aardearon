import {Component, Input} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

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
            <p class="text-break">Sie sind dabei Qualifikation X zu löschen. Sind Sie sicher, das Sie das möchten?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" (click)="delete()">Löschen</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Abbrechen</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './delete-modal.component.css'
})
export class DeleteModalComponent {
  bearer = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3Mzc5NzM3ODgsImlhdCI6MTczNzk3MDE4OCwianRpIjoiNWQ2YzMzNzEtZGYzZS00MzI2LWFlMDItZmZkNGYxMGE1MmUyIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiI5YTRlMTU5MS0xM2MzLTQ5MmItOTEwMy00NjM3Y2UzMzA3ZDIiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicHJvZHVjdF9vd25lciIsIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.KrAxLAbE0524oc0oyMMXhLiV7m4U1FKSZdXhs8jWlW2QepvdPq2Rf7uvps7OpL43QFW3AH55AYGgBQi0i6slgiosmrGp52TNcUwhfSF79nx_7uXHTo8pCWjUdXTpBtm9zYvPT0UiIuNtHmRykfw14wvrhq_XzG_q6jXc056KFg4yzzNmVE74yp2IsA8275E2ZROZPEjC_QFZOPzsusXfOK78WtToZiqbxp7ds1Zb2KelUVjzHS7KOXMemwH1qnBYVqBdtZLygZqxT_t7S7icpR6Hqes87bs7UhZ5hPSFpdoMisnvCXvDu0bj1fKa0HQOIXgIALHcPuaMLwaT_E_m4w';
  @Input() data!: number | undefined;

  constructor(private http: HttpClient) {
  }

  delete() {
    return this.http.delete(`http://localhost:8089/qualifications/${this.data}`, {
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
}
