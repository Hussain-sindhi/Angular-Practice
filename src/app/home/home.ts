import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { About } from '../about/about';
import { pipe } from 'rxjs';
import { Login } from '../login/login';
import { RouterTestingHarness, ɵɵRouterLink } from '@angular/router/testing';
import {Router, RouterLink} from '@angular/router';

@Component({
  imports: [Navbar],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {}
