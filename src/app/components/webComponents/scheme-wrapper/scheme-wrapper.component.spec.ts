import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeWrapperComponent } from './scheme-wrapper.component';

describe('SchemeWrapperComponent', () => {
  let component: SchemeWrapperComponent;
  let fixture: ComponentFixture<SchemeWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemeWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
