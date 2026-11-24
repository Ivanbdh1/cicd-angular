import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('cicd-angular');
  // ERROR a propósito: variableNoDeclarada no existe
  protected readonly saludo = signal(variableNoDeclarada);
}
