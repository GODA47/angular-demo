import {Component, signal} from '@angular/core';
import {LoginComponent} from './features/login/login.component'; 
import { TablePageComponent } from './features/login/loginTable'; 
import { bootstrapApplication } from '@angular/platform-browser'; 
import { provideRouter, Routes,RouterOutlet } from '@angular/router'; 

@Component({ 
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <router-outlet />
  `,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('brrfc-frontend');
}
