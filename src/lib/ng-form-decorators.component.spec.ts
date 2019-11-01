import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgFormDecoratorsComponent } from './ng-form-decorators.component';

describe('NgFormDecoratorsComponent', () => {
  let component: NgFormDecoratorsComponent;
  let fixture: ComponentFixture<NgFormDecoratorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgFormDecoratorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgFormDecoratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
