import {Component} from '@angular/core';
import {Login} from './login';
import { TablePageComponent } from './loginTable';
@Component({
  selector: 'app-root',
  styles: ``,
  template: `<app-login />`,
  imports: [Login],
})
// @Component({
//   selector:'app-root',
//   template: `<app-login-table />`,
//   imports: [TablePageComponent]
// })
export class App {
}
