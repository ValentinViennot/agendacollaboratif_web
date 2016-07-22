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
var synchronize_service_1 = require("../services/synchronize.service");
var date_service_1 = require("../services/date.service");
var parse_service_1 = require("../services/parse.service");
var notification_service_1 = require("../services/notification.service");
var mock_1 = require("../mock");
var splitbutton_1 = require("../../vendor/primeng/components/splitbutton/splitbutton");
var splitbuttonitem_1 = require("../../vendor/primeng/components/splitbutton/splitbuttonitem");
var panel_1 = require("../../vendor/primeng/components/panel/panel");
var accordion_1 = require("../../vendor/primeng/components/accordion/accordion");
var accordiontab_1 = require("../../vendor/primeng/components/accordion/accordiontab");
var checkbox_1 = require("../../vendor/primeng/components/checkbox/checkbox");
var button_1 = require("../../vendor/primeng/components/button/button");
var overlaypanel_1 = require("../../vendor/primeng/components/overlaypanel/overlaypanel");
var tooltip_1 = require("../../vendor/primeng/components/tooltip/tooltip");
var common_1 = require("../../vendor/primeng/components/common");
var inputtextarea_1 = require("../../vendor/primeng/components/inputtextarea/inputtextarea");
var CdtComponent = (function () {
    function CdtComponent(_sync, _date, _parse, _notif) {
        this._sync = _sync;
        this._date = _date;
        this._parse = _parse;
        this._notif = _notif;
        // Archives ou Devoirs
        this.type = "devoirs";
        this.merge = [];
        this.flags = ["grey", "blue", "orange", "red"];
        this.input = [];
    }
    CdtComponent.prototype.ngOnInit = function () {
        // DEBUG
        // Normalement les vérifications que les variables existent avant d'arriver ici évitent la présence de ces lignes
        this.sync();
        window.localStorage.setItem("devoirs", JSON.stringify(mock_1.DEVOIRS));
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
        if (!premier)
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
    CdtComponent.prototype.done = function (devoir) {
        // On change l'état du devoir
        devoir.fait = !devoir.fait;
        // On met à jour le nombre de "marqué comme fait"
        if (devoir.fait)
            var increment = +1;
        else
            var increment = -1;
        this.devoirs[(this.devoirs).indexOf(devoir)].nb_fait += increment;
        // Ajoute à la liste d'actions en attente
        this.pend("DO", { "id": devoir.id, "done": devoir.fait });
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
    CdtComponent.prototype.doMerge = function () {
        var ids = [];
        for (var i = 0; i < this.merge.length; i++)
            ids[i] = this.merge[i].id;
        this.pend("MERGE", ids);
        this._notif.add(0, "Fusion préparée", "La demande de fusion pour ces " + this.merge.length + " devoirs sera bientôt transmise au serveur, à la prochaine synchronisation les anciens devoirs seront remplacés par le résultat de cette fusion !");
        this.merge = [];
    };
    /**
     * Signale le devoir comme indésirable
     * @param devoir
     */
    CdtComponent.prototype.signaler = function (devoir) {
        // On ajoute l'ID du devoir à la liste d'attente des signalements
        this.pend("ALERT", devoir.id);
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
            // Ajout à la liste de suppression de devoirs
            th.pend("DEL", devoir.id);
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
        // On ajoute l'opération en liste d'attente
        this.pend("DELc", commentaire.id);
    };
    CdtComponent.prototype.sendComment = function (devoir, input, index) {
        // Création du commentaire
        var commentaire = {
            "id": 0,
            "user": this.user.id,
            "auteur": this.user.prenom + this.user.nom,
            "date": new Date(),
            "texte": input
        };
        // On ajoute le commentaire au devoir
        devoir.commentaires.splice(0, 0, commentaire);
        // Ajout à la liste d'attente
        this.pend("COMM", { "id": devoir.id, "content": commentaire });
        this.input[index] = "";
    };
    CdtComponent.prototype.selectDevoir = function (event, devoir, overlaypanel) {
        this.selectedDevoir = devoir;
        overlaypanel.toggle(event);
    };
    CdtComponent.prototype.getFlags = function () {
        var retour = [];
        for (var i = 0; i < this.flags.length; i++)
            if (i != this.selectedDevoir.flag)
                retour.push(i);
        return retour;
    };
    CdtComponent.prototype.setFlag = function (flag, overlaypanel) {
        this.selectedDevoir.flag = flag;
        this.pend("FLAG", { "id": this.selectedDevoir.id, "flag": flag });
        overlaypanel.hide();
    };
    CdtComponent.prototype.pend = function (list, push) {
        // Ecrase localstorage
        window.localStorage.setItem("devoirs", JSON.stringify(this.devoirs));
        // Ajoute l'opération à la liste d'attente du suppression de commentaires
        var pending = JSON.parse(window.localStorage.getItem("pend" + list));
        pending.push(push);
        window.localStorage.setItem("pend" + list, JSON.stringify(pending));
        // Lance une synchronisation
        this.sync();
    };
    CdtComponent = __decorate([
        core_1.Component({
            selector: 'my-cdt',
            templateUrl: 'app/cdt/cdt.html',
            directives: [
                splitbutton_1.SplitButton,
                splitbuttonitem_1.SplitButtonItem,
                panel_1.Panel,
                accordion_1.Accordion,
                accordiontab_1.AccordionTab,
                checkbox_1.Checkbox,
                button_1.Button,
                overlaypanel_1.OverlayPanel,
                tooltip_1.Tooltip,
                common_1.Header,
                inputtextarea_1.InputTextarea
            ],
            providers: [
                synchronize_service_1.SyncService,
                date_service_1.DateService,
                parse_service_1.ParseService
            ]
        }), 
        __metadata('design:paramtypes', [synchronize_service_1.SyncService, date_service_1.DateService, parse_service_1.ParseService, notification_service_1.NotificationService])
    ], CdtComponent);
    return CdtComponent;
}());
exports.CdtComponent = CdtComponent;
//# sourceMappingURL=cdt.component.js.map