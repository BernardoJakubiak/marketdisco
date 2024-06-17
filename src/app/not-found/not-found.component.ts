import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <h1>Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <a routerLink="/layout/index">Go to Home</a> <!-- Link to your home page -->
  `,
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent { }
