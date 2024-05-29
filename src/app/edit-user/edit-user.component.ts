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
  selector: 'app-edit-user',
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
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
})
export class EditUserComponent {
  http: HttpClient = inject(HttpClient);
  formBuilder: FormBuilder = inject(FormBuilder);
  snackBar: MatSnackBar = inject(MatSnackBar);
  router: Router = inject(Router);

  formulaire: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    role: ['Etudiant', [Validators.required]],
  });

  roleList: string[] = ['Etudiant', 'Gestionnaire', 'Administrateur'];

  onAjoutUtilisateur() {
    if (this.formulaire.valid) {
      this.http
        .post(
          'http://localhost/backend-angular-ticket-dw1-24/add-user.php',
          this.formulaire.value
        )
        .subscribe({
          next: (resultat) => {
            this.snackBar.open("L'utilisateur a bien été ajouté", undefined, {
              duration: 3000,
            });
            this.router.navigateByUrl('/gestion-utilisateurs');
          },
          error: (erreur) => {
            if (erreur.status == 409) {
              alert(erreur.error.message);
            } else {
              alert('Erreur inconnue, contactez votre administrateur');
            }
          },
        });
    }
  }
}
