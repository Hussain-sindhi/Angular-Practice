import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Child } from './child/child';

@Component({
  imports: [Navbar, Child],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  pmsg: string = '';

  replyFromChild(msg: string) {
    this.pmsg = msg;
  }
}
