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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-ticket',
  standalone: true,
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './info-ticket.component.html',
  styleUrl: './info-ticket.component.scss',
})
export class InfoTicketComponent {
  http: HttpClient = inject(HttpClient);
  formBuilder: FormBuilder = inject(FormBuilder);
  snackBar: MatSnackBar = inject(MatSnackBar);
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);

  formulaire: FormGroup = this.formBuilder.group({
    contenu: ['', [Validators.required]],
  });

  idTicket?: number;
  messageList: any = [];

  ngOnInit() {
    this.route.params.subscribe((parametres) => {
      //si il y a bien un parametre dans l'URL et que c'est bien un nombre
      if (parametres['id'] && !isNaN(parametres['id'])) {
        const jwt = localStorage.getItem('jwt');
        this.idTicket = parametres['id'];
        if (jwt) {
          this.http
            .get(
              'http://localhost/backend-angular-ticket-dw1-24/get-ticket.php?id=' +
                parametres['id'],
              { headers: { Authorization: jwt } }
            )
            .subscribe({
              next: (messageList) => {

                this.messageList = messageList;
              },
              error: (erreur) => alert(erreur.error.message),
            });
        }
      }
    });
  }

  onAjoutMessage() {
    if (this.formulaire.valid) {
      const jwt = localStorage.getItem('jwt');

      if (jwt) {
        this.http
          .post(
            'http://localhost/backend-angular-ticket-dw1-24/add-message.php?id_ticket=' +
              this.idTicket,
            this.formulaire.value,
            {
              headers: { Authorization: jwt },
            }
          )
          .subscribe({
            next: (resultat) => {
              this.snackBar.open('Le message a bien été ajouté', undefined, {
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

  onClicMarqueCommeResolu() {
    const jwt = localStorage.getItem('jwt');

    if (jwt != null) {
      this.http
        .post(
          'http://localhost/backend-angular-ticket-dw1-24/ticket-resolu.php?id_ticket=' +
            this.idTicket,
          {},
          {
            headers: { Authorization: jwt },
          }
        )
        .subscribe({
          next: (resultat) => {
            this.snackBar.open('Le ticket est marqué comme résolu', undefined, {
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
