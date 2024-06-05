import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { InfoTicketComponent } from './info-ticket/info-ticket.component';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';

export const routes: Routes = [
  { path: 'accueil', component: HomeComponent },
  { path: 'ajout-utilisateur', component: EditUserComponent },
  { path: 'modifier-utilisateur/:id', component: EditUserComponent },
  { path: 'gestion-utilisateurs', component: ManageUserComponent },
  { path: 'connexion', component: LoginComponent },
  { path: 'info-ticket/:id', component: InfoTicketComponent },
  { path: 'add-ticket', component: EditTicketComponent },
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
