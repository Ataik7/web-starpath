import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPassword } from './reset-password';
import { provideRouter } from '@angular/router';
import { supabase } from '../../../core/services/supabase.config';
import { FormsModule } from '@angular/forms';

describe('ResetPassword', () => {
  let component: ResetPassword;
  let fixture: ComponentFixture<ResetPassword>;

  beforeEach(async () => {
    spyOn(supabase.auth, 'getSession').and.returnValue(
      Promise.resolve({ data: { session: {} as any }, error: null })
    );
    spyOn(supabase.auth, 'updateUser').and.returnValue(
      Promise.resolve({ data: { user: {} as any }, error: null })
    );

    await TestBed.configureTestingModule({
      imports: [ResetPassword, FormsModule],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPassword);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  // PRUEBA 1: Creación
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // PRUEBA 2: Validación de contraseña vacía
  it('debería mostrar error si la contraseña está vacía', async () => {
    component.newPassword = '';
    component.hasValidSession = true;

    await component.updatePassword();

    expect(component.errores).toContain('Debes introducir una nueva contraseña.');
  });

  // PRUEBA 3: Validación de contraseña corta
  it('debería mostrar error si la contraseña es muy corta', async () => {
    component.newPassword = '123';
    component.hasValidSession = true;

    await component.updatePassword();

    expect(component.errores).toContain('La contraseña debe tener al menos 6 caracteres.');
  });
});
