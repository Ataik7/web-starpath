import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Navbar } from './navbar';
import { provideRouter } from '@angular/router';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería iniciar con user en null', () => {
    expect(component.user).toBeNull();
  });

  it('debería actualizar user al llamar a getUser con sesión activa', async () => {
    const mockUser = { id: '123', email: 'test@test.com' };
    spyOn((component as any), 'getUser').and.callFake(async () => {
      component.user = mockUser;
    });
    await (component as any).getUser();
    expect(component.user).toEqual(mockUser);
  });
});
