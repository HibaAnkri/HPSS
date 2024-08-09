import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MSIDComponent } from './msid.component';

describe('MSIDComponent', () => {
  let component: MSIDComponent;
  let fixture: ComponentFixture<MSIDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MSIDComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MSIDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
