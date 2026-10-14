import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  // protected readonly title = signal('DemoApp');
  // constructor (private router : Router) {
  //   this.router.navigate(['/home']);
  //   this.router.navigate(['/about']);
  //   this.router.navigate(['/myself']);
  // }

}
