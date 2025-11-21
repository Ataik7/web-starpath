import { Component, OnInit } from '@angular/core';
import { supabase } from '../../../core/services/supabase.config';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  imports: [RouterLink, RouterLinkActive],
  styleUrls: ['./navbar.css']
})
export class Navbar implements OnInit {
  user: any = null;
  

  async ngOnInit() {
    const { data: { user } } = await supabase.auth.getUser();
    this.user = user;
  }

  async logout() {
    await supabase.auth.signOut();
    window.location.href = '/'; // o redirige a login
  }
}
