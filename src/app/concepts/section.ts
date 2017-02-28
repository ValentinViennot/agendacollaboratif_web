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
import {Devoir} from "./devoir";
import {CdtComponent} from "../pages/cdt.component";
import {SelectItem} from "../../components/common/api";
import {DateService} from "../services/date.service";
import {SectionFiltered} from "./sectionfiltered";

/**
 * Created by Valentin on 15/07/2016.
 */

export class Section {
  titre: string;
  mois: string;
  sous_titre: string;
  devoirs: Devoir[];

  /**
   *
   * @param devoirs Devoirs à transformer en sections
   * @param _date DateService
   * @return {SectionFiltered}
   */
  public static getSections(devoirs: Devoir[], _date: DateService): any {
    // Données de retour
    let subjectfilters: SelectItem[] = [];
    let filtres_name: string[] = [];
    let filtres_count: number[] = [];
    let flagcount = Array.apply(null, Array(CdtComponent.flags.length)).map(Number.prototype.valueOf, 0);
    let sections: Section[] = [];
    // Variables pour la boucle
    let section: Section = new Section();
    let lastDate: Date = new Date();
    let premier: boolean = true;
    // Pour chaque devoir...
    devoirs.forEach(function (devoir) {
      // Compte les flags
      flagcount[devoir.flag]++;
      // Enregistre les filtres appliquables
      if (filtres_name.indexOf(devoir.matiere) < 0) {
        filtres_name.push(devoir.matiere);
        filtres_count[filtres_name.indexOf(devoir.matiere)] = 1;
      }
      else
        filtres_count[filtres_name.indexOf(devoir.matiere)]++;
      // Si la date (jour) du devoir est différente de celle du précédent...
      if (devoir.date.toLocaleDateString() != lastDate.toLocaleDateString()) {
        // ...S'il s'agit du premier élément...
        if (premier) {
          // ...alors le prochain ne sera plus le premier !
          premier = false;
        } else { // Sinon...
          // ...On ajoute la section en cours au retour
          sections.push(section);
        }
        // On initialise une nouvelle section
        let day_num: string = devoir.date.getDate().toString();
        let day_texte: string = _date.getDayTiny(devoir.date);
        section = {
          "titre": day_num,
          "mois": (devoir.date.getMonth() != lastDate.getMonth() ? _date.getMonth(devoir.date) : null),
          "sous_titre": day_texte,
          "devoirs": []
        };
      } else if (premier) {
        premier = false;
        section = {
          "titre": devoir.date.getDate().toString(),
          "mois": (devoir.date.getMonth() != lastDate.getMonth() ? _date.getMonth(devoir.date) : null),
          "sous_titre": "Ajd.",
          "devoirs": []
        };
      }
      // On ajoute le devoir à la section en cours
      section.devoirs.push(devoir);
      // On remplace la "date du dernier devoir" par celle de celui en cours
      lastDate = devoir.date;
      // Puis on passe au suivant !
    });
    // On ajoute la dernière section créée aux sections
    if (!premier)
      sections.push(section);
    // On créé les filtres appliquables
    filtres_name.forEach(
      function (name: string, index: number) {
        subjectfilters.push({
          "label": "#" + name + " (" + filtres_count[index] + ")",
          "value": "#" + name
        });
      }
    );
    return {
      sections: sections,
      subjectfilters: subjectfilters,
      flagcount: flagcount
    };
  }
}
