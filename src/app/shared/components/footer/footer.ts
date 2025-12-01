import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; 

/**
 * Componente del Pie de Página (Footer).
 *
 * Este componente se muestra en la parte inferior de todas las páginas de la aplicación.
 * Contiene información de copyright, enlaces de navegación rápida y acceso a la
 * política de privacidad.
 *
 * @author Iván Gastineau
 * @version 1.0
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  // Importamos RouterLink para que funcionen los enlaces (Inicio, Descargas, etc.)
  imports: [RouterLink], 
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {

}
