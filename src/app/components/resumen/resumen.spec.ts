import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Resumen } from './resumen';
import { Tareas } from '../../services/tareas';

describe('Resumen', () => {
  let fixture: ComponentFixture<Resumen>;
  let html: HTMLElement;
  let servicio: Tareas;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Resumen],
    }).compileComponents();

    fixture = TestBed.createComponent(Resumen);
    html = fixture.nativeElement as HTMLElement;
    servicio = TestBed.inject(Tareas);
    await fixture.whenStable();
  });

  it('muestra 0 de 0 cuando no hay tareas', () => {
    expect(html.querySelector('.pendientes')?.textContent).toContain('Pendientes: 0 de 0');
  });

  it('muestra cuántas tareas quedan pendientes', async () => {
    servicio.anadir('Primera');
    servicio.anadir('Segunda');
    servicio.alternar(1);
    await fixture.whenStable();

    expect(html.querySelector('.pendientes')?.textContent).toContain('Pendientes: 1 de 2');
  });

  it('muestra el mensaje final cuando todas las tareas están hechas', async () => {
    servicio.anadir('Única');
    servicio.alternar(1);
    await fixture.whenStable();

    expect(html.querySelector('.completo')?.textContent).toContain('¡Todo hecho!');
    expect(html.querySelector('.pendientes')).toBeNull();
  });
});
