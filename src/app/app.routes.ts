import { Routes } from '@angular/router';
import { HomepageComponent } from './page/homepage/homepage.component';
import { RecettesPageComponent } from './page/recettes-page/recettes-page.component';
import { FormPageComponent } from './page/form-page/form-page.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'recettes', component: RecettesPageComponent },
  { path: 'form', component: FormPageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'form/:id', component: FormPageComponent },
];
