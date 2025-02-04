import { Component, EventEmitter, Output } from '@angular/core';
import {Employee} from "../../../Employee";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})

export class FilterComponent {
  name: string = '';
  qualification: string = '';

  @Output() filterApplied = new EventEmitter<{ name: string, qualification: string }>();

  applyFilter() {
    this.filterApplied.emit({ name: this.name, qualification: this.qualification });
  }
}
