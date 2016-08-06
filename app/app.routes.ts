 /*
    "l'Agenda Collaboratif"
    Copyright (C)  2016  Valentin VIENNOT
    Contact : vviennot@orange.fr

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    
    You have to put a copy of this program's license into your project.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    
    FULL LICENSE FILE : https://github.com/misterw97/agendacollaboratif/edit/master/LICENSE
*/
/**
 * Created by Valentin on 10/07/2016.
 */

 import { provideRouter, RouterConfig }  from '@angular/router';

 import { CdtComponent } from './cdt/cdt.component';
 import {GroupComponent} from "./group/group.component";

 const routes: RouterConfig = [
     {
         path: 'cdt',
         component: CdtComponent
     },
     {
         path: 'group',
         component: GroupComponent
     },
     {
         path: '',
         redirectTo: '/cdt',
         pathMatch: 'prefix'
     },
     { path: '**', redirectTo: '/cdt' }
 ];
 // Authentification https://angular.io/docs/ts/latest/guide/router.html : can activate

 export const appRouterProviders = [
     provideRouter(routes)
 ];