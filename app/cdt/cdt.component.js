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
var core_1 = require('@angular/core');
// TODO Imports directives mini (cf setup PrimeNG)
var primeng_1 = require('primeng/primeng');
var synchronize_service_1 = require("../services/synchronize.service");
var date_service_1 = require("../services/date.service");
var parse_service_1 = require("../services/parse.service");
var CdtComponent = (function () {
    function CdtComponent(_sync, _date, _parse) {
        this._sync = _sync;
        this._date = _date;
        this._parse = _parse;
        // Archives ou Devoirs
        this.type = "devoirs";
    }
    CdtComponent.prototype.ngOnInit = function () {
        console.log("* cdtController *");
        this.sync(); // DEBUG (Login -> _sync.then ( navigate to CDT ) )
        // TODO Vérifier si les variables sont dispo et si l'user est logged via un CanActivate
        // On récupère les infos de l'utilisateur
        this.user = this._sync.getUser();
        // On récupère les devoirs du stockage local
        this.sections = this.getSections();
        // On synchronise les devoirs
        this.sync(); // DEBUG : Remplacer par tache reguliere
        this.ajd_texte = "15/07"; // DEBUG ?
        // DEBUG
        // On configure une synchronisation automatique régulière (ms)
        // DEBUG IntervalObservable.create(1000).subscribe((t) => this.sync());
    };
    CdtComponent.prototype.sync = function () {
        var th = this;
        this._sync.do().then(function (str) {
            // Si la synchronisation a été effective, on remplace les devoirs de la template par les nouveaux
            th.sections = th.getSections();
            console.log(str);
        }, function (str) {
            console.log(str);
        });
    };
    CdtComponent.prototype.getDevoirs = function () {
        console.log("GETDEVOIRS"); // DEBUG TODO Optimisation de l'appel (nb occurences)
        return this._parse.parse(this.type);
    };
    /**
     * ATTENTION : On suppose que les devoirs sont déjà triés par date et classés par matière
     * @return {Section[]}
     */
    CdtComponent.prototype.getSections = function () {
        // Retour
        var sections = [];
        // Variables pour la boucle
        var section;
        var lastDate = new Date();
        var premier = true;
        this.devoirs = this.getDevoirs();
        // Pour chaque devoir...
        this.devoirs.forEach(function (devoir, index, array) {
            // Si la date du devoir est différente de celle du précédent...
            if (devoir.date.getTime() != lastDate.getTime()) {
                // ...S'il s'agit du premier élément...
                if (premier) {
                    // ...alors le prochain ne sera plus le premier !
                    premier = false;
                }
                else {
                    // ...On ajoute la section en cours au retour
                    sections.push(section);
                    // On efface la section
                    section = null;
                }
                // On initialise une nouvelle section
                var day_num = devoir.date.getDate().toString();
                var day_texte = this._date.getDayTiny(devoir.date);
                section = {
                    "titre": day_num,
                    "sous_titre": day_texte,
                    "devoirs": []
                };
            }
            // On ajoute le devoir à la section en cours
            section.devoirs.push(devoir);
            // On remplace la "date du dernier devoir" par celle de celui en cours
            lastDate = devoir.date;
            // Puis on passe au suivant !
        }, this);
        // On ajoute la dernière section créée aux sections
        sections.push(section);
        // Et on renvoi les sections !
        return sections;
    };
    CdtComponent.prototype.done = function (devoir) {
        // TODO
    };
    CdtComponent.prototype.addToMerge = function (devoir) {
        // TODO
    };
    CdtComponent.prototype.signaler = function (devoir) {
        // TODO
    };
    CdtComponent.prototype.supprimer = function (devoir) {
        // TODO
    };
    CdtComponent.prototype.supprimer_comm = function (commentaire) {
        // TODO
    };
    CdtComponent.prototype.addToMine = function (devoir) {
        // TODO
    };
    CdtComponent = __decorate([
        core_1.Component({
            selector: 'my-cdt',
            templateUrl: 'app/cdt/cdt.html',
            directives: [
                primeng_1.Panel,
                primeng_1.SplitButton,
                primeng_1.SplitButtonItem,
                primeng_1.Tooltip,
                primeng_1.Accordion,
                primeng_1.AccordionTab,
                primeng_1.Header
            ],
            providers: [
                synchronize_service_1.SyncService,
                date_service_1.DateService,
                parse_service_1.ParseService
            ]
        }), 
        __metadata('design:paramtypes', [synchronize_service_1.SyncService, date_service_1.DateService, parse_service_1.ParseService])
    ], CdtComponent);
    return CdtComponent;
}());
exports.CdtComponent = CdtComponent;
//# sourceMappingURL=cdt.component.js.map