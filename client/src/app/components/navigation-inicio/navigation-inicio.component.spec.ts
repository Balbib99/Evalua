import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationInicioComponent } from './navigation-inicio.component';

describe('NavigationInicioComponent', () => {
  let component: NavigationInicioComponent;
  let fixture: ComponentFixture<NavigationInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationInicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
