import { Routes } from '@angular/router';
import { LoginComponent } from './features/brrlogin/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { EntitySearchComponent } from './features/entity-search/entity-search.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'entity/search',
                component: EntitySearchComponent
            },
            // {
            //     path: 'entity/information',
            //     component: EntityInformationComponent
            // }
        ]
    }
];
