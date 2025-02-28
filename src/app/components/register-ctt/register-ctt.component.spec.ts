import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCttComponent } from './register-ctt.component';

describe('RegisterCttComponent', () => {
  let component: RegisterCttComponent;
  let fixture: ComponentFixture<RegisterCttComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterCttComponent]
    });
    fixture = TestBed.createComponent(RegisterCttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
