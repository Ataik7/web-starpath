import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HowToPlay } from './how-to-play';
import { provideRouter } from '@angular/router';

describe('HowToPlay', () => {
  let component: HowToPlay;
  let fixture: ComponentFixture<HowToPlay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HowToPlay],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HowToPlay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
