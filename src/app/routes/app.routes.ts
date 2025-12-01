import { Routes } from '@angular/router';
import { Home } from '../features/pages/home/home';
import { News } from '../features/pages/news/news';
import { Download } from '../features/pages/download/download';
import { Feature } from '../features/pages/feature/feature';
import { HowToPlay } from '../features/pages/how-to-play/how-to-play';
import { Contact } from '../features/pages/contact/contact';
import { Game } from '../features/pages/game/game';
import { Login } from '../features/pages/login/login';
import { Register } from '../features/pages/register/register';
import { Privacy } from '../features/pages/privacy/privacy';
import { AuthGuard } from '../core/services/auth.guard';
import { ForgotPassword } from '../features/pages/forgot-password/forgot-password';
import { ResetPassword } from '../features/pages/reset-password/reset-password';


export const routes: Routes = [
  { path: '', component: Home }, // Pagina principal
  { path: 'home', component: Home }, // Alias opcional
  { path: 'feature', component: Feature }, // Caracteristicas
  { path: 'news', component: News }, // Noticias
  { path: 'how-to-play', component: HowToPlay }, // Como jugar
  { path: 'contact', component: Contact }, // Para el soporte por ejemplo
  { path: 'download', component: Download }, // Descargas
  { path: 'game', component: Game }, // Probar el juego
  { path: 'login', component: Login }, // Iniciar sesion
  { path: 'register', component: Register }, // Registro
  { path: 'privacy', component: Privacy }, // Política de privacidad
  { path: 'forgot-password', component: ForgotPassword },
  { path: 'reset-password', component: ResetPassword },


  // Por si acaso da errores
  { path: '**', redirectTo: '', pathMatch: 'full' }
];