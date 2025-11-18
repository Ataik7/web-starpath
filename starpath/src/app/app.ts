import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Importamos las clases de las piezas
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true, // Le dice a Angular que este componente se gestiona solo

  // Añadimos las clases a la lista de imports
  imports: [
    RouterOutlet, 
    Navbar, 
    Footer
  ],

  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'starpath';
}
