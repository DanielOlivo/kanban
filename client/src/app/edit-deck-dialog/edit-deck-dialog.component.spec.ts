import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeckDialogComponent } from './edit-deck-dialog.component';

describe('EditDeckDialogComponent', () => {
  let component: EditDeckDialogComponent;
  let fixture: ComponentFixture<EditDeckDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDeckDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDeckDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
