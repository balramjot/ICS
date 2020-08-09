import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInventoryComponent } from './new-inventory.component';

describe('NewInventoryComponent', () => {
  let component: NewInventoryComponent;
  let fixture: ComponentFixture<NewInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
