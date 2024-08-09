import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProtocoleDialogComponent } from './add-protocole-dialog.component';

describe('AddProtocoleDialogComponent', () => {
  let component: AddProtocoleDialogComponent;
  let fixture: ComponentFixture<AddProtocoleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProtocoleDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddProtocoleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
