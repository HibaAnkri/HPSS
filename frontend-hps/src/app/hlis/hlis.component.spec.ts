import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HLISComponent } from './hlis.component';

describe('HLISComponent', () => {
  let component: HLISComponent;
  let fixture: ComponentFixture<HLISComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HLISComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HLISComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
