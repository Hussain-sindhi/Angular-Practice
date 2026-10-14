import { Component } from '@angular/core';

@Component({
  imports: [],
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
