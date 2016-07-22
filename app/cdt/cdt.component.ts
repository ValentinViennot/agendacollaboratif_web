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

 import {SyncService} from "../services/synchronize.service";
 import {User} from "../concepts/user";
 import {Section} from "./section";
 import {Devoir} from "../concepts/devoir";
 import {Commentaire} from "../concepts/commentaire";
 import {DateService} from "../services/date.service";
 import {ParseService} from "../services/parse.service";
 import {NotificationService} from "../services/notification.service";
 import {DEVOIRS} from "../mock";
 import {SplitButton} from "../../vendor/primeng/components/splitbutton/splitbutton";
 import {SplitButtonItem} from "../../vendor/primeng/components/splitbutton/splitbuttonitem";
 import {Panel} from "../../vendor/primeng/components/panel/panel";
 import {Accordion} from "../../vendor/primeng/components/accordion/accordion";
 import {AccordionTab} from "../../vendor/primeng/components/accordion/accordiontab";
 import {Checkbox} from "../../vendor/primeng/components/checkbox/checkbox";
 import {Button} from "../../vendor/primeng/components/button/button";
 import {OverlayPanel} from "../../vendor/primeng/components/overlaypanel/overlaypanel";
 import {Tooltip} from "../../vendor/primeng/components/tooltip/tooltip";
 import {Header} from "../../vendor/primeng/components/common";
 import {InputTextarea} from "../../vendor/primeng/components/inputtextarea/inputtextarea";

 @Component({
     selector: 'my-cdt',
     templateUrl: 'app/cdt/cdt.html',
     directives: [
         SplitButton,
         SplitButtonItem,
         Panel,
         Accordion,
         AccordionTab,
         Checkbox,
         Button,
         OverlayPanel,
         Tooltip,
         Header,
         InputTextarea
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
     // Devoirs
     devoirs: Devoir[];
     sections: Section[];
     // Flag
     selectedDevoir:Devoir;
     flags:string[];
     // Merge
     merge: Devoir[];
     // Commentaire
     input:string[];

     constructor(
         private _sync: SyncService,
         private _date: DateService,
         private _parse: ParseService,
         private _notif: NotificationService
     ) {
         this.merge= [];
         this.flags= ["grey","blue","orange","red"];
         this.input= [];
     }

     ngOnInit() {
         // DEBUG
         // Normalement les vérifications que les variables existent avant d'arriver ici évitent la présence de ces lignes
         this.sync();
         window.localStorage.setItem("devoirs", JSON.stringify(DEVOIRS));
         window.localStorage.setItem("pendDEL", JSON.stringify([]));
         window.localStorage.setItem("pendDELc", JSON.stringify([]));
         window.localStorage.setItem("pendALERT", JSON.stringify([]));
         window.localStorage.setItem("pendDO", JSON.stringify([]));
         window.localStorage.setItem("pendFLAG", JSON.stringify([]));
         window.localStorage.setItem("pendCOMM", JSON.stringify([]));
         window.localStorage.setItem("pendMERGE", JSON.stringify([]));

         // DEBUG
         console.log("* cdtController *");
         // TODO Vérifier si les variables (devoirs, archives, user, pending) sont dispo et si l'user est logged via un CanActivate
         // Récupère les devoirs du local storage
         this.devoirs = this.getDevoirs();
         // On les transforme en sections
         this.recalcSections();
         // On récupère les infos de l'utilisateur
         this.user = this._sync.getUser(); // TODO user.service
         // DEBUG Pour le moment la SYNC est toujours effective donc la synchro ecrase tout le temps les données...
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
         if(!premier)
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
         // On change l'état du devoir
         devoir.fait=!devoir.fait;
         // On met à jour le nombre de "marqué comme fait"
         if (devoir.fait)
             var increment = +1;
         else
             var increment = -1;
         this.devoirs[(this.devoirs).indexOf(devoir)].nb_fait+=increment;
         // Ajoute à la liste d'actions en attente
         this.pend("DO",{"id":devoir.id,"done":devoir.fait});
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
     public doMerge():void {
         var ids:number[] = [];
         for (var i:number=0;i<this.merge.length;i++)
             ids[i]=this.merge[i].id;
         this.pend("MERGE",ids);
         this._notif.add(0,
             "Fusion préparée",
             "La demande de fusion pour ces "+this.merge.length+" devoirs sera bientôt transmise au serveur, à la prochaine synchronisation les anciens devoirs seront remplacés par le résultat de cette fusion !"
         );
         this.merge = [];
     }

     /**
      * Signale le devoir comme indésirable
      * @param devoir
      */
     public signaler(devoir:Devoir):void {
         // On ajoute l'ID du devoir à la liste d'attente des signalements
         this.pend("ALERT",devoir.id);
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
                    // Ajout à la liste de suppression de devoirs
                    th.pend("DEL",devoir.id);
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

         // On ajoute l'opération en liste d'attente
         this.pend("DELc",commentaire.id);
     }

     public sendComment(devoir:Devoir,input:string,index:number) {
         // Création du commentaire
         var commentaire:Commentaire = {
             "id":0,
             "user":this.user.id,
             "auteur":this.user.prenom+this.user.nom,
             "date": new Date(),
             "texte": input
         };
         // On ajoute le commentaire au devoir
         devoir.commentaires.splice(0,0,commentaire);
         // Ajout à la liste d'attente
         this.pend("COMM", {"id":devoir.id,"content":commentaire});
         this.input[index]="";
     }

     public selectDevoir(event,devoir: Devoir, overlaypanel: OverlayPanel) {
         this.selectedDevoir = devoir;
         overlaypanel.toggle(event);
     }

     public getFlags():number[] {
         var retour:number[] = [];
         for (var i:number=0;i<this.flags.length;i++)
             if (i!=this.selectedDevoir.flag)
                 retour.push(i);
         return retour;
     }

     public setFlag(flag:number, overlaypanel: OverlayPanel) {
         this.selectedDevoir.flag = flag;
         this.pend("FLAG",{"id":this.selectedDevoir.id,"flag":flag});
         overlaypanel.hide();
     }

     private pend(list:string, push:any):void {
         // Ecrase localstorage
         window.localStorage.setItem("devoirs", JSON.stringify(this.devoirs));
         // Ajoute l'opération à la liste d'attente du suppression de commentaires
         var pending=JSON.parse(window.localStorage.getItem("pend"+list));
         pending.push(push);
         window.localStorage.setItem("pend"+list, JSON.stringify(pending));
         // Lance une synchronisation
         this.sync();
     }
 }