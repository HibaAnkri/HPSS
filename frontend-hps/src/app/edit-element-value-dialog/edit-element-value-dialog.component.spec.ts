import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditElementValueDialogComponent } from './edit-element-value-dialog.component';

describe('EditElementValueDialogComponent', () => {
  let component: EditElementValueDialogComponent;
  let fixture: ComponentFixture<EditElementValueDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditElementValueDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditElementValueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
