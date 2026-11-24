import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaTareas } from './lista-tareas';
import { Tareas } from '../../services/tareas';

describe('ListaTareas', () => {
  let fixture: ComponentFixture<ListaTareas>;
  let html: HTMLElement;
  let servicio: Tareas;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaTareas],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaTareas);
    html = fixture.nativeElement as HTMLElement;
    servicio = TestBed.inject(Tareas);
    await fixture.whenStable();
  });

  it('muestra el mensaje de lista vacía al empezar', () => {
    expect(html.querySelector('.vacia')?.textContent).toContain('No hay tareas todavía');
  });

  it('pinta las tareas que hay en el servicio', async () => {
    servicio.anadir('Primera');
    servicio.anadir('Segunda');
    await fixture.whenStable();

    const filas = html.querySelectorAll('li:not(.vacia)');
    expect(filas.length).toBe(2);
    expect(filas[0].textContent).toContain('Primera');
  });

  it('añade una tarea al escribir en la caja y pulsar el botón', async () => {
    const caja = html.querySelector('input') as HTMLInputElement;
    caja.value = 'Tarea nueva';
    (html.querySelector('.anadir') as HTMLButtonElement).click();
    await fixture.whenStable();

    expect(servicio.total()).toBe(1);
    expect(html.querySelector('.texto')?.textContent).toContain('Tarea nueva');
    expect(caja.value).toBe('');
  });

  it('añade una tarea al pulsar Enter en la caja', async () => {
    const caja = html.querySelector('input') as HTMLInputElement;
    caja.value = 'Con Enter';
    caja.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
    await fixture.whenStable();

    expect(servicio.total()).toBe(1);
  });

  it('marca la tarea como hecha al hacer clic en su texto', async () => {
    servicio.anadir('Para marcar');
    await fixture.whenStable();

    (html.querySelector('.texto') as HTMLElement).click();
    await fixture.whenStable();

    expect(html.querySelector('li')?.classList).toContain('hecha');
  });

  it('borra la tarea al pulsar el botón Borrar', async () => {
    servicio.anadir('Para borrar');
    await fixture.whenStable();

    (html.querySelector('.borrar') as HTMLButtonElement).click();
    await fixture.whenStable();

    expect(servicio.total()).toBe(0);
    expect(html.querySelector('.vacia')).not.toBeNull();
  });
});
