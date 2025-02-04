import {Component, Input} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Employee} from "../../../Employee";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BearerToken} from "../../../services/bearer.service";

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {
  @Input() employee!: Employee | undefined;

  constructor(private http: HttpClient, private bearer: BearerToken) {
  }

  delete() {
    return this.http.delete(`http://localhost:8089/employees/${this.employee?.id}`, {
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
