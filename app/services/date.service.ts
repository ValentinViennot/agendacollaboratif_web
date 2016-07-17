
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
 * Created by Valentin on 16/07/2016.
 */

import {Injectable} from "@angular/core";


 @Injectable()
 export class DateService {
     constructor() {

     }

     public getDay(date:Date):string {
         var day:string = "ERREUR";
         switch (date.getDay()) {
             case 0:
                 day="Dimanche";
                 break;
             case 1:
                 day="Lundi";
                 break;
             case 2:
                 day="Mardi";
                 break;
             case 3:
                 day="Mercredi";
                 break;
             case 4:
                 day="Jeudi";
                 break;
             case 5:
                 day="Vendredi";
                 break;
             case 6:
                 day="Samedi";
                 break;
         }
         return day;
     }

     public getDayTiny(date:Date):string {
         return `${this.getDay(date).substr(0, 3)}.`; // TODO
     }
 }