import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { News } from './pages/news/news';
import { Download } from './pages/download/download';
import { Feature } from './pages/feature/feature';
import { HowToPlay } from './pages/how-to-play/how-to-play'; 
import { Contact } from './pages/contact/contact';
import { Game } from './pages/game/game';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Faq } from './pages/faq/faq';

export const routes: Routes = [
  { path: '', component: Home }, // Pagina principal
  { path: 'home', component: Home }, // Alias opcional
  { path: 'feature', component: Feature }, // Caracteristicas
  { path: 'news', component: News }, // Noticias
  { path: 'how-to-play', component: HowToPlay }, // Como jugar
  { path: 'contact', component: Contact }, // Para el soporte por ejemplo
  { path: 'download', component: Download }, // Descargas
  { path: 'game', component: Game }, // Probar el juego
  { path: 'faq', component: Faq }, // Preguntas frecuentes
  { path: 'login', component: Login }, // Iniciar sesion
  { path: 'register', component: Register }, // Registro

  // Por si acaso da errores
    { path: '**', redirectTo: '', pathMatch: 'full' }
];