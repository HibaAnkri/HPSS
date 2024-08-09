import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementValuesComponent } from './element-values.component';

describe('ElementValuesComponent', () => {
  let component: ElementValuesComponent;
  let fixture: ComponentFixture<ElementValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ElementValuesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElementValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
