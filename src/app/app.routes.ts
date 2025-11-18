import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { News } from './pages/news/news';
import { Download } from './pages/download/download';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'news', component: News },
  { path: 'download', component: Download },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' } 
];