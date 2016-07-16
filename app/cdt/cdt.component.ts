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

 // TODO Imports minimaux (voir setup PrimeNG)
 import {Panel, SplitButtonItem, SplitButton, Tooltip, AccordionTab, Accordion, Header} from 'primeng/primeng';

 import { SyncService } from "../services/synchronize.service";
 import { DevoirsService } from "./devoirs.service";
 import {User} from "../concepts/user";
 import {Section} from "./section";
 import {Devoir} from "../concepts/devoir";
 import {Commentaire} from "../concepts/commentaire";

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
         DevoirsService
     ]
 })
 export class CdtComponent implements OnInit {

     type:string = "devoirs";
     sections: Section[];
     user: User;
     commentaires: Commentaire[];
     active_com:number;
     display:boolean;
     ajd_texte: string;

     constructor(
         private _sync: SyncService,
         private _devoirs: DevoirsService
     ) {
         this.commentaires = [];
         this.active_com = 0;
         this.display =false; // DEBUG
     }

     ngOnInit() {
         console.log("* cdtController *");
         // TODO Vérifier si les variables sont dispo et si l'user est logged via CanActivate
         // On récupère les infos de l'utilisateur
         this.user = this._sync.getUser();
         // On récupère les devoirs du stockage local
         this.sections = this._devoirs.getDevoirs(this.type);
         // On synchronise les devoirs
         this.sync();

         this.ajd_texte = "15/07";
         // DEBUG
         // On configure une synchronisation automatique régulière (ms)
         // DEBUG IntervalObservable.create(1000).subscribe((t) => this.sync());
     }

     private sync():void {
         var th = this;
         this._sync.do().then(
             function(str:String) {
                 // Si la synchronisation a été effective, on remplace les devoirs de la template par les nouveaux
                 th.sections = th._devoirs.getDevoirs(th.type); // TODO
                 console.log(str);
             },
             function(str:String) {
                 console.log(str);
             }
         );
     }

     public done(devoir:Devoir):void {
         // TODO
     }

     public addToMerge(devoir:Devoir):void {
         // TODO
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

     public modifier(devoir:Devoir):void {
         // TODO
     }

     public addToMine(devoir:Devoir):void {
         // TODO
     }

     public openComms(devoir: Devoir) {
         this.commentaires = devoir.commentaires;
         this.active_com = devoir.id;
         this.display = true;
     }
 }