
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
         "id": 1,
         "user": 1,
         "date": new Date("07/17/2016"),
         "auteur": "valentinviennot",
         "matiere": "Physique",
         "matiere_c": "matiere01",
         "texte": "Cras ornare cursus justo.",
         "commentaires": [
             {
                 "id": 1,
                 "user": 1,
                 "auteur": "valentinviennot",
                 "date": new Date("07/14/2016 14:17:00"),
                 "texte": "Phasellus sapien felis, rutrum quis luctus at, venenatis non justo. Ut sapien neque, accumsan non finibus vel, placerat et lacus. Donec euismod nibh vel placerat pharetra."
             }
         ],
         "nb_fait": 0,
         "fait": false
     },
     {
         "id": 2,
         "user": 1,
         "date": new Date("07/17/2016"),
         "auteur": "valentinviennot",
         "matiere": "Physique",
         "matiere_c": "matiere01",
         "texte": "Suspendisse condimentum tristique odio at bibendum. Morbi iaculis tempus felis vitae commodo. Nam in tortor eleifend, finibus ipsum a, porttitor ligula",
         "commentaires": [
             {
                 "id": 1,
                 "user": 2,
                 "auteur": "valentinviennot",
                 "date": new Date("07/14/2016 14:17:00"),
                 "texte": "Suspendisse condimentum tristique odio at bibendum. Morbi iaculis tempus felis vitae commodo. Nam in tortor eleifend, finibus ipsum a, porttitor ligula."
             },
             {
                 "id": 2,
                 "user": 1,
                 "auteur": "valentinviennot",
                 "date": new Date("07/17/2016 08:17:00"),
                 "texte": "laoreet non. Aliquam congue lectus at ligula ornare finibus. Aenean at tincidunt nisi. Vestibulum vitae placerat nibh. Quisque et tortor eu nisi porttitor"
             },
             {
                 "id": 3,
                 "user": 2,
                 "auteur": "valentinviennot",
                 "date": new Date("07/17/2016 16:55:15"),
                 "texte": "vestibulum. Aliquam erat volutpat. Nunc non rhoncus metus. Cras neque nunc, vestibulum ut sollicitudin nec, vulputate quis mi. In hac habitasse platea dictumst. Integer at diam at mauris lobortis ultricies a vitae eros. Nullam finibus bibendum nunc ut accumsan. Etiam nec arcu nisl. In in enim iaculis"
             }
         ],
         "nb_fait": 0,
         "fait": false
     },
     {
         "id": 3,
         "user": 1,
         "date": new Date("07/19/2016"),
         "auteur": "valentinviennot",
         "matiere": "Physique",
         "matiere_c": "matiere01",
         "texte": "Nunc vel mauris in ante tincidunt pharetra in sed sapien. In molestie pharetra lacinia. Curabitur ut imperdiet orci, et ornare nisl. Sed mollis viverra vehicula. Quisque dictum convallis purus, nec tristique nisi bibendum at. In ante purus, aliquam a finibus sit amet, porttitor cursus turpis. Phasellus efficitur maximus leo, ac aliquam enim laoreet non.",
         "commentaires": [
         ],
         "nb_fait": 3,
         "fait": false
     }
 ];


 // DEBUG

 export var ARCHIVES: any[] = [];