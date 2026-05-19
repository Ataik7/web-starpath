import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { supabase } from '../../../core/services/supabase.config';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar implements OnInit {
  user: any = null;
  avatarUrl: string | null = null;
  menuOpen = false;

  constructor(private cd: ChangeDetectorRef) {}

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  ngOnInit() {
    // Comprobación inicial
    this.getUser();

    // Escucha cambios de sesión (login/logout)
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        this.user = session.user;
        this.loadAvatar(session.user.id);
      } else {
        this.user = null;
        this.avatarUrl = null;
      }
      this.cd.detectChanges();
    });

    // Escucha el evento personalizado que lanza el perfil al subir una foto
    window.addEventListener('avatar-updated', (e: any) => {
      this.avatarUrl = e.detail.url;
      this.cd.detectChanges();
    });
  }

  async getUser() {
    const { data: { user } } = await supabase.auth.getUser();
    this.user = user;
    if (user) this.loadAvatar(user.id);
    this.cd.detectChanges();
  }

  loadAvatar(userId: string) {
    supabase
      .from('profiles')
      .select('avatar_url')
      .eq('id', userId)
      .single()
      .then(({ data }) => {
        const url = data?.avatar_url || null;
        // Añadimos timestamp para evitar que el navegador sirva la imagen en caché
        this.avatarUrl = url ? `${url}?t=${Date.now()}` : null;
        this.cd.detectChanges();
      });
  }

  async logout() {
    await supabase.auth.signOut();
    window.location.href = '/login';
  }

  goToProfile() {
    window.location.href = '/profile';
  }
}
