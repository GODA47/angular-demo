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
import { LoginComponent } from './app/features/login/login.component.js';
import { TablePageComponent } from './app/features/login/loginTable.js';
import { EntitySearchComponent } from './app/features/entity-search/entity-search.component.js';
import { provideHttpClient } from '@angular/common/http';
// import { AuthStore } from './app/core/auth/auth.store.js';
import { BRRLoginComponent } from './app/features/brrlogin/brrlogin.component.js';

const routes: Routes = [ 
    {path: '', redirectTo: 'entity-search', pathMatch: 'full'}, 
    {path: 'demo-login',component:LoginComponent}, 
    {path: 'table',component:TablePageComponent},
    {path: 'entity-search',component:EntitySearchComponent},
    {path: 'brr-login',component:BRRLoginComponent},
]; 

bootstrapApplication(App, { 
    providers: [
        provideRouter(routes),
        provideHttpClient(),
        // AuthStore
    ] 
});
// bootstrapApplication(App, appConfig).catch((err) => console.error(err));
