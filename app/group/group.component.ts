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
 * Created by Valentin on 29/07/2016.
 */

 import {Component, OnInit} from '@angular/core';
 import {Groupe} from "./groupe";
 import {SyncService} from "../services/synchronize.service";
 import {MenuItem} from "../../vendor/primeng/components/common";
 import {Breadcrumb} from "../../vendor/primeng/components/breadcrumb/breadcrumb";
 import {DataGrid} from "../../vendor/primeng/components/datagrid/datagrid";
 import {Panel} from "../../vendor/primeng/components/panel/panel";
 import {Button} from "../../vendor/primeng/components/button/button";
 import {OverlayPanel} from "../../vendor/primeng/components/overlaypanel/overlaypanel";


@Component({
 selector: 'agd-group',
 templateUrl: 'app/group/group.html',
 directives: [
     Breadcrumb,
     DataGrid,
     Panel,
     Button,
     OverlayPanel
 ],
 providers: [
     SyncService
 ],
 pipes : [
 ]
})
// TODO vérifier connexion avant accès, message en cas de perte de connexion
// TODO Loader en attendant données
export class GroupComponent implements OnInit {

    // Chemin d'accès au groupe en cours (index = numéro du groupe)
    private path: MenuItem[];
    // Groupes (et matières) dans le groupe actuel
    private groups:Groupe[];
    // Groupe actuel
    private group:Groupe;
    // Nombre de couleurs pour les matières TODO
    private COULEURS:number = 10;
    // Liste des couleurs
    private tab = Array;
    // Groupe sélectionné (choix couleur)
    private selectedGroup:Groupe;


    constructor (
        private _sync:SyncService
    ) {
        this.path = [];
        this.groups = [];
    }

    ngOnInit() {
        // groupe 0 (ROOT, ex : INSA)
        this.group = this._sync.getGroup(0);
        this.push(this.group);
        // Initialisation des groupes et matières root
        this.refresh();
    }

    private refresh():void {
        console.log("REFRESH");
        this.groups = this._sync.getGroups(this.group.id);
    }

    private push(group:Groupe) {
        this.path.push({label:group.nom});
    }

    public changeGroup(group:Groupe) {
        this.push(group);
        this.group=group;
        this.refresh();
    }

    public toParent() {
        if (this.path.length>1) {
            this.path.splice(-1);
            this.group = this._sync.getGroup(this.group.parent);
            this.refresh();
        } else {
            // TODO Notif
        }
    }

    public selectGroup(event:any,group:Groupe, overlaypanel: OverlayPanel) {
        this.selectedGroup = group;
        overlaypanel.toggle(event);
    }

     /**
      *
      * @param index ID du groupe ou de la matière à rejoindre
      */
    public join(group:Groupe):void {
        // TODO Appel à l'api de jonction de groupe (et matière)
         this.refresh();
    }

    /**
     *
     * @param index ID du groupe ou de la matière à quitter
     */
    public quit(group:Groupe):void {
        // TODO Appel à l'api de jonction de groupe (et matière) (quitter)
        this.refresh();
    }
}
