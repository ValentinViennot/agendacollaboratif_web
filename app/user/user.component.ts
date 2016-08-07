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

 import {Component, OnInit } from '@angular/core';
 import {Control} from "@angular/common";
 import 'rxjs/add/operator/debounceTime';
 import 'rxjs/add/operator/distinctUntilChanged';
 import {UserService} from "../services/user.service";
 import {User} from "../concepts/user";
 import {Panel} from "../../components/panel/panel";
 import {Button} from "../../components/button/button";
 import {InputText} from "../../components/inputtext/inputtext";
 import {Tooltip} from "../../components/tooltip/tooltip";
 import {ToggleButton} from "../../components/togglebutton/togglebutton";
 import {InputSwitch} from "../../components/inputswitch/inputswitch";

 @Component({
     selector: 'agd-user',
     templateUrl: 'app/user/user.html',
     directives: [
         Panel,
         Button,
         InputText,
         Tooltip,
         ToggleButton,
         InputSwitch
     ],
     providers: [],
     pipes : []
 })
 // TODO Notifications navigateur à voir et ajouter
export class UserComponent implements OnInit {

     // Variables globales
     // TODO Si ce n'est qu'une référence, importer depuis le localstorage pour ce composant
     user:User;

     mdp1:string;
     mdp2:string;
     // Observer les changements
     changed:boolean;
     form:Control;

     // Constructeur (de services)
     constructor(
         private _user:UserService
     ) {
         this.changed=false;
         this.form = new Control();
     }

     // Initialisation
     ngOnInit(): void {
         console.log("* UserController *");
         this.user = this._user.getUser();
         // DEBUG : Est appelé sans raison au chargement !
         this.form.valueChanges
             .debounceTime(600)
             .distinctUntilChanged()
             .subscribe(form => this.changed=true);
     }

     public save():void {
         this.changed=false;
     }
}