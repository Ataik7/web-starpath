import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { supabase } from '../../../core/services/supabase.config';

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

  constructor(
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    // Manejar tanto el token hash como parámetros de consulta
    this.route.fragment.subscribe(async (fragment) => {
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
        // También verificar parámetros de consulta normales
        this.route.queryParams.subscribe(async (params) => {
          const { access_token, refresh_token, type } = params;
          
          if (type === 'recovery' && access_token) {
            await this.handleRecoveryToken(access_token, refresh_token);
          } else {
            this.errores.push('El enlace de recuperación no es válido o ha expirado.');
            this.cd.detectChanges();
          }
        });
      }
    });
  }

  private async handleRecoveryToken(accessToken: string | null, refreshToken: string | null) {
    if (!accessToken) {
      this.errores.push('Token de acceso no válido.');
      this.cd.detectChanges();
      return;
    }

    try {
      // Establecer la sesión con los tokens
      const sessionData: any = {
        access_token: accessToken
      };
      
      // Solo agregar refresh_token si existe
      if (refreshToken) {
        sessionData.refresh_token = refreshToken;
      }

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

    // Verificar si tenemos una sesión válida
    if (!this.hasValidSession) {
      this.errores.push('No hay una sesión válida para actualizar la contraseña. Por favor, solicita un nuevo enlace.');
      this.cd.detectChanges();
      return;
    }

    try {
      this.loading = true;
      this.buttonText = 'ACTUALIZANDO...';
      this.cd.detectChanges();

      // Verificar si hay una sesión activa
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        this.errores.push('La sesión ha expirado. Por favor, solicita un nuevo enlace de recuperación.');
        this.cd.detectChanges();
        return;
      }

      // Actualizar la contraseña
      const { error } = await supabase.auth.updateUser({
        password: this.newPassword
      });

      if (error) {
        this.errores.push('Error al actualizar la contraseña: ' + error.message);
      } else {
        this.successMessage = '¡Contraseña actualizada correctamente! Ya puedes iniciar sesión con tu nueva contraseña.';
        // Opcional: redirigir al login después de 3 segundos
        setTimeout(() => {
          window.location.href = '/login';
        }, 3000);
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