import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaTareas } from './components/lista-tareas/lista-tareas';
import { Resumen } from './components/resumen/resumen';

@Component({
  imports: [RouterOutlet, ListaTareas, Resumen],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Práctica 4 CI/CD');
}
