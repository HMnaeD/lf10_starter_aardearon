import {RouterModule, Routes} from '@angular/router';
import {QualificationListComponent} from "./components/qualification-list/qualification-list.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {MainComponent} from "./main/main.component";
import {AuthGuard} from "./auth.guard";
import {ImprintComponent} from "./imprint/imprint.component";
import {EmployeeListComponent} from "./employee-list/employee-list.component";

export const routes: Routes = [
  { path: '', component: MainComponent}, //Public main page
  { path: 'landing-page', component: LandingPageComponent, canActivate: [AuthGuard] },
  { path: 'qualifications',  component: QualificationListComponent, canActivate: [AuthGuard] },
  { path: 'imprint', component: ImprintComponent, canActivate: [AuthGuard] },
  { path: 'employees', component: EmployeeListComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' } // All unknown pages lead to main page
];
