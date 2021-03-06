/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewfilmComponent } from './newfilm.component';

describe('NewfilmComponent', () => {
  let component: NewfilmComponent;
  let fixture: ComponentFixture<NewfilmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewfilmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewfilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
