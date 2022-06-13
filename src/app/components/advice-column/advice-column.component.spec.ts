import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviceColumnComponent } from './advice-column.component';

describe('AdviceColumnComponent', () => {
  let component: AdviceColumnComponent;
  let fixture: ComponentFixture<AdviceColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdviceColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdviceColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
