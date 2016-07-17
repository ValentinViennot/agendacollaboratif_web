
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
 * Created by Valentin on 14/07/2016.
 */

 import { Commentaire } from './commentaire';

export class Devoir {

    // Identité
    id: number; // Référence du devoir en BDD
    user: number; // Référence de l'utilisateur en BDD
    // Dates
    date: Date; // POUR la génération de dates PHP->JSON : https://openclassrooms.com/forum/sujet/transformer-un-datetime-en-date-pour-json
    // Contenu
    auteur: string; // prenomnom de l'auteur
    matiere: string; // Nom de la matiere
    matiere_c:string; // Classe couleur associée à la matiere
    texte: string; // Description et liens des PJ
    commentaires: Commentaire[]; // TODO
    nb_fait: number; // Combien l'ont fait
    // Infos personnalisées
    fait: boolean; // Propre à l'utilisateur

}