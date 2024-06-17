import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarDiscoComponent } from './listar-disco.component';

describe('ListarDiscoComponent', () => {
  let component: ListarDiscoComponent;
  let fixture: ComponentFixture<ListarDiscoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarDiscoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarDiscoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
