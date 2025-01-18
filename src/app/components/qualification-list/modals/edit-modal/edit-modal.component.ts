import {Component, Input} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Qualification} from "../../../../model/qualification";
import {FormsModule} from "@angular/forms";

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
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" (click)="setName()">Anwenden</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Abbrechen</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './edit-modal.component.css'
})
export class EditModalComponent {
  @Input() data!: Qualification | undefined;
  bearer = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3MzcyMjM3NTksImlhdCI6MTczNzIyMDE1OSwianRpIjoiZWIyOWEwOGItNmI0Ny00NjY3LTg0ZmUtY2IyYTI3ZjMxNWQ0IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiJhY2Q0Mzg2Ni0xZWE3LTQ4YmMtYTBlNC00NGFjZmI4N2JiNzQiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicHJvZHVjdF9vd25lciIsIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.LCGLnfxzfCc_wHPHav5NNqP85bx5BFxawJEqUNqlx-v8RuB0WsRPeacBTvzjYpZ57OPrxTB7zS2zHOie_8AvOEKEmE5wbXrLGh42jtLrmr-yYYAmEWj8nenY0dtxUXLUdYBX3f7XpDcvQaL-q4CVglZUfJumXhzSPKQOuc7yYkjth1wk2OcGfPXLvakJ9GdBbdg1fGtw9nrM0R1JyX8z4n8WBDeFwI5kepQ2UAOMHwHE25NsK6ocXXxtafRnFn5r4SmcfYzj87lp1td8kicLB6QE1rSeqehQ2oT2HlkXB_-PDOewEmLMs759-Apjtj3RSin3wYERjvLlpX6zGP2FhA';
  skillName: string | undefined;

  constructor(private http: HttpClient) {
  }
  updateData(qualification: Qualification) {
    return this.http.put<Qualification>(`http://localhost:8089/qualifications/${qualification.id}`, qualification, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    });
  }

  setName() {
    if (this.data) {
      this.data.skill = this.skillName;
      this.skillName = '';
    }
  }
}
