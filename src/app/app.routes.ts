import { Routes } from '@angular/router';
import { Home} from './home/home';
import { About } from './about/about';
import { MySelf } from './my-self/my-self';
import { Login } from './login/login';
import { Empdetais } from './empdetais/empdetais';
import { Navbar } from './navbar/navbar';

export const routes: Routes = [
    {path:   '',component: Login},
    {path:   'login',component: Login},
    {path:   'home',component: Home},
    {path: 'my-self',component: MySelf},
    {path:   'about',component: About},
    {path:   'empdetais',component: Empdetais},
    {path: 'navbar',component: Navbar},
    {path: '**',redirectTo: 'my-self'},
];
