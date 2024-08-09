import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddElementValueDialogComponent } from './add-element-value-dialog.component';

describe('AddElementValueDialogComponent', () => {
  let component: AddElementValueDialogComponent;
  let fixture: ComponentFixture<AddElementValueDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddElementValueDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddElementValueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
