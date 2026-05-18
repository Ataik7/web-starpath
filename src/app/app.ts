import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Navbar } from './shared/components/navbar/navbar';
import { Footer } from './shared/components/footer/footer';

/**
 * Componente Raíz de la Aplicación (AppComponent).
 *
 * Este es el componente principal que actúa como contenedor ("concha") de toda la aplicación.
 * Define la estructura base del layout, que incluye:
 * 1. La Barra de Navegación (Navbar) en la parte superior.
 * 2. El área de contenido dinámico (RouterOutlet) donde se cargan las páginas.
 * 3. El Pie de Página (Footer) en la parte inferior.
 *
 * @author Iván Gastineau y Pablo Nicolás
 * @version 1.0
 */
@Component({
  selector: 'app-root',
  standalone: true, // Le dice a Angular que este componente se gestiona solo

  // Añadimos las clases a la lista de imports
  imports: [
    RouterOutlet,
    FormsModule,
    Navbar,
    Footer
  ],

  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  title = 'starpath';

  constructor(private router: Router) {}

  ngOnInit() {
    // Si Supabase redirige el token de recuperación a la raíz, lo redirigimos a /reset-password
    const hash = window.location.hash;
    if (hash && hash.includes('access_token') && hash.includes('type=recovery')) {
      this.router.navigateByUrl('/reset-password' + hash);
    }
  }
}
