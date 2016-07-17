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
"use strict";
/**
 * Données test
 * POUR la génération de dates en JSON : https://openclassrooms.com/forum/sujet/transformer-un-datetime-en-date-pour-json
 */
exports.DEVOIRS = [
    {
        "id": 1,
        "user": 1,
        "date": new Date("07/14/2016"),
        "auteur": "valentinviennot",
        "matiere": "Physique",
        "matiere_c": "matiere01",
        "texte": "description (formatage) et <\a href=\"test\">test</a>liens à tester",
        "commentaires": [
            {
                "id": 1,
                "user": 1,
                "auteur": "valentinviennot",
                "date": new Date("07/14/2016 14:17"),
                "texte": "commentaire et liens des pj"
            }
        ],
        "nb_fait": 0,
        "fait": false
    }
];
// DEBUG
exports.ARCHIVES = [];
//# sourceMappingURL=mock.js.map