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
var primeng_1 = require('../../vendor/primeng/primeng');
var synchronize_service_1 = require("../services/synchronize.service");
var date_service_1 = require("../services/date.service");
var parse_service_1 = require("../services/parse.service");
var notification_service_1 = require("../services/notification.service");
var tri_service_1 = require("../services/tri.service");
var CdtComponent = (function () {
    function CdtComponent(_sync, _date, _parse, _notif, _tri) {
        this._sync = _sync;
        this._date = _date;
        this._parse = _parse;
        this._notif = _notif;
        this._tri = _tri;
        // Archives ou Devoirs
        this.type = "devoirs";
        this.merge = [];
    }
    CdtComponent.prototype.ngOnInit = function () {
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
    };
    // Méthodes internes, pour le Component
    /**
     * Synchronise les devoirs, si lea SYNC est effective : on remplace les devoirs du template par les nouveaux
     */
    CdtComponent.prototype.sync = function () {
        var th = this;
        this._sync.do().then(function (str) {
            // Si la synchronisation a été effective, on remplace les devoirs de la template par les nouveaux
            th.devoirs = th.getDevoirs();
            // Sans oublier de recalculer les sections !
            th.recalcSections();
            // DEBUG
            console.log(str);
        }, function (str) {
            // DEBUG
            console.log(str);
        });
    };
    /**
     * Récupère les devoirs du local storage
     * @return {any}
     */
    CdtComponent.prototype.getDevoirs = function () {
        console.log("GETDEVOIRS"); // DEBUG TODO Optimisation de l'appel (nb occurences)
        return this._parse.parse(this.type);
    };
    /**
     * Récupère les tâches de l'utilisateur du local storage
     * @return {any}
     */
    CdtComponent.prototype.getTaches = function () {
        console.log("GETTACHES"); // DEBUG TODO Optimisation de l'appel (nb occurences)
        return this._parse.parse("taches");
    };
    /**
     * Recalcule les sections à partir du tableau de devoirs du component
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
        // Pour chaque devoir...
        this.devoirs.forEach(function (devoir) {
            // Si la date (jour) du devoir est différente de celle du précédent...
            if (devoir.date.toDateString() != lastDate.toDateString()) {
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
            else if (premier) {
                premier = false;
                section = null;
                section = {
                    "titre": devoir.date.getDate().toString(),
                    "sous_titre": "Ajd.",
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
    /**
     * Remplace les sections du template par les sections recalculées
     */
    CdtComponent.prototype.recalcSections = function () {
        console.log("RECALCSECTIONS"); // DEBUG
        this.sections = this.getSections();
    };
    CdtComponent.prototype.taskdone = function (devoir) {
        // Tache déjà marquée comme faite grâce au binding
        // Ecrase le localstorage
        window.localStorage.setItem("taches", JSON.stringify(this.taches));
        var matches = false;
        this.devoirs.forEach(function (value) {
            if (value.id == devoir.id) {
                this.done(value);
                matches = true;
            }
        }, this);
        if (!matches) {
            // Ajout l'opération à la liste d'attente
            var pending_1 = JSON.parse(window.localStorage.getItem("pendingDO"));
            // Les opérations seront traitées successivement par le serveur qui reproduira l'action de l'utilisateur
            pending_1.push(devoir.id);
            window.localStorage.setItem("pendingDO", JSON.stringify(pending_1));
            // Lance une synchro
            this.sync();
        }
    };
    CdtComponent.prototype.done = function (devoir) {
        // On change l'état du devoir
        devoir.fait = !devoir.fait;
        // On met à jour le nombre de "marqué comme fait"
        if (devoir.fait)
            var increment = +1;
        else
            var increment = -1;
        this.devoirs[(this.devoirs).indexOf(devoir)].nb_fait += increment;
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
    };
    /**
     * Ajoute un devoir à la liste de "merge"
     * @param devoir
     */
    CdtComponent.prototype.addToMerge = function (devoir) {
        var faisable = true;
        var raison = "";
        // Si la liste d'attente est vide, il n'y a pas de risque
        if (this.merge.length > 0) {
            // Sinon il faut vérifier que le "merge" est faisable
            // Tant que c'est faisable, on cherche un conflit
            var i = 0;
            while (faisable && i < this.merge.length) {
                // S'ils sont les même
                if (devoir.id == this.merge[i].id) {
                    faisable = false;
                    raison = "autre";
                }
                else if (devoir.matiere != this.merge[i].matiere) {
                    faisable = false;
                    raison = "de la même matière";
                }
                else if (devoir.date.valueOf() != this.merge[i].date.valueOf()) {
                    faisable = false;
                    raison = "pour la même date";
                }
                i++;
            }
        }
        if (faisable)
            this.merge.push(devoir);
        else
            this._notif.add(2, "Impossible de fusionner", "Etant donné les devoirs déjà en attente de fusion celui ci ne peut être ajouté.\n" +
                "Choisis en un " + raison + " ou vide la liste de fusion.");
    };
    CdtComponent.prototype.clearMerge = function () {
        this.merge = [];
    };
    /**
     * Signale le devoir comme indésirable
     * @param devoir
     */
    CdtComponent.prototype.signaler = function (devoir) {
        // On ajoute l'ID du devoir à la liste d'attente des signalements
        var pending = JSON.parse(window.localStorage.getItem("pendingALERT"));
        pending.push(devoir.id);
        window.localStorage.setItem("pendingALERT", JSON.stringify(pending));
        // Lance une synchronisation
        this.sync();
        // Notifie l'utilisateur
        this._notif.add(1, "Devoir signalé !", "Un modérateur l'examinera prochainement. S'il n'est pas conforme à nos règles d'utilisation il sera supprimé et son auteur sanctionné, votre identité ne sera jamais dévoilée au cours du processus.");
    };
    /**
     * Suppression d'un devoir
     * @param devoir à supprimer
     */
    CdtComponent.prototype.supprimer = function (devoir) {
        var th = this;
        this._notif.ask("Confirmation", "La suppression est définitive. Plus aucun utilisateur n'aura accès à ce devoir.", "Confirmer", "Annuler")
            .then(function () {
            // Supprimer de devoirs[]
            th.devoirs.splice((th.devoirs).indexOf(devoir), 1);
            // On actualise l'affichage
            th.recalcSections();
            // Ecrase localstorage
            window.localStorage.setItem("devoirs", JSON.stringify(th.devoirs));
            // Ajoute l'opération à la liste d'attente du suppression de devoirs
            var pending = JSON.parse(window.localStorage.getItem("pendingDEL"));
            pending.push(devoir.id);
            window.localStorage.setItem("pendingDEL", JSON.stringify(pending));
            // Lance une synchronisation
            th.sync();
            // Notifie l'utilisateur
            th._notif.add(0, "Effectué.", "Le devoir a été supprimé de l'agenda !");
        });
    };
    /**
     * Supprime le commentaire
     * @param devoir devoir auquel appartient ce commentaire
     * @param commentaire à supprimer
     */
    CdtComponent.prototype.supprimer_comm = function (devoir, commentaire) {
        // On supprime le commentaire du devoir concerné
        devoir.commentaires.splice((devoir.commentaires).indexOf(commentaire), 1);
        // On actualise l'affichage
        this.recalcSections();
        // Ecrase localstorage
        window.localStorage.setItem("devoirs", JSON.stringify(this.devoirs));
        // Ajoute l'opération à la liste d'attente du suppression de commentaires
        var pending = JSON.parse(window.localStorage.getItem("pendingDELc"));
        pending.push(commentaire.id);
        window.localStorage.setItem("pendingDELc", JSON.stringify(pending));
        // Lance une synchronisation
        this.sync();
    };
    CdtComponent.prototype.addToMine = function (devoir) {
        // Ajoute le devoir aux taches en cours
        this.taches.push(devoir);
        // Tri le tableau de taches
        this.taches = this._tri.devoirs_date(this.taches);
        // Ecrase localstorage
        window.localStorage.setItem("taches", JSON.stringify(this.taches));
        // Ajoute l'opération à la liste d'attente du suppression de commentaires
        var pending = JSON.parse(window.localStorage.getItem("pendingTASK"));
        pending.push(devoir.id);
        window.localStorage.setItem("pendingTASK", JSON.stringify(pending));
        // Lance une synchronisation
        this.sync();
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
                primeng_1.Header,
                primeng_1.Button,
                primeng_1.Checkbox
            ],
            providers: [
                synchronize_service_1.SyncService,
                date_service_1.DateService,
                parse_service_1.ParseService,
                tri_service_1.TriService
            ]
        }), 
        __metadata('design:paramtypes', [synchronize_service_1.SyncService, date_service_1.DateService, parse_service_1.ParseService, notification_service_1.NotificationService, tri_service_1.TriService])
    ], CdtComponent);
    return CdtComponent;
}());
exports.CdtComponent = CdtComponent;
//# sourceMappingURL=cdt.component.js.map