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
 import {Component, OnInit, Inject} from '@angular/core';
 import { IntervalObservable } from 'rxjs/observable/IntervalObservable';

 // TODO Imports directives mini (cf setup PrimeNG)
 import {Panel, SplitButtonItem, SplitButton, Tooltip, AccordionTab, Accordion, Header, Button, Checkbox } from '../../vendor/primeng/primeng';

 import {SyncService} from "../services/synchronize.service";
 import {User} from "../concepts/user";
 import {Section} from "./section";
 import {Devoir} from "../concepts/devoir";
 import {Commentaire} from "../concepts/commentaire";
 import {DateService} from "../services/date.service";
 import {ParseService} from "../services/parse.service";
 import {NotificationService} from "../services/notification.service";
 import {TriService} from "../services/tri.service";

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
         Header,
         Button,
         Checkbox
     ],
     providers: [
         SyncService,
         DateService,
         ParseService,
         TriService
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
         private _parse: ParseService,
         private _notif: NotificationService,
         private _tri: TriService
     ) {
         this.merge= [];
     }

     ngOnInit() {
         // DEBUG
         // Normalement les vérifications que les variables existent avant d'arriver ici évitent la présence de ces lignes
         this.sync();
         window.localStorage.setItem("pendingDEL", JSON.stringify([]));
         window.localStorage.setItem("pendingDELc", JSON.stringify([]));
         window.localStorage.setItem("pendingALERT", JSON.stringify([]));
         window.localStorage.setItem("pendingDO", JSON.stringify([]));
         window.localStorage.setItem("pendingTASK", JSON.stringify([]));

         // DEBUG
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
         // DEBUG Pour le moment la SYNC est toujours effective donc la synchro overwrite tout le temps les données...
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
         this.devoirs.forEach(function (devoir) {
             // Si la date (jour) du devoir est différente de celle du précédent...
             if (devoir.date.toDateString()!=lastDate.toDateString()) {
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
             } else if (premier) {
                 premier = false;
                 section=null;
                 section = {
                     "titre":devoir.date.getDate().toString(),
                     "sous_titre":"Ajd.",
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

     public taskdone(devoir:Devoir):void {
         // Tache déjà marquée comme faite grâce au binding
         // Ecrase le localstorage
         window.localStorage.setItem("taches", JSON.stringify(this.taches));
         var matches:boolean=false;
         this.devoirs.forEach(function (value) {
             if (value.id==devoir.id) {
                 this.done(value);
                 matches = true;
             }
         }, this);
         if (!matches) {
             // Ajout l'opération à la liste d'attente
             let pending = JSON.parse(window.localStorage.getItem("pendingDO"));
             // Les opérations seront traitées successivement par le serveur qui reproduira l'action de l'utilisateur
             pending.push(devoir.id);
             window.localStorage.setItem("pendingDO", JSON.stringify(pending));
             // Lance une synchro
             this.sync();
         }
     }
     public done(devoir:Devoir):void {
         // On change l'état du devoir
         devoir.fait=!devoir.fait;
         // On met à jour le nombre de "marqué comme fait"
         if (devoir.fait)
             var increment = +1;
         else
             var increment = -1;
         this.devoirs[(this.devoirs).indexOf(devoir)].nb_fait+=increment;
         // Actualise l'affichage
         this.recalcSections();
         // Ecrase le localstorage
         window.localStorage.setItem("devoirs", JSON.stringify(this.devoirs));
         // Ajout l'opération à la liste d'attente
         var pending = JSON.parse(window.localStorage.getItem("pendingDO"));
         // Les opérations seront traitées successivement par le serveur qui reproduira l'action de l'utilisateur
         pending.push(devoir.id);
         window.localStorage.setItem("pendingDO", JSON.stringify(pending));
         // Lance une synchro
         this.sync();
     }
     /**
      * Ajoute un devoir à la liste de "merge"
      * @param devoir
      */
     public addToMerge(devoir:Devoir):void {
         var faisable:boolean = true;
         var raison:string = "";
         // Si la liste d'attente est vide, il n'y a pas de risque
         if (this.merge.length>0) {
             // Sinon il faut vérifier que le "merge" est faisable
             // Tant que c'est faisable, on cherche un conflit
             var i:number = 0;
             while (faisable&&i<this.merge.length) {
                 // S'ils sont les même
                 if (devoir.id==this.merge[i].id) {
                     faisable = false;
                     raison="autre";
                 }
                 // S'ils ne sont pas pour la même matière
                 else if (devoir.matiere!=this.merge[i].matiere) {
                     faisable = false;
                     raison="de la même matière";
                 }
                 // S'ils ne sont pas pour la même date
                 else if (devoir.date.valueOf()!=this.merge[i].date.valueOf()) {
                     faisable = false;
                     raison="pour la même date";
                 }
                 i++;
             }
         }
         if (faisable)
             this.merge.push(devoir);
         else
             this._notif.add(2,
                 "Impossible de fusionner",
                 "Etant donné les devoirs déjà en attente de fusion celui ci ne peut être ajouté.\n" +
                 "Choisis en un "+raison+" ou vide la liste de fusion."
             );

     }
     public clearMerge():void {
         this.merge = [];
     }

     /**
      * Signale le devoir comme indésirable
      * @param devoir
      */
     public signaler(devoir:Devoir):void {
         // On ajoute l'ID du devoir à la liste d'attente des signalements
         var pending=JSON.parse(window.localStorage.getItem("pendingALERT"));
         pending.push(devoir.id);
         window.localStorage.setItem("pendingALERT", JSON.stringify(pending));
         // Lance une synchronisation
         this.sync();
         // Notifie l'utilisateur
         this._notif.add(1,"Devoir signalé !", "Un modérateur l'examinera prochainement. S'il n'est pas conforme à nos règles d'utilisation il sera supprimé et son auteur sanctionné, votre identité ne sera jamais dévoilée au cours du processus.");
     }
     /**
      * Suppression d'un devoir
      * @param devoir à supprimer
      */
     public supprimer(devoir:Devoir):void {
         var th = this;
         this._notif.ask(
             "Confirmation",
             "La suppression est définitive. Plus aucun utilisateur n'aura accès à ce devoir.",
             "Confirmer", "Annuler")
                .then(function() {
                    // Supprimer de devoirs[]
                    th.devoirs.splice((th.devoirs).indexOf(devoir),1);
                    // On actualise l'affichage
                    th.recalcSections();
                    // Ecrase localstorage
                    window.localStorage.setItem("devoirs", JSON.stringify(th.devoirs));
                    // Ajoute l'opération à la liste d'attente du suppression de devoirs
                    var pending=JSON.parse(window.localStorage.getItem("pendingDEL"));
                    pending.push(devoir.id);
                    window.localStorage.setItem("pendingDEL", JSON.stringify(pending));
                    // Lance une synchronisation
                    th.sync();
                    // Notifie l'utilisateur
                    th._notif.add(0,"Effectué.", "Le devoir a été supprimé de l'agenda !");
                });
     }
     /**
      * Supprime le commentaire
      * @param devoir devoir auquel appartient ce commentaire
      * @param commentaire à supprimer
      */
     public supprimer_comm(devoir:Devoir, commentaire:Commentaire):void {
         // On supprime le commentaire du devoir concerné
         devoir.commentaires.splice((devoir.commentaires).indexOf(commentaire),1);
         // On actualise l'affichage
         this.recalcSections();
         // Ecrase localstorage
         window.localStorage.setItem("devoirs", JSON.stringify(this.devoirs));
         // Ajoute l'opération à la liste d'attente du suppression de commentaires
         var pending=JSON.parse(window.localStorage.getItem("pendingDELc"));
         pending.push(commentaire.id);
         window.localStorage.setItem("pendingDELc", JSON.stringify(pending));
         // Lance une synchronisation
         this.sync();
     }

     public addToMine(devoir:Devoir):void {
         // Ajoute le devoir aux taches en cours
         this.taches.push(devoir);
         // Tri le tableau de taches
         this.taches = this._tri.devoirs_date(this.taches);
         // Ecrase localstorage
         window.localStorage.setItem("taches", JSON.stringify(this.taches));
         // Ajoute l'opération à la liste d'attente du suppression de commentaires
         var pending=JSON.parse(window.localStorage.getItem("pendingTASK"));
         pending.push(devoir.id);
         window.localStorage.setItem("pendingTASK", JSON.stringify(pending));
         // Lance une synchronisation
         this.sync();
     }
 }