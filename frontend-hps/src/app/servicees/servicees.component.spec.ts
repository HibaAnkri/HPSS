import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceesComponent } from './servicees.component';

describe('ServiceesComponent', () => {
  let component: ServiceesComponent;
  let fixture: ComponentFixture<ServiceesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
