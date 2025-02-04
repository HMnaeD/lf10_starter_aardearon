import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Employee} from "../../../Employee";
import {FormsModule} from "@angular/forms";
import {CommonModule} from '@angular/common';
import {Subscription} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BearerToken} from "../../../services/bearer.service";

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    FormsModule, CommonModule
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})

export class AddComponent {
  @Input() employee!: Employee | undefined;

  constructor(private http: HttpClient, private bearer: BearerToken) {
  }

  add() {
    return this.http.post(`http://localhost:8089/employees/${this.employee?.id}/qualifications/`, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer.token}`)
    }).subscribe({
      next: (response: Object) => {
        console.log(`Qualifikation erfolgreich hinzugefügt`, response);
        location.reload();
      },
      error: (err) => {
        console.error('Fehler beim Hinzufügen:', err)
      }
    });
  }
}
