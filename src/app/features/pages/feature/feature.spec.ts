import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Feature } from './feature';
import { provideRouter } from '@angular/router';

describe('Feature', () => {
  let component: Feature;
  let fixture: ComponentFixture<Feature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Feature],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Feature);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
