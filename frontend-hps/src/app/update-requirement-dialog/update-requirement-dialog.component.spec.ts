import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRequirementDialogComponent } from './update-requirement-dialog.component';

describe('UpdateRequirementDialogComponent', () => {
  let component: UpdateRequirementDialogComponent;
  let fixture: ComponentFixture<UpdateRequirementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateRequirementDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateRequirementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
