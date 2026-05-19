import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { supabase } from '../../../core/services/supabase.config';

/**
 * Componente de Perfil de Usuario.
 *
 * Muestra y permite editar los datos del perfil del usuario autenticado.
 * Conecta con la tabla 'profiles' de Supabase y respeta el RLS:
 * cada usuario solo puede leer y modificar su propio perfil.
 *
 * @author Pablo Nicolás
 * @version 1.0
 */
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {
  // Datos del usuario de Supabase Auth
  user: any = null;

  // Datos del perfil de la tabla profiles
  username = '';
  avatarUrl = '';
  bio = '';
  createdAt = '';

  // Estado del formulario
  editMode = false;
  loading = true;
  saving = false;
  uploadingAvatar = false;
  errores: string[] = [];
  successMessage: string | null = null;

  // Campos editables temporales
  usernameEdit = '';
  bioEdit = '';

  constructor(private router: Router, private cd: ChangeDetectorRef) {}

  async ngOnInit() {
    // getUser() verifica con el servidor — más fiable que getSession()
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    this.user = user;
    await this.loadProfile();
  }

  /**
   * Carga el perfil del usuario desde la tabla profiles.
   * Gracias al RLS, Supabase solo devuelve el perfil del usuario autenticado.
   */
  async loadProfile() {
    this.loading = true;
    this.cd.detectChanges();

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', this.user.id)
      .single();

    if (error) {
      console.error('Error cargando perfil:', error.message);
      // Si no existe perfil aún, usamos valores por defecto
      this.username = this.user.email.split('@')[0];
      this.bio = '';
      this.avatarUrl = '';
      this.createdAt = this.user.created_at;
    } else {
      this.username = data.username || this.user.email.split('@')[0];
      this.bio = data.bio || '';
      this.avatarUrl = data.avatar_url ? `${data.avatar_url}?t=${Date.now()}` : '';
      this.createdAt = data.created_at || this.user.created_at;
    }

    this.loading = false;
    this.cd.detectChanges();
  }

  /** Activa el modo edición copiando los valores actuales */
  startEdit() {
    this.usernameEdit = this.username;
    this.bioEdit = this.bio;
    this.editMode = true;
    this.errores = [];
    this.successMessage = null;
  }

  /** Cancela la edición sin guardar */
  cancelEdit() {
    this.editMode = false;
    this.errores = [];
  }

  /**
   * Guarda los cambios del perfil en Supabase.
   * Usa upsert para crear o actualizar el registro.
   */
  async saveProfile() {
    this.errores = [];

    if (!this.usernameEdit.trim()) {
      this.errores.push('El nombre de usuario no puede estar vacío.');
      return;
    }

    if (this.usernameEdit.trim().length < 3) {
      this.errores.push('El nombre de usuario debe tener al menos 3 caracteres.');
      return;
    }

    try {
      this.saving = true;
      this.cd.detectChanges();

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: this.user.id,
          email: this.user.email,
          username: this.usernameEdit.trim(),
          bio: this.bioEdit.trim(),
          updated_at: new Date().toISOString()
        });

      if (error) {
        this.errores.push('Error al guardar: ' + error.message);
      } else {
        this.username = this.usernameEdit.trim();
        this.bio = this.bioEdit.trim();
        this.editMode = false;
        this.successMessage = 'Perfil actualizado correctamente.';
        setTimeout(() => {
          this.successMessage = null;
          this.cd.detectChanges();
        }, 3000);
      }

    } catch (err) {
      this.errores.push('Ocurrió un error inesperado.');
      console.error(err);
    } finally {
      this.saving = false;
      this.cd.detectChanges();
    }
  }

  /**
   * Gestiona la selección de una nueva foto de perfil.
   * Sube el archivo a Supabase Storage (bucket 'avatars') y
   * actualiza la columna avatar_url en la tabla profiles.
   */
  async onAvatarSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    // Validación: solo imágenes y máximo 2MB
    if (!file.type.startsWith('image/')) {
      this.errores = ['El archivo debe ser una imagen.'];
      this.cd.detectChanges();
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      this.errores = ['La imagen no puede superar los 2MB.'];
      this.cd.detectChanges();
      return;
    }

    try {
      this.uploadingAvatar = true;
      this.errores = [];
      this.cd.detectChanges();

      // Nombre único para evitar colisiones en el bucket
      const ext = file.name.split('.').pop();
      const filePath = `${this.user.id}/avatar.${ext}`;

      // Subimos al bucket 'avatars' de Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        this.errores = ['Error al subir la imagen: ' + uploadError.message];
        return;
      }

      // Obtenemos la URL pública de la imagen
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const publicUrl = data.publicUrl;

      // Guardamos la URL en la tabla profiles
      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({
          id: this.user.id,
          email: this.user.email,
          avatar_url: publicUrl,
          updated_at: new Date().toISOString()
        });

      if (updateError) {
        this.errores = ['Error al guardar la foto: ' + updateError.message];
      } else {
        // Añadimos un timestamp para forzar recarga de la imagen en el navegador
        const freshUrl = publicUrl + '?t=' + Date.now();
        this.avatarUrl = freshUrl;
        this.cd.detectChanges();
        // Notificamos al navbar para que actualice la foto también
        window.dispatchEvent(new CustomEvent('avatar-updated', { detail: { url: freshUrl } }));
        this.successMessage = 'Foto de perfil actualizada.';
        setTimeout(() => {
          this.successMessage = null;
          this.cd.detectChanges();
        }, 3000);
      }

    } catch (err) {
      this.errores = ['Ocurrió un error inesperado al subir la imagen.'];
      console.error(err);
    } finally {
      this.uploadingAvatar = false;
      this.cd.detectChanges();
      // Limpiamos el input para permitir subir la misma imagen de nuevo
      input.value = '';
    }
  }

  /** Cierra la sesión y redirige al login */
  async logout() {
    await supabase.auth.signOut();
    window.location.href = '/login';
  }

  /** Devuelve la inicial del usuario para el avatar */
  getInitial(): string {
    return (this.username || this.user?.email || 'U').charAt(0).toUpperCase();
  }

  /** Formatea la fecha de creación */
  formatDate(dateStr: string): string {
    if (!dateStr) return '—';
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}
