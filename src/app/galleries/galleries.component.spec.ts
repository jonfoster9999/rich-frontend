import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleriesComponent } from './galleries.component';

describe('GalleriesComponent', () => {
  let component: GalleriesComponent;
  let fixture: ComponentFixture<GalleriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
