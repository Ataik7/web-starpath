import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { supabase } from '../../../core/services/supabase.config';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  username: string | null = null;
  email: string | null = null;

  async ngOnInit() {
    // Obtener usuario actual desde Supabase
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error('Error al obtener usuario:', userError.message);
      return;
    }

    if (user) {
      // Buscar perfil en la tabla "profiles"
      const { data, error } = await supabase
        .from('profiles')
        .select('username, email')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error al cargar perfil:', error.message);
      } else if (data) {
        this.username = data.username;
        this.email = data.email;
      }
    }
  }

  async logout() {
    await supabase.auth.signOut();
    window.location.href = '/login'; // redirige al login
  }
}
