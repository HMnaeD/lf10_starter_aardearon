import {Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Observable, BehaviorSubject, of} from "rxjs";
import {map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Employee} from "../Employee";
import {BearerToken} from "../services/bearer.service";
import {RouterLink, RouterOutlet} from "@angular/router";
import {CreateComponent} from "./modal/create/create.component";
import {DeleteComponent} from "./modal/delete/delete.component";
import {EditComponent} from "./modal/edit/edit.component";
import {FilterComponent} from "./modal/filter/filter.component";
import {HeaderComponent} from "../header/header.component";
import {SkillsComponent} from "./modal/skills/skills.component";
import {AddComponent} from "./modal/add/add.component";

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule, RouterLink, RouterOutlet, CreateComponent, DeleteComponent, EditComponent, FilterComponent, SkillsComponent, AddComponent, HeaderComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class EmployeeListComponent implements OnInit {
  private allEmployees$ = new BehaviorSubject<Employee[]>([]);
  filteredEmployees$ = this.allEmployees$.asObservable();

  selectedEmployee?: Employee | undefined;

  constructor(private http: HttpClient, private bearer: BearerToken) {
    // this.employees$ = of([]);
    // this.fetchData();
  }

  fetchData() {
    this.http.get<Employee[]>('http://localhost:8089/employees', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer.token}`)
    }).subscribe(data => {
      this.allEmployees$.next(data);
    })
  }

  ngOnInit(): void {
    this.fetchData();
  }

  applyFilter(filterData: {name: string, qualification: string}) {
    this.filteredEmployees$ = this.allEmployees$.pipe(
      map(employees => employees.filter(emp =>
        (filterData.name ? `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(filterData.name.toLowerCase()) : true) &&
        (filterData.qualification ? (emp.skillSet ?? []).some(skill => (skill?.skill ?? '').toLowerCase().includes(filterData.qualification.toLowerCase())) : true)
      ))
    )}

  setSelectedEmployee(employee: Employee) {
    this.selectedEmployee = { ...employee };
  }
}
