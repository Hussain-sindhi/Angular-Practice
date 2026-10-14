import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
    constructor(private router: Router) { }
  logout() {
    this.router.navigate(['/login'])
  }
}
