import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UndersectionComponent } from './undersection.component';

describe('UndersectionComponent', () => {
  let component: UndersectionComponent;
  let fixture: ComponentFixture<UndersectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UndersectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UndersectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
