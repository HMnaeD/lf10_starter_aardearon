import {Qualification} from "../model/qualification";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DataService{
  skills: Qualification[] = [];

  constructor() {
    this.skills.push(new Qualification(1, 'Java'));
    this.skills.push(new Qualification(2, 'Python'));
    this.skills.push(new Qualification(3, 'C++'));
  }
}
