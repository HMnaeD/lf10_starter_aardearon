import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Employee} from "../Employee";

@Component({
    selector: 'app-employee-list',
    imports: [CommonModule],
    templateUrl: './employee-list.component.html',
    styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  bearer = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3MzgyMjUxOTQsImlhdCI6MTczODIyMTU5NCwianRpIjoiMTNiYjkyN2EtYjgwNC00M2RmLTg2NGItMTEzZTkyYmQzYjQxIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiI5M2E0YTlkZC0zMWRjLTQyNWEtYjA5NC1kMzAxMTMzYWIzYzQiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicHJvZHVjdF9vd25lciIsIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.XDIm52W4NT3xJluJRRwjCK0fEMuJhO6agXuL3Rq8OJtZNL8GdWp7VFCM5gGVw-mvD5REorOLcP_xWwQH8isZ1c5xxsAJ-067RwrkxgX0NYuAUE5X5hStv9Cu2H8676v2UhK8l72WTtOVzR81mrtKtoActHredxYm3lmiYw6S0k_QylRC5o1osdAV7pbgd_H8-YBUFsJHRU6QkfItashnRaxQnyUrfCdGcCs2ULCsWnX6Givj3vOHG6k3QYVwPlm1DivbN93zvUgJZS2SyNNsoMU9huddDHEwFri5q7QED_2IJG8u4LyV3CZCGRLU0_XD755izNmYgksdKVG248f_Hg';
  employees$: Observable<Employee[]>;

  constructor(private http: HttpClient) {
    this.employees$ = of([]);
    this.fetchData();
  }

  fetchData() {
    this.employees$ = this.http.get<Employee[]>('http://localhost:8089/employees', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)
    });
  }
}
