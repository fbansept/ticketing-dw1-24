import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-ticket',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  templateUrl: './edit-ticket.component.html',
  styleUrl: './edit-ticket.component.scss',
})
export class EditTicketComponent {
  http: HttpClient = inject(HttpClient);
  formBuilder: FormBuilder = inject(FormBuilder);
  snackBar: MatSnackBar = inject(MatSnackBar);
  router: Router = inject(Router);

  formulaire: FormGroup = this.formBuilder.group({
    nom: ['', [Validators.required]],
    contenu: ['', [Validators.required]],
  });

  onAjoutTicket() {
    if (this.formulaire.valid) {
      const jwt = localStorage.getItem('jwt');

      if (jwt) {
        this.http
          .post(
            'http://localhost/backend-angular-ticket-dw1-24/add-ticket.php',
            this.formulaire.value,
            {
              headers: { Authorization: jwt },
            }
          )
          .subscribe({
            next: (resultat) => {
              this.snackBar.open('Le ticket a bien été ajouté', undefined, {
                duration: 3000,
              });
              this.router.navigateByUrl('/accueil');
            },
            error: (erreur) => {
              alert('Erreur inconnue, contactez votre administrateur');
            },
          });
      }
    }
  }
}
