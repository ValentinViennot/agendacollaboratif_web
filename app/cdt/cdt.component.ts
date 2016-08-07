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

// TODO Améliorations, todos, DEBUG, relire code et erreurs, style

 // Angular2 components
 import {Component, OnInit, OnDestroy} from '@angular/core';
 import { ActivatedRoute } from '@angular/router';
 import {Control} from "@angular/common";
 import {REACTIVE_FORM_DIRECTIVES,FormGroup} from '@angular/forms';

 // RXJS : Observables
 import 'rxjs/add/operator/debounceTime';
 import 'rxjs/add/operator/distinctUntilChanged';
 // import { IntervalObservable } from 'rxjs/observable/IntervalObservable'; // TODO

 // Modeles persos
 import {User} from "../concepts/user";
 import {Section} from "./section";
 import {Devoir} from "../concepts/devoir";
 import {Commentaire} from "../concepts/commentaire";

 // Services persos
 import {SyncService} from "../services/synchronize.service";
 import {DateService} from "../services/date.service";
 import {ParseService} from "../services/parse.service";
 import {NotificationService} from "../services/notification.service";
 import {UserService} from "../services/user.service";
 import {LinkyPipe} from "../../node_modules/angular2-linky/linky-pipe";

 // Prime UI / Prime NG directives
 import {SplitButton} from "../../components/splitbutton/splitbutton";
 import {SplitButtonItem} from "../../components/splitbutton/splitbuttonitem";
 import {Panel} from "../../components/panel/panel";
 import {Accordion} from "../../components/accordion/accordion";
 import {AccordionTab} from "../../components/accordion/accordiontab";
 import {Checkbox} from "../../components/checkbox/checkbox";
 import {Button} from "../../components/button/button";
 import {OverlayPanel} from "../../components/overlaypanel/overlaypanel";
 import {Tooltip} from "../../components/tooltip/tooltip";
 import {Header, SelectItem} from "../../components/common";
 import {InputTextarea} from "../../components/inputtextarea/inputtextarea";
 import {InputText} from '../../components/inputtext/inputtext';
 import {SelectButton} from "../../components/selectbutton/selectbutton";

 // DEBUG
 import {DEVOIRS} from "../mock";

 @Component({
     selector: 'agd-cdt',
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
         InputTextarea,
         SelectButton,
         InputText,
         REACTIVE_FORM_DIRECTIVES
     ],
     providers: [
         SyncService,
         DateService,
         ParseService
     ],
     pipes : [
         LinkyPipe
     ]
 })
 export class CdtComponent implements OnInit, OnDestroy {

     // Sélection de la source à afficher TODO par variable et par défaut ?
     type:string = "devoirs";
     // utilisateur
     user:User;
     // Devoirs
     devoirs: Devoir[];
     sections: Section[];
     // private interval: any; // Synchro auto
     // Flag
     selectedDevoir:Devoir;
     flags:string[];
     flags_count:number[];
     // Merge
     merge: Devoir[];
     // Commentaire
     input:string[];
     selectedComm:Devoir;
     // Filtres
     searchForm: FormGroup;
     sub: any; // URL
     filtre:string = "";
     filtre_texte:string= "";
     filtres: SelectItem[];
     selectedFiltres:string[];

     constructor(
         private _sync: SyncService,
         private _date: DateService,
         private _parse: ParseService,
         private _notif: NotificationService,
         private _route: ActivatedRoute,
         private _user:UserService
     ) {
         // Initialisation de la liste de fusion
         this.merge = [];
         // Initialisation de la liste de marqueurs
         this.flags = ["grey","blue","orange","red"];
         // Initialisation de la liste de nouveaux commentaires
         this.input = [];
         // Aucun devoir sélectionné au départ pour les marqueurs
         this.selectedDevoir=new Devoir();
         // Aucun devoit sélectionné au départ pour les commentaires
         this.selectedComm=new Devoir();
         // Initialisation du formulaire de recherche
         this.searchForm = new FormGroup({
             'term': new Control()
         });
         this.filtres = [];
         this.selectedFiltres = [];
     }

     ngOnInit() {
         // DEBUG
         // TODO naviguer vers un query param this._router.navigate(['/cdt', { filter: 'test' }]);
         // Normalement les vérifications que les variables existent avant d'arriver ici évitent la présence de ces lignes
         window.localStorage.setItem("devoirs", JSON.stringify(DEVOIRS));
         window.localStorage.setItem("pendDEL", JSON.stringify([]));
         window.localStorage.setItem("pendDELc", JSON.stringify([]));
         window.localStorage.setItem("pendALERT", JSON.stringify([]));
         window.localStorage.setItem("pendDO", JSON.stringify([]));
         window.localStorage.setItem("pendFLAG", JSON.stringify([]));
         window.localStorage.setItem("pendCOMM", JSON.stringify([]));
         window.localStorage.setItem("pendMERGE", JSON.stringify([]));
         // DEBUG

         this.user = this._user.getUser();

         this.sub = this._route
             .params
             .subscribe(params => this.filtre=(params['filter'])
           );

         this.searchForm.valueChanges
             .debounceTime(600)
             .distinctUntilChanged()
             .subscribe(term => this.refresh());

         this.filtre= "";

         // DEBUG
         console.log("* CdtController *");
         // TODO Vérifier si les variables (devoirs, archives, user, pending) sont dispo et si l'user est logged via un CanActivate
         this.refresh();
         // TODO Pour le moment la SYNC est toujours effective donc la synchro ecrase tout le temps les données...
         // On configure une synchronisation automatique régulière (ms)
         // this.interval = IntervalObservable.create(1000).subscribe((t) => this.sync()); // DEBUG
     }

     ngOnDestroy() {
         this.sub.unsubscribe();
         //this.interval.unsubscribe(); // DEBUG
     }

     private refresh():void {
         this.devoirs = this.getDevoirs();
         this.recalcSections();
     }
     /**
      * Synchronise les devoirs, si lea SYNC est effective : on remplace les devoirs du template par les nouveaux
      */
     private sync():void {
         var th = this;
         this._sync.do().then(
             function(str:String) {
                 th.refresh();
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
      * Récupère les devoirs du local Storage
      */
     public getDevoirs():Devoir[] {
         return this._parse.parse(this.type);
     }
     /**
      * Recalcule les sections à partir du tableau de devoirs du component
      * ATTENTION : On suppose que les devoirs sont déjà triés par date et classés par matière
      * @return {Section[]}
      */
     private recalcSections():void {
         console.log("SECTIONS");
         var devoirs = this.filtrage(this.devoirs);
         var filtres_name:string[] = [];
         var filtres_count:number[] = [];
         this.flags_count = Array.apply(null, Array(this.flags.length)).map(Number.prototype.valueOf,0);
         // Retour
         var sections:Section[] = [];
         // Variables pour la boucle
         var section:Section = new Section();
         var lastDate:Date = new Date();
         var premier:boolean=true;
         // Pour chaque devoir...
         devoirs.forEach(function (devoir) {
             // Compte les flags
             this.flags_count[devoir.flag]++;
             // Enregistre les filtres appliquables
             if (filtres_name.indexOf(devoir.matiere)<0) {
                 filtres_name.push(devoir.matiere);
                 filtres_count[filtres_name.indexOf(devoir.matiere)]=1;
             }
             else
                 filtres_count[filtres_name.indexOf(devoir.matiere)]++;
             // Si la date (jour) du devoir est différente de celle du précédent...
             if (devoir.date.toDateString()!=lastDate.toDateString()) {
                 // ...S'il s'agit du premier élément...
                 if (premier) {
                     // ...alors le prochain ne sera plus le premier !
                     premier = false;
                 } else { // Sinon...
                     // ...On ajoute la section en cours au retour
                     sections.push(section);
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
         // On créé les filtres appliquables
         if (this.filtre==""&&this.filtre_texte=="") {
             this.filtres=[];
             filtres_name.forEach(
                 function (name:string, index:number) {
                     this.filtres.push({
                         "label": "#" + name + " (" + filtres_count[index] + ")",
                         "value": "#" + name
                     });
                 }, this
             );
         }
         // Et on renvoi les sections !
         this.sections = sections;
     }
     /**
      * Applique un filtre aux devoirs s'il y a eu lieu
      * Remarque :
      * @return Devoir[]
      */
     private filtrage(devoirs:Devoir[]):Devoir[] {
         var filtre_full =
             (this.filtre_texte.length>2 ? this.filtre_texte : "") +
             (this.filtre_texte.length>2&&this.filtre.length>2 ? "&&" : "") +
             (this.filtre.length>2 ? this.filtre : "");
         if (filtre_full.length<2) {
             this.selectedFiltres = [];
             return devoirs;
         }
         else {
             console.log("FILTREDEVOIRS"); // DEBUG
             // Devoirs renvoyés
             var retour:Devoir[] = [];
             // On récupère les conditions "ET"
             let filtresET:string[] = filtre_full.trim().split("&&");
             // Trouve le premier tableau non vide
             let nonvide:number = 0;
             let premier:boolean = true;
             // Pour chaque condition "ET"
             for (let i:number = 0; i<filtresET.length; i++) {
                 // On récupère les conditions "OU"
                 let filtresOU:string[] = filtresET[i].trim().split("||");
                 // Sélection des devoirs pour ce groupement "ET"
                 let retourTEMP:Devoir[] = [];
                 // Pour chaque condition "OU"
                 for (let j:number = 0; j < filtresET[i].length; j++) {
                     if (filtresOU[j]!=null && filtresOU[j] != "") {
                         nonvide++;
                         // On récupère le type de filtrage
                         let type:string = filtresOU[j].substr(0,1);
                         let search:string = filtresOU[j].substr(1);
                         // Pour chaque devoir
                         for (let k:number = 0; k < devoirs.length; k++) {
                             // On teste s'il correspond à la condition selon le type de filtre
                             // Si le devoir répond à la condition (selon le type de filtre)
                             if (
                                 (type == "@" && devoirs[k].auteur.toLowerCase().match("^" + search.toLowerCase())) ||
                                 (type == "#" && devoirs[k].matiere.toLowerCase().match("^" + search.toLowerCase())) ||
                                 (type == "?" && devoirs[k].date.toLocaleDateString() == search) ||
                                 (type == ":" && devoirs[k].flag == this.flags.indexOf(search)) ||
                                 (type == "-" && devoirs[k].fait.toString() == search) ||
                                 (devoirs[k].texte.toLowerCase().match(filtresOU[j].toLowerCase()))
                             ) {
                                 // En évitant les doublons, on l'ajoute aux résultats retournés de la sous condition en cours
                                 if (retourTEMP.indexOf(devoirs[k]) < 0) {
                                     retourTEMP.push(devoirs[k]);
                                 }
                                 // Pour parfaire l'affichage, on met à jour les filtres appliqués
                                 if (type == "#" && this.selectedFiltres.indexOf(filtresOU[j]) < 0)
                                     this.selectedFiltres.push(filtresOU[j]);
                             }
                         }
                     }
                 }
                 // A ce stade tous les devoirs répondant à au moins une condition du groupe "OU"
                 // sont ajoutés au tableau retourTEMP (sans doublon)
                 // Ajout au tableau de retour final
                 // S'il s'agit du premier tour, on copie tout simplement le contenu
                 if (premier&&nonvide>0) {
                     premier=false;
                     retour = retourTEMP.slice();
                 }
                 // Sinon, on supprime les éléments qui ne sont pas présents dans les deux
                 else if(retourTEMP.length>0) {
                     let length:number = retour.length;
                     let todelete:Devoir[] =[];
                     for (let l:number=0;l<length;l++) {
                         let et:boolean = false;
                         for (let k:number = 0;!et&&k<retourTEMP.length;k++)
                             if (retour[l]==retourTEMP[k])
                                 et = true;
                         if (!et)
                             todelete.push(retour[l]);
                     }
                     for (let k:number=0;k<todelete.length;k++)
                         retour.splice(retour.indexOf(todelete[k]),1);
                 } else if (nonvide>0) {
                     retour = [];
                 }
             }
             return retour;
         }
     }

     public filtr(filtre:string) {
         this.filtre=filtre;
         this.refresh();
     }
     public clear_filtr():void {
         this.selectedFiltres=[];
         this.filtre="";
         this.filtre_texte="";
         this.refresh();
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
         this.selectedComm=devoir;
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
         this.selectedComm=devoir;
         this.pend("COMM", {"id":devoir.id,"content":commentaire});
         this.input[index]="";
     }

     /* DEBUG : unused
     private unselect():void {
         this.selectedComm = new Devoir();
     }
     */

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
         // Rafraichi l'affichage
         this.refresh();
     }
 }