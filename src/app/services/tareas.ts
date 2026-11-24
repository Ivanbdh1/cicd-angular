import { Service, signal } from '@angular/core';

// Forma de cada tarea de la lista
export interface Tarea {
  id: number;
  texto: string;
  hecha: boolean;
}

@Service()
export class Tareas {
  // Lista de tareas (signal: cuando cambia, la pantalla se actualiza sola)
  readonly lista = signal<Tarea[]>([]);

  // Id que tendrá la siguiente tarea
  private siguienteId = 1;

  // Añade una tarea nueva. Si el texto está vacío no hace nada
  anadir(texto: string): void {
    const limpio = texto.trim();
    if (limpio === '') {
      return;
    }
    this.lista.update((tareas) => [...tareas, { id: this.siguienteId++, texto: limpio, hecha: false }]);
  }

  // Marca una tarea como hecha o como pendiente
  alternar(id: number): void {
    this.lista.update((tareas) =>
      tareas.map((tarea) => (tarea.id === id ? { ...tarea, hecha: !tarea.hecha } : tarea)),
    );
  }

  // Borra una tarea de la lista
  eliminar(id: number): void {
    this.lista.update((tareas) => tareas.filter((tarea) => tarea.id !== id));
  }

  // Número de tareas que todavía no están hechas
  pendientes(): number {
    return this.lista().filter((tarea) => !tarea.hecha).length;
  }

  // Número total de tareas
  total(): number {
    return this.lista().length;
  }

  // Método nuevo SIN test (se añade a propósito para que baje la cobertura)
  nivelDeTrabajo(): string {
    const pendientes = this.pendientes();
    const total = this.total();
    let mensaje = '';
    if (total === 0) {
      mensaje = 'Sin tareas';
    } else if (pendientes === 0) {
      mensaje = 'Todo terminado';
    } else if (pendientes === 1) {
      mensaje = 'Casi terminado';
    } else if (pendientes <= 3) {
      mensaje = 'Poco trabajo';
    } else if (pendientes <= 6) {
      mensaje = 'Trabajo medio';
    } else {
      mensaje = 'Mucho trabajo';
    }
    const porcentaje = total === 0 ? 0 : Math.round(((total - pendientes) / total) * 100);
    mensaje = mensaje + ' (' + porcentaje + '% hecho)';
    return mensaje;
  }
}
