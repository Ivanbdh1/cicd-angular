import { Component, inject } from '@angular/core';
import { Tareas } from '../../services/tareas';

@Component({
  imports: [],
  selector: 'app-resumen',
  styleUrl: './resumen.css',
  templateUrl: './resumen.html',
})
export class Resumen {
  // Usamos el mismo servicio que la lista, así los dos componentes comparten las tareas
  protected readonly tareas = inject(Tareas);
}
