import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. IMPORTAR ChangeDetectorRef
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

  // 2. Inyectar el detector de cambios (cd)
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    // Comprobación inicial
    this.getUser();

    // Se escuchan los cambios del LOGIN/LOGOUT
    supabase.auth.onAuthStateChange((event, session) => {
      console.log('Navbar detectó evento:', event); // Para que veas que funciona
      
      if (session) {
        this.user = session.user;
      } else {
        this.user = null;
      }

      // 3. Obligamos a Angular a actualizar el menú justo en ese momento
      this.cd.detectChanges();
    });
  }

  async getUser() {
    const { data: { user } } = await supabase.auth.getUser();
    this.user = user;
    this.cd.detectChanges(); // Actualizamos también aquí por si acaso
  }

  async logout() {
    await supabase.auth.signOut();
    // El onAuthStateChange detectará el 'SIGNED_OUT' y actualizará la vista solo
    
    // Redirigimos al login para que quede claro que ha salido
    window.location.href = '/login'; 
  }
}