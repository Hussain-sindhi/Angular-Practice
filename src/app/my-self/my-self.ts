import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Navbar } from '../navbar/navbar';

@Component({
  imports: [RouterLink, Navbar],
  selector: 'app-my-self',
  styleUrl: './my-self.css',
  templateUrl: './my-self.html',
})
export class MySelf {
  name: string = 'Mohammad Hussain Sindhi';
  age: number = 21;
  course: string = 'Btech in CSE';
  college: string = 'University College of Engineering, Banswara';

  constructor(private router: Router) {}

  RouteParams() {
    this.router.navigate(['/emp-details', 101]);
  }
}
