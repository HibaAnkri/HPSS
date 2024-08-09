import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesspanelComponent } from './accesspanel.component';

describe('AccesspanelComponent', () => {
  let component: AccesspanelComponent;
  let fixture: ComponentFixture<AccesspanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccesspanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccesspanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
