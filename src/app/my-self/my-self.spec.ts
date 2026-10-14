import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MySelf } from './my-self';

describe('MySelf', () => {
  let component: MySelf;
  let fixture: ComponentFixture<MySelf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MySelf],
    }).compileComponents();

    fixture = TestBed.createComponent(MySelf);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
