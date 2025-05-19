import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontPageLayoutComponent } from './front-page-layout.component';

describe('FrontPageLayoutComponent', () => {
  let component: FrontPageLayoutComponent;
  let fixture: ComponentFixture<FrontPageLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontPageLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
