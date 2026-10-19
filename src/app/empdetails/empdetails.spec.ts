import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Empdetails } from './empdetails';

describe('Empdetais', () => {
  let component: Empdetails;
  let fixture: ComponentFixture<Empdetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Empdetails],
    }).compileComponents();

    fixture = TestBed.createComponent(Empdetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
