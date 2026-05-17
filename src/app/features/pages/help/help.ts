import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * Componente de la página de Ayuda.
 *
 * Proporciona ayuda sensible al contexto mediante secciones desplegables (FAQ),
 * guía rápida de uso y enlaces a las secciones principales de la aplicación.
 *
 * @author Iván Gastineau
 * @version 1.0
 */
@Component({
  selector: 'app-help',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './help.html',
  styleUrl: './help.css'
})
export class Help {
  /** Índice de la pregunta FAQ abierta actualmente (-1 = ninguna) */
  activeIndex: number = -1;

  faqs = [
    {
      pregunta: '¿Cómo creo una cuenta en Starpath?',
      respuesta: 'Haz clic en "Registrarse" en la esquina superior derecha. Introduce tu correo electrónico y una contraseña de al menos 6 caracteres. Recibirás un correo de confirmación.'
    },
    {
      pregunta: '¿Cómo inicio sesión?',
      respuesta: 'Haz clic en "Iniciar sesión" e introduce tu correo y contraseña. Si olvidaste tu contraseña, usa el enlace "¿Olvidaste tu contraseña?" en el formulario de login.'
    },
    {
      pregunta: '¿Cómo puedo probar el juego?',
      respuesta: 'Necesitas tener una cuenta y haber iniciado sesión. Una vez autenticado, accede a "Probar el juego" en el menú de navegación.'
    },
    {
      pregunta: '¿Dónde puedo ver las últimas noticias?',
      respuesta: 'En la sección "Noticias" del menú principal encontrarás todas las actualizaciones, parches y novedades del juego. Puedes usar el buscador para filtrar por tema.'
    },
    {
      pregunta: '¿Cómo descargo el juego?',
      respuesta: 'Ve a la sección "Descargas" en el menú. Encontrarás los instaladores disponibles para cada plataforma.'
    },
    {
      pregunta: '¿Cómo contacto con el soporte?',
      respuesta: 'Ve a la sección "Contacto". Rellena el formulario indicando tu nombre, correo, el tipo de problema y una descripción. Respondemos en menos de 24 horas.'
    },
    {
      pregunta: '¿Qué hago si tengo un problema técnico?',
      respuesta: 'Primero comprueba la sección "Cómo jugar" para ver si tu duda está resuelta. Si el problema persiste, escríbenos a través del formulario de Contacto seleccionando "Reportar un Bug".'
    }
  ];

  toggle(index: number): void {
    this.activeIndex = this.activeIndex === index ? -1 : index;
  }
}
