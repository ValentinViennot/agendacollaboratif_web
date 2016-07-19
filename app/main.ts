
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
 import { bootstrap }    from '@angular/platform-browser-dynamic';
 import { HTTP_PROVIDERS } from '@angular/http';
 import { LocationStrategy, HashLocationStrategy } from '@angular/common';

 import { AppComponent } from './app.component';
 import { appRouterProviders } from './app.routes';
 import {NotificationService} from "./services/notification.service";

 bootstrap(AppComponent, [
     appRouterProviders,
     {provide: LocationStrategy, useClass: HashLocationStrategy},
     HTTP_PROVIDERS
 ]);