import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { MySelf } from './my-self/my-self';
import { Login } from './login/login';
import { Empdetails } from './empdetails/empdetails';
import { Navbar } from './navbar/navbar';
import { SignIn } from './sign-in/sign-in';
import { Signup } from './signup/signup';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'home', component: Home },
  { path: 'my-self', component: MySelf },
  { path: 'about', component: About },
  { path: 'empdetails', component: Empdetails },
  { path: 'empdetails/:id', component: Empdetails },
  { path: 'emp-details', component: Empdetails },
  { path: 'emp-details/:id', component: Empdetails },
  { path: 'navbar', component: Navbar },
  { path: 'sign-in', component: SignIn },
  { path: '**', redirectTo: 'empdetails' },
];
