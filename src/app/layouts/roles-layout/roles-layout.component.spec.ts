import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesLayoutComponent } from './roles-layout.component';

describe('RolesLayoutComponent', () => {
  let component: RolesLayoutComponent;
  let fixture: ComponentFixture<RolesLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolesLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
