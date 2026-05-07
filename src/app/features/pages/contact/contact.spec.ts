import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Contact } from './contact';
import { FormsModule } from '@angular/forms';

describe('Contact', () => {
  let component: Contact;
  let fixture: ComponentFixture<Contact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Contact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar alerta de error si el formulario es inválido', () => {
    spyOn(window, 'alert');
    const formMock = { valid: false, reset: jasmine.createSpy('reset') };
    component.sendMessage(formMock);
    expect(window.alert).toHaveBeenCalledWith('Por favor, rellena todos los campos correctamente.');
  });

  it('debería mostrar alerta de éxito y limpiar el formulario si es válido', () => {
    spyOn(window, 'alert');
    const formMock = { valid: true, reset: jasmine.createSpy('reset') };
    component.sendMessage(formMock);
    expect(window.alert).toHaveBeenCalledWith('¡Mensaje enviado correctamente! Gracias por contactar con Starpath.');
    expect(formMock.reset).toHaveBeenCalled();
  });
});
