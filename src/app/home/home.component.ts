import { Component, inject } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    RouterLink,
    MatButtonModule,
    HttpClientModule,
    DatePipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  ticketList: any = [];

  html: HttpClient = inject(HttpClient);

  ngOnInit() {
    this.raffraichir();
  }

  raffraichir() {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      this.html
        .get('http://localhost/backend-angular-ticket-dw1-24/ticket-list.php', {
          headers: { Authorization: jwt },
        })
        .subscribe({
          next: (result) => (this.ticketList = result),
          error: () => alert('Erreur inconnue, contactez votre administrateur'),
        });
    }
  }
}
