import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotPassword } from './forgot-password';
import { provideRouter } from '@angular/router';
import { supabase } from '../../../core/services/supabase.config';
import { FormsModule } from '@angular/forms';

describe('ForgotPassword', () => {
  let component: ForgotPassword;
  let fixture: ComponentFixture<ForgotPassword>;

  beforeEach(async () => {
    spyOn(supabase, 'from').and.returnValue({
      select: () => ({
        eq: () => ({
          single: () => Promise.resolve({ data: { email: 'test@test.com' }, error: null })
        })
      })
    } as any); // 👈 usamos `as any` para evitar el error de tipo

    spyOn(supabase.auth, 'resetPasswordForEmail').and.returnValue(
      Promise.resolve({ data: {}, error: null })
    );

    await TestBed.configureTestingModule({
      imports: [ForgotPassword, FormsModule],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPassword);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  // PRUEBA 1: Creación
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // PRUEBA 2: Validación de email vacío
  it('debería mostrar error si el email está vacío', async () => {
    component.email = '';
    await component.sendResetLink();
    expect(component.errores).toContain('Debes introducir tu correo electrónico.');
  });

  // PRUEBA 3: Validación de formato de email incorrecto
  it('debería mostrar error si el formato del email es inválido', async () => {
    component.email = 'correo-invalido';
    await component.sendResetLink();
    expect(component.errores).toContain('El formato del correo no es válido.');
  });
});
