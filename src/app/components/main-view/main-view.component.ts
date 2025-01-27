import { Component } from '@angular/core';
import {QualificationListComponent} from "../qualification-list/qualification-list.component";
import {DataService} from '../../services/data.service';
import {Qualification} from "../../model/qualification";

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [
    QualificationListComponent
  ],
  template: `
    <app-qualification-list></app-qualification-list>
  `,
  styleUrl: './main-view.component.css'
})
export class MainViewComponent {
}
