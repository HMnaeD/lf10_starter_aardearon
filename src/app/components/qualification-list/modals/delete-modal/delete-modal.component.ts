import {Component, Input} from '@angular/core';
import {Qualification} from "../../../../model/qualification";
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
            <button type="button" class="btn btn-secondary" (click)="delete()">Löschen</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Abbrechen</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './delete-modal.component.css'
})
export class DeleteModalComponent {
  bearer = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3MzcwMzE3ODYsImlhdCI6MTczNzAyODE4NiwianRpIjoiYzdjZDExOTQtN2ZhZi00YzQzLWJlZGUtMmVkNGMzZDA0OWQ4IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiJhYmEzYzllNS01ZTU4LTQxYjMtYjg2Ny0xYTkyM2I0MmYxNjQiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicHJvZHVjdF9vd25lciIsIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.VwppuMRFrHRkyBLmCieZ95YiutDwrFKVHvQ01SCm_8rGwPQ1_OHCPy0pz22n61iQc2iFU6ThhTFqeAjV5hT6Ecb5A0MMaU0n8Zpds_7dz02LYbO8eysU5LtjYjk-z85EzzugmJ6xJP24upQ9W2Q481TYo6ozJuvPLK-HfbZNvozcMAkZd9kjl0A5zVMHhcKvx2KaV5nkHoalkkzzsj9zBfMeIGI6FBnB9oio7pgvRih5i8ssbzj2i3cnn2vLbHAW-3fYT-gBiUOewZBT1w82_B096Rl1MvAduHCy5hhD9thJLDurK6pajzLiLvenBogcMangnNkA751nUV1Plk9xrA';
  @Input() data!: number | undefined;

  constructor(private http: HttpClient) {
  }

  delete() {
    console.log(this.data);
    this.http.delete<Qualification>(`http://localhost:8089/qualifications/${this.data}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.bearer}`)
    });
  }
}
