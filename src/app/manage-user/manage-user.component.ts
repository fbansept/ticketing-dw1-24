import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-manage-user',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.scss',
})
export class ManageUserComponent {
  html: HttpClient = inject(HttpClient);
  userList: any = [];

  ngOnInit() {
    this.html
      .get('http://localhost/backend-angular-ticket-dw1-24/user-list.php')
      .subscribe({
        next: (result) => (this.userList = result),
        error: () => alert('Erreur inconnue, contactez votre administrateur'),
      });
  }
}
