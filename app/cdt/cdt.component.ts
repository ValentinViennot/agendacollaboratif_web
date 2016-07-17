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
 import { Component , OnInit } from '@angular/core';
 import { IntervalObservable } from 'rxjs/observable/IntervalObservable';

 // TODO Imports directives mini (cf setup PrimeNG)
 import {Panel, SplitButtonItem, SplitButton, Tooltip, AccordionTab, Accordion, Header} from 'primeng/primeng';

 import { SyncService } from "../services/synchronize.service";
 import {User} from "../concepts/user";
 import {Section} from "./section";
 import {Devoir} from "../concepts/devoir";
 import {Commentaire} from "../concepts/commentaire";
 import {DateService} from "../services/date.service";
 import {ParseService} from "../services/parse.service";

 @Component({
     selector: 'my-cdt',
     templateUrl: 'app/cdt/cdt.html',
     directives: [
         Panel,
         SplitButton,
         SplitButtonItem,
         Tooltip,
         Accordion,
         AccordionTab,
         Header
     ],
     providers: [
         SyncService,
         DateService,
         ParseService
     ]
 })
 export class CdtComponent implements OnInit {

     // Archives ou Devoirs
     type:string = "devoirs";
     // Utilisateur
     user: User;
     //
     devoirs: Devoir[];
     sections: Section[];
     taches: Devoir[];
     merge: Devoir[];

     constructor(
         private _sync: SyncService,
         private _date: DateService,
         private _parse: ParseService
     ) {
         this.merge= [];
     }

     ngOnInit() {
         console.log("* cdtController *");
         // TODO Vérifier si les variables (devoirs, archives, user, pending) sont dispo et si l'user est logged via un CanActivate
         // Récupère les devoirs du local storage
         this.devoirs = this.getDevoirs();
         // On les transforme en sections
         this.recalcSections();
         // Récupère les taches du local storage
         this.taches = this.getTaches();
         // On récupère les infos de l'utilisateur
         this.user = this._sync.getUser();
         // DEBUG : Remplacer par tache reguliere (avec notion de version et de SYNC effective)
         this.sync();
         // DEBUG Pour le moment la SYNC est toujours effective
         // On configure une synchronisation automatique régulière (ms)
         // IntervalObservable.create(1000).subscribe((t) => this.sync());
     }

     // Méthodes internes, pour le Component
     /**
      * Synchronise les devoirs, si lea SYNC est effective : on remplace les devoirs du template par les nouveaux
      */
     private sync():void {
         var th = this;
         this._sync.do().then(
             function(str:String) {
                 // Si la synchronisation a été effective, on remplace les devoirs de la template par les nouveaux
                 th.devoirs = th.getDevoirs();
                 // Sans oublier de recalculer les sections !
                 th.recalcSections();
                 // DEBUG
                 console.log(str);
             },
             function(str:String) {
                 // DEBUG
                 console.log(str);
             }
         );
     }
     /**
      * Récupère les devoirs du local storage
      * @return {any}
      */
     private getDevoirs(): Devoir[] {
         console.log("GETDEVOIRS"); // DEBUG TODO Optimisation de l'appel (nb occurences)
         return this._parse.parse(this.type);
     }
     /**
      * Récupère les tâches de l'utilisateur du local storage
      * @return {any}
      */
     private getTaches(): Devoir[] {
         console.log("GETTACHES"); // DEBUG TODO Optimisation de l'appel (nb occurences)
         return this._parse.parse("taches");
     }
     /**
      * Recalcule les sections à partir du tableau de devoirs du component
      * ATTENTION : On suppose que les devoirs sont déjà triés par date et classés par matière
      * @return {Section[]}
      */
     private getSections(): Section[] {
         // Retour
         var sections:Section[] = [];
         // Variables pour la boucle
         var section:Section;
         var lastDate:Date = new Date();
         var premier:boolean=true;
         // Pour chaque devoir...
         this.devoirs.forEach(function (devoir, index, array) {
             // Si la date du devoir est différente de celle du précédent...
             if (devoir.date.getTime()!=lastDate.getTime()) {
                 // ...S'il s'agit du premier élément...
                 if (premier) {
                     // ...alors le prochain ne sera plus le premier !
                     premier = false;
                 } else { // Sinon...
                     // ...On ajoute la section en cours au retour
                     sections.push(section);
                     // On efface la section
                     section = null;
                 }
                 // On initialise une nouvelle section
                 let day_num:string = devoir.date.getDate().toString();
                 let day_texte:string = this._date.getDayTiny(devoir.date);
                 section = {
                     "titre":day_num,
                     "sous_titre":day_texte,
                     "devoirs": []
                 };
             }
             // On ajoute le devoir à la section en cours
             section.devoirs.push(devoir);
             // On remplace la "date du dernier devoir" par celle de celui en cours
             lastDate=devoir.date;
             // Puis on passe au suivant !
         },this);
         // On ajoute la dernière section créée aux sections
         sections.push(section);
         // Et on renvoi les sections !
         return sections;
     }
     /**
      * Remplace les sections du template par les sections recalculées
      */
     private recalcSections():void {
         console.log("RECALCSECTIONS"); // DEBUG
         this.sections = this.getSections();
     }

     public done(devoir:Devoir):void {
         // TODO
     }

     public addToMerge(devoir:Devoir):void {
         this.merge.push(devoir); // TODO Vérifications (et notifs)
     }

     public signaler(devoir:Devoir):void {
         // TODO
     }

     public supprimer(devoir:Devoir):void {
         // TODO
     }

     public supprimer_comm(commentaire:Commentaire):void {
         // TODO
     }

     public addToMine(devoir:Devoir):void {
         // TODO
     }
 }