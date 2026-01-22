import {Component} from '@angular/core';
import {Login} from './login'; 
import { TablePageComponent } from './loginTable'; 
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
