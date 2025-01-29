import {RouterModule, Routes} from '@angular/router';
import {QualificationListComponent} from "./components/qualification-list/qualification-list.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";

export const routes: Routes = [
  { path: '', component: LandingPageComponent},
  { path: 'qualifications',  component: QualificationListComponent}
];
