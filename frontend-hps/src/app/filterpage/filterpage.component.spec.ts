import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterpageComponent } from './filterpage.component';

describe('FilterpageComponent', () => {
  let component: FilterpageComponent;
  let fixture: ComponentFixture<FilterpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
