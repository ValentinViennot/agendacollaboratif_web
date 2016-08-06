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
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var synchronize_service_1 = require("../services/synchronize.service");
var breadcrumb_1 = require("../../vendor/primeng/components/breadcrumb/breadcrumb");
var datagrid_1 = require("../../vendor/primeng/components/datagrid/datagrid");
var panel_1 = require("../../vendor/primeng/components/panel/panel");
var button_1 = require("../../vendor/primeng/components/button/button");
var overlaypanel_1 = require("../../vendor/primeng/components/overlaypanel/overlaypanel");
var GroupComponent = (function () {
    function GroupComponent(_sync) {
        this._sync = _sync;
        // Nombre de couleurs pour les matières TODO
        this.COULEURS = 10;
        // Liste des couleurs
        this.tab = Array;
        this.path = [];
        this.groups = [];
    }
    GroupComponent.prototype.ngOnInit = function () {
        // groupe 0 (ROOT, ex : INSA)
        this.group = this._sync.getGroup(0);
        this.push(this.group);
        // Initialisation des groupes et matières root
        this.refresh();
    };
    GroupComponent.prototype.refresh = function () {
        console.log("REFRESH");
        this.groups = this._sync.getGroups(this.group.id);
    };
    GroupComponent.prototype.push = function (group) {
        this.path.push({ label: group.nom });
    };
    GroupComponent.prototype.changeGroup = function (group) {
        this.push(group);
        this.group = group;
        this.refresh();
    };
    GroupComponent.prototype.toParent = function () {
        if (this.path.length > 1) {
            this.path.splice(-1);
            this.group = this._sync.getGroup(this.group.parent);
            this.refresh();
        }
        else {
        }
    };
    GroupComponent.prototype.selectGroup = function (event, group, overlaypanel) {
        this.selectedGroup = group;
        overlaypanel.toggle(event);
    };
    /**
     *
     * @param index ID du groupe ou de la matière à rejoindre
     */
    GroupComponent.prototype.join = function (group) {
        // TODO Appel à l'api de jonction de groupe (et matière)
        this.refresh();
    };
    /**
     *
     * @param index ID du groupe ou de la matière à quitter
     */
    GroupComponent.prototype.quit = function (group) {
        // TODO Appel à l'api de jonction de groupe (et matière) (quitter)
        this.refresh();
    };
    GroupComponent = __decorate([
        core_1.Component({
            selector: 'agd-group',
            templateUrl: 'app/group/group.html',
            directives: [
                breadcrumb_1.Breadcrumb,
                datagrid_1.DataGrid,
                panel_1.Panel,
                button_1.Button,
                overlaypanel_1.OverlayPanel
            ],
            providers: [
                synchronize_service_1.SyncService
            ],
            pipes: []
        }), 
        __metadata('design:paramtypes', [synchronize_service_1.SyncService])
    ], GroupComponent);
    return GroupComponent;
}());
exports.GroupComponent = GroupComponent;
//# sourceMappingURL=group.component.js.map