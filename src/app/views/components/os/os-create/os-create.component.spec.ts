import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OsCreateComponent } from './os-create.component';

describe('OsCreateComponent', () => {
  let component: OsCreateComponent;
  let fixture: ComponentFixture<OsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
