import {Component, Input} from '@angular/core';
import {Employee} from "../../../Employee";
import {FormsModule} from "@angular/forms";
import {CommonModule} from '@angular/common';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BearerToken} from "../../../services/bearer.service";
import {Qualification} from "../../../model/qualification";

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    FormsModule, CommonModule
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})

export class SkillsComponent {
  @Input() employee!: Employee | undefined;

  availableSkills: any[] = [];
  selectedSkill?: string;
  newSkillName: string = '';

  constructor(private http: HttpClient, private bearer: BearerToken) {
  }

  ngOnInit() {
    this.fetchQualifications();
  }

  fetchQualifications() {
    this.http.get<Qualification[]>('http://localhost:8089/qualifications', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer.token}`)
    }).subscribe({
      next: (skills) => {
        this.availableSkills = skills;
      },
      error: (err) => console.error('Fehler beim Laden der Qualifikationen:', err)
    });
  }

  addSkillToEmployee() {
    if (!this.employee?.id) {
      console.error("Fehler: employee.id ist undefined!");
      return;
    }

    const newSkill = { skill: this.selectedSkill };

    this.http.post(`http://localhost:8089/employees/${this.employee.id}/qualifications`, newSkill, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.bearer.token}`)
    }).subscribe({
      next: (response) => {
        console.log('Erfolgreich hinzugefügt:', response);
        this.employee?.skillSet?.push(newSkill);
      },
      error: (err) => {
        console.error("Fehler beim hinzufügen:", err);
      }
    });
  }

  createNewSkill() {
    if (!this.newSkillName.trim()) {
      console.error("Fehler: Der neue Skill-Name ist leer!");
      return;
    }

    const newSkill = { skill: this.newSkillName };

    this.http.post('http://localhost:8089/qualifications', newSkill, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer.token}`)
    }).subscribe({
      next: (response) => {
        console.log('Neue Qualifikation erstellt:', response);
        this.availableSkills.push(newSkill);
        this.newSkillName = '';

        if (this.employee) {
          if (!this.employee.skillSet) {
            this.employee.skillSet = [];
          }
          this.employee.skillSet.push(newSkill);
        }

        this.newSkillName = '';
      },
      error: (err) => console.error('Fehler beim Erstellen der Qualifikation:', err)
    });
  }

  delete(skillId: number | undefined) {
    if (!this.employee?.id || !skillId) {
      console.error('Mitarbeiter-ID oder Skill-ID fehlt!');
      return;
    }

    return this.http.delete(`http://localhost:8089/employees/${this.employee?.id}/qualifications/${skillId}`, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer.token}`)
    }).subscribe({
      next: (response: Object) => {
        console.log(`Qualifikation ${skillId} erfolgreich gelöscht`);
        this.employee!.skillSet = this.employee?.skillSet?.filter((s: any) => s.id !== skillId) || [];
      },
      error: (err) => {
        console.error('Fehler beim Löschen:', err)
      }
    });
  }
}
