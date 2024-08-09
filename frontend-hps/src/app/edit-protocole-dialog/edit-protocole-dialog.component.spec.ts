import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProtocoleDialogComponent } from './edit-protocole-dialog.component';

describe('EditProtocoleDialogComponent', () => {
  let component: EditProtocoleDialogComponent;
  let fixture: ComponentFixture<EditProtocoleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditProtocoleDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditProtocoleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
