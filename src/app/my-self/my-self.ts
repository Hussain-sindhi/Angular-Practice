import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-my-self',
  styleUrl: './my-self.css',
  templateUrl: './my-self.html',
})
export class MySelf {
  name: string = 'Mohammad Hussain Sindhi';
  age: number = 21;
  course: string = 'Btech in CSE';
  college: string = 'University College of Engineering, Banswara';
}
