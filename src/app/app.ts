import {Component} from '@angular/core';
import {LoginComponent} from './features/login/login.component'; 
import { TablePageComponent } from './features/login/loginTable'; 
import { bootstrapApplication } from '@angular/platform-browser'; 
import { provideRouter, Routes,RouterOutlet } from '@angular/router'; 

@Component({ 
  selector: 'app-root',
  styles: '', 
  standalone:true,
  template: `<router-outlet />`,
  imports:[RouterOutlet], 
}) 
export class App {} 
