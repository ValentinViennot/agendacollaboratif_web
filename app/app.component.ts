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

 import {Component, Inject} from '@angular/core';
 import { ROUTER_DIRECTIVES } from '@angular/router';

 // Affichage des notifications
 import {Growl} from "../components/growl/growl";

 // Gestion des notifications
 import {NotificationService} from "./services/notification.service";
 // Gestion de l'utilisateur
 import {UserService} from "./services/user.service";

 @Component({
     selector: 'body',
     templateUrl: `app/app.html`,
     directives: [
         ROUTER_DIRECTIVES,
         Growl
     ],
     providers: [
         NotificationService,
         UserService
     ]
 })
 export class AppComponent {

     constructor(
        private _notif:NotificationService,
        private _user:UserService
     ) {
     }
 }