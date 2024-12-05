import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecettesPageComponent } from './recettes-page.component';

describe('RecettesPageComponent', () => {
  let component: RecettesPageComponent;
  let fixture: ComponentFixture<RecettesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecettesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecettesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
