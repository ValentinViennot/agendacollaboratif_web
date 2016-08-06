
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
 * Created by Valentin on 13/07/2016.
 */

 import { Devoir } from './concepts/devoir';

 /**
  * Données qui seront récuprées depuis le serveur d'APIs
  * @type Devoir[]
  */
 export var DEVOIRS:Devoir[];
 /**
  * Données test
  * POUR la génération de dates en JSON : https://openclassrooms.com/forum/sujet/transformer-un-datetime-en-date-pour-json
  */
 DEVOIRS = [
     {
         "id": 4,
         "user": 2,
         "date": new Date("07/17/2016"),
         "auteur": "jeanmichel",
         "matiere": "Maths",
         "matiere_c": "matiere2",
         "texte": "Suspendisse congue, ex non elementum vestibulum, dolor massa hendrerit ante, vel euismod nisl nunc sed felis. Fusce pharetra nunc non venenatis tempor. Phasellus ut tellus nec orci commodo porttitor at eleifend felis. Integer elementum auctor ultricies.",
         "commentaires": [
             {
                 "id": 100,
                 "user": 1,
                 "auteur": "valentinviennot",
                 "date": new Date("07/14/2016 14:17:00"),
                 "texte": "Phasellus sapien felis, rutrum quis luctus at, venenatis non justo. Ut sapien neque, accumsan non finibus vel, placerat et lacus. Donec euismod nibh vel placerat pharetra."
             }
         ],
         "nb_fait": 3,
         "fait": false,
         "flag":0
     },
     {
         "id": 1,
         "user": 1,
         "date": new Date("07/17/2016"),
         "auteur": "valentinviennot",
         "matiere": "Physique",
         "matiere_c": "matiere1",
         "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse congue, ex non elementum vestibulum, dolor massa hendrerit ante, vel euismod nisl nunc sed felis. Fusce pharetra nunc non venenatis tempor. Phasellus ut tellus nec orci commodo porttitor at eleifend felis. Integer elementum auctor ultricies.",
         "commentaires": [
             {
                 "id": 1,
                 "user": 2,
                 "auteur": "jeanmichel",
                 "date": new Date("07/14/2016 14:17:00"),
                 "texte": "Phasellus sapien felis, rutrum quis luctus at, venenatis non justo. Ut sapien neque, accumsan non finibus vel, placerat et lacus. Donec euismod nibh vel placerat pharetra."
             }
         ],
         "nb_fait": 0,
         "fait": false,
         "flag":0
     },
     {
         "id": 2,
         "user": 2,
         "date": new Date("07/17/2016"),
         "auteur": "jeanmichel",
         "matiere": "Physique",
         "matiere_c": "matiere2",
         "texte": "Suspendisse congue, ex non elementum vestibulum, dolor massa hendrerit ante, vel euismod nisl nunc sed felis. Fusce pharetra nunc non venenatis tempor. Phasellus ut tellus nec orci commodo porttitor at eleifend felis. Integer elementum auctor ultricies.",
         "commentaires": [
             {
                 "id": 100,
                 "user": 1,
                 "auteur": "valentinviennot",
                 "date": new Date("07/14/2016 14:17:00"),
                 "texte": "Phasellus sapien felis, rutrum quis luctus at, venenatis non justo. Ut sapien neque, accumsan non finibus vel, placerat et lacus. Donec euismod nibh vel placerat pharetra."
             }
         ],
         "nb_fait": 3,
         "fait": false,
         "flag":0
     },
     {
         "id": 3,
         "user": 2,
         "date": new Date("07/17/2016"),
         "auteur": "jeanmichel",
         "matiere": "Maths",
         "matiere_c": "matiere2",
         "texte": "Suspendisse congue, http://google.fr api.groupesix.xyz ex non elementum vestibulum, dolor massa hendrerit ante, vel euismod nisl nunc sed felis. Fusce pharetra nunc non venenatis tempor. Phasellus ut tellus nec orci commodo porttitor at eleifend felis. Integer elementum auctor ultricies.",
         "commentaires": [
             {
                 "id": 100,
                 "user": 1,
                 "auteur": "valentinviennot",
                 "date": new Date("07/14/2016 14:17:00"),
                 "texte": "Phasellus sapien felis, rutrum quis luctus at, venenatis non justo. Ut sapien neque, accumsan non finibus vel, placerat et lacus. Donec euismod nibh vel placerat pharetra."
             }
         ],
         "nb_fait": 3,
         "fait": false,
         "flag":0
     }
 ];


 // DEBUG

 export var ARCHIVES: any[] = [];