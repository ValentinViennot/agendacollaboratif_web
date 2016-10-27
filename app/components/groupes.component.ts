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

import {Component} from "@angular/core";
import {NotificationService} from "../services/notification.service";
import {SyncService} from "../services/sync.service";
import {ParseService} from "../services/parse.service";
import {User} from "../concepts/user";
import {Groupe} from "../concepts/groupe";
import {MenuItem} from "../../components/common/api";
import {OverlayPanel} from "../../components/overlaypanel/overlaypanel";
import {Router} from "@angular/router";

@Component({
    templateUrl: '/app/components/groupes.component.html',
    providers: [ParseService]
})
export class GroupesComponent {

    user:User;

    // Chemin d'accès au groupe en cours
    private path: MenuItem[];
    private pathGroups:Groupe[];
    // Groupes (et matières) dans le groupe actuel
    private groups:Groupe[];
    // Groupe actuel
    private group:Groupe;
    // Groupe sélectionné (choix couleur)
    private selectedGroup:Groupe;
    private newGroup:Groupe;

    constructor(
        private _notif:NotificationService,
        private _sync:SyncService,
        private _parse:ParseService,
        private router:Router
    ) {
        this.user = this._parse.parse("user");
        // Parcours parmi les dossiers (breadcrumb)
        this.path = [];
        // Historique de navigation
        this.pathGroups = [];
    }

    ngOnInit():void {
        console.log("* GroupController *");
        if (!navigator.onLine)
            this.router.navigate(['/']);
        // Récupère la version la plus récente de l'utilisateur
        this._sync.syncUser().then(
            result => this.user = this._parse.parse("user"),
            erreur => console.log(erreur)
        );
        this.init();
    }

    private init():void {
        // Initialisation de l'historique
        this.path = [];
        this.pathGroups = [];
        // Définition de la racine : Etape de départ de la navigation
        this.group = new Groupe();
        this.group.id = this.user.root;
        this.group.parentid = this.user.root;
        this.group.nom = "Racine";
        this.group.parent = "Racine";
        this.group.type = 2;
        // Définir la racine comme groupe actuel de la navigation
        this.push(this.group);
        // TODO delete Récupération des groupes et matières du groupe racine
        // this.refresh();
    }

    /**
     * Récupération des groupes et matières du groupe en cours
     */
    private refresh():void {
        this.groups = null;
        console.log("Chargement de "+this.group.nom+"("+this.group.id+") ...");
        this._sync.getGroups(this.group.id).then(
            groupes => this.groups = groupes,
            erreur => this._notif.add(2,'Erreur','Impossible de récupérer les groupes et matières ('+erreur+')')
        );
    }

    private push(group:Groupe) {
        this.group = group;
        var i = this.pathGroups.length;
        this.path.push({label:group.nom, command: () => {
            this.toGroup(i);
        }});
        this.pathGroups.push(group);
        this.refresh();
    }

    private back(prev:number):void {
        if (this.pathGroups.length>=prev) {
            // On retient le groupe qui va être affiché (precedent)
            var group:Groupe = this.pathGroups[this.pathGroups.length-prev];
            // On enlève à l'historique le groupe actuel et le précédent
            this.path.splice(-prev,prev);
            this.pathGroups.splice(-prev,prev);
            // On ajoute à l'historique le groupe précédent qui devient l'actuel
            this.push(group);
        } else console.log("trop court !");
    }

    public toParent() {
        if (this.pathGroups.length>1) {
            // On remonte le groupe actuel et le précédent
            this.back(2);
        } else {
            // S'il n'y a plus qu'un élément c'est qu'on est revenu à la racine
            this.init();
        }
    }

    /**
     *
     * @param index dans pathGroups
     */
    public toGroup(index:number) {
        this.back(this.pathGroups.length-index);
    }

    public selectGroup(event:any,group:Groupe, overlaypanel: OverlayPanel) {
        this.newGroup = null;
        this.selectedGroup = group;
        overlaypanel.toggle(event);
    }

    public preCreateGroup(event:any,overlaypanel: OverlayPanel, type:number) {
        this.selectedGroup = null;
        this.newGroup = new Groupe();
        this.newGroup.type = type;
        this.newGroup.parentid = this.group.id;
        this.newGroup.parent = this.group.nom;
        this.newGroup.isUser = true;
        overlaypanel.toggle(event);
    }

    public createGroup(event:any,overlaypanel: OverlayPanel) {
        var th:any = this;
        this._sync.newGroup(this.newGroup).then(
            function() {
                th.newGroup = null;
                overlaypanel.hide();
                th.refresh();
            },
            erreur => this._notif.add(2,'Erreur',erreur)
        );
    }

    /**
     * @param group à rejoindre
     */
    public join(group:Groupe):void {
        this._sync.joinCourse(group.id).then(
            result => this.refresh(),
            erreur => this._notif.add(2,'Erreur',erreur)
        );
    }

    /**
     *
     * @param group à quitter
     */
    public quit(group:Groupe):void {
        this._notif.ask('Confirmation','En quittant ce groupe tu quittes tous les groupes qu\'il contient et tu perds tes couleurs personnalisées. De plus, si plus personne n\'y est inscrit, il sera supprimé ainsi que tous les devoirs associés.','Compris !','Annuler')
            .then(
                oui => this._sync.quitCourse(group.id).then(
                    result => this.refresh(),
                    erreur => this._notif.add(2,'Erreur',erreur)
                ),
                non => console.log("non")
            );
    }

    public clickColor(color:string,a:number,b:number):void {
        console.log(color.substr(1));
        this._sync.setColor(this.selectedGroup.id,color.substr(1)).then(
            result => this.refresh(),
            erreur => this._notif.add(1,'Erreur',erreur)
        );
    }

    public mouseOverColor(str:string):void {
        //
    }
}