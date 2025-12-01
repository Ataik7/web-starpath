import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

/**
 * Componente de la Página de Contacto.
 *
 * Este componente gestiona el formulario de contacto que permite a los usuarios
 * enviar mensajes, reportar bugs o contactar con el soporte técnico.
 * Utiliza 'Template-Driven Forms' de Angular para gestionar los datos y la validación básica.
 *
 * @author Iván Gastineau
 * @version 1.0
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule], 
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {

  /**
   * Método que se ejecuta al enviar el formulario (ngSubmit).
   *
   * 1. Recibe el objeto del formulario.
   * 2. Verifica si el formulario es válido (todos los campos obligatorios están rellenos).
   * 3. Si es válido, muestra una alerta de éxito y limpia los campos.
   * 4. Si no es válido, muestra una alerta de error pidiendo revisar los datos.
   *
   * @param form - El objeto NgForm que contiene los valores y el estado de validación.
   */
  sendMessage(form: any) {
    // Comprobamos si el formulario es válido
    if (form.valid) {
      alert('¡Mensaje enviado correctamente! Gracias por contactar con Starpath.');
      form.reset(); // Limpia el formulario
    } else {
      alert('Por favor, rellena todos los campos correctamente.');
    }
  }
}
