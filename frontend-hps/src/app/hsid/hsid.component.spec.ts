import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HSIDComponent } from './hsid.component';

describe('HSIDComponent', () => {
  let component: HSIDComponent;
  let fixture: ComponentFixture<HSIDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HSIDComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HSIDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
