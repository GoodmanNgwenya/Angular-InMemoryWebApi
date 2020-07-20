import { Component } from '@angular/core';

@Component({
  selector: 'pm-root',
  template: `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" >{{pageTitle}}</a>
    <ul class="nav navbar-nav ml-auto">
      <li class="nav-item">
        <a class="nav-link" [routerLink]="['/welcome']">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" >Items</a>
      </li>
    </ul>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="nav navbar-nav ml-auto">
          <li class="nav-item">
          <a class="nav-link" [routerLink]="['/login']">Login</a>
          </li>
        </ul>
      </div>
  </nav>
  <div class='container'>
      <router-outlet></router-outlet>
    </div>
    `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Goodies-Online-Store';
}
