import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevisionalComponent } from './previsional.component';

describe('PrevisionalComponent', () => {
  let component: PrevisionalComponent;
  let fixture: ComponentFixture<PrevisionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrevisionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevisionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
