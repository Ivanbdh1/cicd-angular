import { Component, inject } from '@angular/core';
import { Tareas } from '../../services/tareas';

@Component({
  imports: [],
  selector: 'app-lista-tareas',
  styleUrl: './lista-tareas.css',
  templateUrl: './lista-tareas.html',
})
export class ListaTareas {
  // El servicio guarda las tareas; el componente solo las muestra
  protected readonly tareas = inject(Tareas);

  // Se ejecuta al pulsar "Añadir": pasa el texto al servicio y vacía la caja
  anadir(caja: HTMLInputElement): void {
    this.tareas.anadir(caja.value);
    caja.value = '';
  }
}
