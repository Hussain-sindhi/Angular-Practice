import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Empdetais } from './empdetais';

describe('Empdetais', () => {
  let component: Empdetais;
  let fixture: ComponentFixture<Empdetais>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Empdetais],
    }).compileComponents();

    fixture = TestBed.createComponent(Empdetais);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
