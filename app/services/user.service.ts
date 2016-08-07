
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
 * Created by Valentin on 06/08/2016.
 */

 import { Injectable } from '@angular/core';
 import {User} from "../concepts/user";

 @Injectable()
 export class UserService {

     // Utilisateur connecté
     private user:User;

     constructor() {
         // DEBUG car par de service login pour le moment
         this.user = {
             "id":1,
             "version":1,
             "auth":"46edb1262452d1cbe659601c43a7eb2c",
             "nom":"Viennot",
             "prenom":"Valentin",
             "email":"tinodu78@gmail.com",
             "notifs":2,
             "mail":true,
             "fake_identity":true
         };
         // TODO API login qui enregistre en local storage l'utilisateur
     }

     public getUser():User {
         // TODO Actualisation avec gestion de version
         return this.user;
     }

     /**
      * Renvoit le token de sécurité qui identifie l'utilisateur sur cet appareil
      * @return {string}
      */
     public getToken():string {
         return this.user.auth;
     }
 }