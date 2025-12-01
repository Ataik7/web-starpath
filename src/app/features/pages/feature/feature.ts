import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'

/**
 * Componente de la Página de Características (Features).
 *
 * Esta página detalla las funcionalidades principales del videojuego "Starpath RPG".
 * Presenta la información de forma visual mediante tarjetas (cards) con iconos,
 * destacando aspectos como el combate, la exploración, el sistema de progreso
 * y la tecnología utilizada.
 *
 * Incluye una llamada a la acción (CTA) final para invitar al registro.
 *
 * @author Iván Gastineau
 * @version 1.0
 */
@Component({
  selector: 'app-feature',
  imports: [RouterLink],
  templateUrl: './feature.html',
  styleUrl: './feature.css',
})
export class Feature {

}
