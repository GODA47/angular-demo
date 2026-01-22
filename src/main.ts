/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import {bootstrapApplication} from '@angular/platform-browser';
import { provideRouter,Routes } from '@angular/router';
import {appConfig} from './app/app.config.js';
import {App} from './app/app';
import { Login } from './app/login.js';
import { TablePageComponent } from './app/loginTable.js';
import { EntitySearchComponent } from './app/entitySearch.js';

const routes: Routes = [ 
    {path: '', redirectTo: 'entity-search', pathMatch: 'full'}, 
    {path: 'login',component:Login}, 
    {path: 'table',component:TablePageComponent},
    {path: 'entity-search',component:EntitySearchComponent},
]; 

bootstrapApplication(App, { 
    providers: [provideRouter(routes)] 
});
// bootstrapApplication(App, appConfig).catch((err) => console.error(err));
