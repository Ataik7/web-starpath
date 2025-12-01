import { Component, ChangeDetectorRef, OnInit } from '@angular/core'; // 1. Importamos ChangeDetectorRef y OnInit
import { Router } from '@angular/router'; // 2. Importamos Router para redirección
import { FormsModule } from '@angular/forms'; // 3. Importamos FormsModule para ngModel
import { supabase } from '../../../core/services/supabase.config';

/**
 * Componente de la Página de ResetPassword.
 *
 * Permite a los usuarios restablecer su contraseña mediante un enlace
 * de recuperación enviado por correo electrónico. 
 *
 * Gestiona:
 * - Validación del enlace recibido (fragmento o query params).
 * - Establecimiento de sesión con Supabase usando los tokens.
 * - Formulario para introducir nueva contraseña.
 * - Feedback claro de errores y éxito.
 *
 * @author Pablo Nicolás
 * @version 1.0
 */
@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.css']
})
export class ResetPassword implements OnInit {
  newPassword = ''; 
  errores: string[] = [];
  successMessage: string | null = null;
  loading = false;
  buttonText = 'Actualizar';
  hasValidSession = false;

  // 4. Inyectamos ChangeDetectorRef y Router
  constructor(
    private cd: ChangeDetectorRef,
    private router: Router
  ) {}

  /**
   * Método ngOnInit.
   *
   * 1. Escucha fragmentos de URL (hash) y parámetros de consulta.
   * 2. Extrae tokens de recuperación (access_token, refresh_token).
   * 3. Valida que el tipo sea "recovery".
   * 4. Llama a handleRecoveryToken para establecer sesión.
   */
  async ngOnInit() {
    const fragment = window.location.hash.substring(1);
    if (fragment) {
      const params = new URLSearchParams(fragment);
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');
      const type = params.get('type');

      if (type === 'recovery' && accessToken) {
        await this.handleRecoveryToken(accessToken, refreshToken);
      } else {
        this.errores.push('El enlace de recuperación no es válido o ha expirado.');
        this.cd.detectChanges();
      }
    } else {
      const queryParams = new URLSearchParams(window.location.search);
      const accessToken = queryParams.get('access_token');
      const refreshToken = queryParams.get('refresh_token');
      const type = queryParams.get('type');

      if (type === 'recovery' && accessToken) {
        await this.handleRecoveryToken(accessToken, refreshToken);
      } else {
        this.errores.push('El enlace de recuperación no es válido o ha expirado.');
        this.cd.detectChanges();
      }
    }
  }

  /**
   * Método privado handleRecoveryToken.
   *
   * 1. Verifica que el accessToken exista.
   * 2. Construye objeto de sesión con tokens.
   * 3. Llama a supabase.auth.setSession para establecer sesión.
   * 4. Gestiona errores de sesión expirada o inválida.
   */
  private async handleRecoveryToken(accessToken: string | null, refreshToken: string | null) {
    if (!accessToken) {
      this.errores.push('Token de acceso no válido.');
      this.cd.detectChanges();
      return;
    }

    try {
      const sessionData: any = { access_token: accessToken };
      if (refreshToken) sessionData.refresh_token = refreshToken;

      const { data, error } = await supabase.auth.setSession(sessionData);

      if (error) {
        console.error('Error estableciendo sesión:', error.message);
        this.errores.push('No se pudo validar el enlace de recuperación.');
        this.cd.detectChanges();
        return;
      }

      if (!data.session) {
        this.errores.push('La sesión ha expirado. Solicita un nuevo enlace de recuperación.');
        this.cd.detectChanges();
        return;
      }

      console.log('Sesión establecida para reset:', data);
      this.hasValidSession = true;
      
    } catch (err) {
      console.error('Error inesperado:', err);
      this.errores.push('Ocurrió un error inesperado al procesar el enlace.');
      this.cd.detectChanges();
    }
  }

  /**
   * Método updatePassword.
   *
   * 1. Reinicia errores y mensajes de éxito.
   * 2. Valida que la nueva contraseña exista y tenga mínimo 6 caracteres.
   * 3. Comprueba que haya sesión válida.
   * 4. Llama a supabase.auth.updateUser para actualizar la contraseña.
   * 5. Gestiona errores y muestra mensaje de éxito.
   * 6. Redirige al login tras 3 segundos.
   */
  async updatePassword() {
    this.errores = [];
    this.successMessage = null;

    if (!this.newPassword) {
      this.errores.push('Debes introducir una nueva contraseña.');
      this.cd.detectChanges();
      return;
    }

    if (this.newPassword.length < 6) {
      this.errores.push('La contraseña debe tener al menos 6 caracteres.');
      this.cd.detectChanges();
      return;
    }

    if (!this.hasValidSession) {
      this.errores.push('No hay una sesión válida para actualizar la contraseña. Por favor, solicita un nuevo enlace.');
      this.cd.detectChanges();
      return;
    }

    try {
      this.loading = true;
      this.buttonText = 'ACTUALIZANDO...';
      this.cd.detectChanges();

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        this.errores.push('La sesión ha expirado. Por favor, solicita un nuevo enlace de recuperación.');
        this.cd.detectChanges();
        return;
      }

      const { error } = await supabase.auth.updateUser({ password: this.newPassword });

      if (error) {
        this.errores.push('Error al actualizar la contraseña: ' + error.message);
      } else {
        this.successMessage = '¡Contraseña actualizada correctamente! Ya puedes iniciar sesión con tu nueva contraseña.';
        setTimeout(() => { this.router.navigate(['/login']); }, 3000);
      }

    } catch (err) {
      this.errores.push('Ocurrió un error inesperado.');
      console.error(err);
    } finally {
      this.loading = false;
      this.buttonText = 'Actualizar';
      this.cd.detectChanges();
    }
  }
}
