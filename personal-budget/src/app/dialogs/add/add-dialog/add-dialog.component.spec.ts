import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

import { AddDialogComponent } from './add-dialog.component';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormsModule } from '@angular/forms';

describe('AddDialogComponent', () => {
  let component: AddDialogComponent;
  let fixture: ComponentFixture<AddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDialogComponent ],
      imports: [

        FormsModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: HttpClient, useValue: {}},
        { provide: FormsModule, useValue: {}}
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // Unit Test 1
  it('Check confirmAdd is called on button Save', fakeAsync(()=>{
    fixture = TestBed.createComponent(AddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component, 'confirmAdd');

    let btn = fixture.debugElement.query(By.css('button'));
    btn.triggerEventHandler('click', null);

    tick();
    fixture.detectChanges();
    expect(component.confirmAdd).toHaveBeenCalled();
  }));
});
