import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { supabase } from '../../../core/services/supabase.config';

/**
 * Componente de Recuperación de Contraseña.
 *
 * Permite a los usuarios solicitar un enlace de restablecimiento de contraseña.
 * Valida el correo electrónico y se comunica con Supabase para enviar el enlace.
 * Muestra mensajes de error o éxito según el resultado.
 *
 * Flujo:
 * 1. Validación local del campo email (vacío y formato).
 * 2. Comprobación en la base de datos de que el correo existe.
 * 3. Si existe, se solicita a Supabase el envío del enlace.
 * 4. El botón cambia a "ENVIANDO..." mientras se procesa.
 * 5. Al terminar, vuelve a "Enviar enlace".
 *
 * @author Pablo
 * @version 1.2
 */
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css']
})
export class ForgotPassword {
  // Estado del formulario
  email = '';                        // Correo introducido por el usuario
  errores: string[] = [];            // Lista de errores a mostrar
  successMessage: string | null = null; // Mensaje de éxito

  // Estado del botón
  loading = false;                   // Indica si se está procesando
  buttonText = 'Enviar enlace';      // Texto dinámico del botón

  // Inyectamos ChangeDetectorRef para forzar actualización de la vista
  constructor(private cd: ChangeDetectorRef) {}

  /**
   * Método principal de recuperación de contraseña.
   *
   * 1. Reinicia errores y mensajes previos.
   * 2. Valida que el campo email no esté vacío y tenga formato correcto.
   * 3. Comprueba si el correo existe en la base de datos.
   * 4. Si existe, solicita a Supabase el envío del enlace.
   * 5. Muestra mensajes de error o éxito según el resultado.
   * 6. Gestiona el texto dinámico del botón ("ENVIANDO..." → "Enviar enlace").
   */
  async sendResetLink() {
    // Reiniciamos estado
    this.errores = [];
    this.successMessage = null;

    // Validación: campo vacío
    if (!this.email) {
      this.errores.push('Debes introducir tu correo electrónico.');
      return;
    }

    // Validación: formato de email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.email)) {
      this.errores.push('El formato del correo no es válido.');
      return;
    }

    try {
      // Activamos estado de carga
      this.loading = true;
      this.buttonText = 'ENVIANDO...';
      this.cd.detectChanges();

      // Comprobamos si el correo existe en la tabla de usuarios (ejemplo: profiles)
      const { data, error: userError } = await supabase
        .from('profiles') // ⚠️ Cambia por tu tabla real
        .select('email')
        .eq('email', this.email)
        .single();

      if (userError || !data) {
        this.errores.push('El correo electrónico no está registrado.');
        this.loading = false;
        this.buttonText = 'Enviar enlace';
        this.cd.detectChanges();
        return;
      }

      // Si existe, solicitamos a Supabase el envío del enlace
      const { error } = await supabase.auth.resetPasswordForEmail(this.email, {
        redirectTo: 'http://localhost:4200/reset-password'
      });

      if (error) {
        this.errores.push('Error al enviar el enlace: ' + error.message);
      } else {
        this.successMessage = 'Hemos enviado un enlace para restablecer tu contraseña.';
      }

    } catch (err) {
      this.errores.push('Ocurrió un error inesperado.');
      console.error(err);
    } finally {
      // Al terminar, desbloqueamos el botón y restauramos texto
      this.loading = false;
      this.buttonText = 'Enviar enlace';
      this.cd.detectChanges();
    }
  }
}
