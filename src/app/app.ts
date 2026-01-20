import {Component} from '@angular/core';
import {Login} from './login'; 
import { TablePageComponent } from './loginTable'; 
import { bootstrapApplication } from '@angular/platform-browser'; 
import { provideRouter, Routes,RouterOutlet } from '@angular/router'; 

@Component({ 
  selector: 'app-root',
  styles: '', 
  template: `<router-outlet />`,
   imports:[RouterOutlet], 
}) 
export class App {} 
const routes: Routes = [ 
  {path: '', redirectTo: 'login', pathMatch: 'full'}, 
  {path: 'login',component:Login}, 
  {path: 'table',component:TablePageComponent} 
]; 

bootstrapApplication(App, { 
  providers: [provideRouter(routes)] 
});