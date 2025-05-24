import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardContextMenuComponent } from './board-context-menu.component';

describe('BoardContextMenuComponent', () => {
  let component: BoardContextMenuComponent;
  let fixture: ComponentFixture<BoardContextMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardContextMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
