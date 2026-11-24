import { TestBed } from '@angular/core/testing';
import { Tareas } from './tareas';

describe('Tareas (servicio)', () => {
  let servicio: Tareas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    servicio = TestBed.inject(Tareas);
  });

  it('empieza con la lista vacía', () => {
    expect(servicio.total()).toBe(0);
    expect(servicio.pendientes()).toBe(0);
  });

  it('añade una tarea sin espacios sobrantes', () => {
    servicio.anadir('  Estudiar Angular  ');
    expect(servicio.lista()).toEqual([{ id: 1, texto: 'Estudiar Angular', hecha: false }]);
  });

  it('no añade tareas con el texto vacío', () => {
    servicio.anadir('   ');
    expect(servicio.total()).toBe(0);
  });

  it('marca una tarea como hecha y la desmarca', () => {
    servicio.anadir('Hacer la práctica');
    servicio.alternar(1);
    expect(servicio.lista()[0].hecha).toBe(true);
    expect(servicio.pendientes()).toBe(0);
    servicio.alternar(1);
    expect(servicio.lista()[0].hecha).toBe(false);
  });

  it('alternar una tarea no cambia las demás', () => {
    servicio.anadir('Primera');
    servicio.anadir('Segunda');
    servicio.alternar(2);
    expect(servicio.lista()[0].hecha).toBe(false);
    expect(servicio.lista()[1].hecha).toBe(true);
  });

  it('elimina una tarea', () => {
    servicio.anadir('Primera');
    servicio.anadir('Segunda');
    servicio.eliminar(1);
    expect(servicio.lista().map((t) => t.texto)).toEqual(['Segunda']);
  });

  it('cuenta las tareas pendientes y el total', () => {
    servicio.anadir('Primera');
    servicio.anadir('Segunda');
    servicio.alternar(1);
    expect(servicio.total()).toBe(2);
    expect(servicio.pendientes()).toBe(1);
  });
});
