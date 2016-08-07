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
// TODO Améliorations, todos, DEBUG, relire code et erreurs, style
// Angular2 components
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var common_1 = require("@angular/common");
var forms_1 = require('@angular/forms');
// RXJS : Observables
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/distinctUntilChanged');
var section_1 = require("./section");
var devoir_1 = require("../concepts/devoir");
// Services persos
var synchronize_service_1 = require("../services/synchronize.service");
var date_service_1 = require("../services/date.service");
var parse_service_1 = require("../services/parse.service");
var notification_service_1 = require("../services/notification.service");
var user_service_1 = require("../services/user.service");
var linky_pipe_1 = require("../../node_modules/angular2-linky/linky-pipe");
// Prime UI / Prime NG directives
var splitbutton_1 = require("../../components/splitbutton/splitbutton");
var splitbuttonitem_1 = require("../../components/splitbutton/splitbuttonitem");
var panel_1 = require("../../components/panel/panel");
var accordion_1 = require("../../components/accordion/accordion");
var accordiontab_1 = require("../../components/accordion/accordiontab");
var checkbox_1 = require("../../components/checkbox/checkbox");
var button_1 = require("../../components/button/button");
var overlaypanel_1 = require("../../components/overlaypanel/overlaypanel");
var tooltip_1 = require("../../components/tooltip/tooltip");
var common_2 = require("../../components/common");
var inputtextarea_1 = require("../../components/inputtextarea/inputtextarea");
var inputtext_1 = require('../../components/inputtext/inputtext');
var selectbutton_1 = require("../../components/selectbutton/selectbutton");
// DEBUG
var mock_1 = require("../mock");
var CdtComponent = (function () {
    function CdtComponent(_sync, _date, _parse, _notif, _route, _user) {
        this._sync = _sync;
        this._date = _date;
        this._parse = _parse;
        this._notif = _notif;
        this._route = _route;
        this._user = _user;
        // Sélection de la source à afficher TODO par variable et par défaut ?
        this.type = "devoirs";
        this.filtre = "";
        this.filtre_texte = "";
        // Initialisation de la liste de fusion
        this.merge = [];
        // Initialisation de la liste de marqueurs
        this.flags = ["grey", "blue", "orange", "red"];
        // Initialisation de la liste de nouveaux commentaires
        this.input = [];
        // Aucun devoir sélectionné au départ pour les marqueurs
        this.selectedDevoir = new devoir_1.Devoir();
        // Aucun devoit sélectionné au départ pour les commentaires
        this.selectedComm = new devoir_1.Devoir();
        // Initialisation du formulaire de recherche
        this.searchForm = new forms_1.FormGroup({
            'term': new common_1.Control()
        });
        this.filtres = [];
        this.selectedFiltres = [];
    }
    CdtComponent.prototype.ngOnInit = function () {
        var _this = this;
        // DEBUG
        // TODO naviguer vers un query param this._router.navigate(['/cdt', { filter: 'test' }]);
        // Normalement les vérifications que les variables existent avant d'arriver ici évitent la présence de ces lignes
        window.localStorage.setItem("devoirs", JSON.stringify(mock_1.DEVOIRS));
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
            .subscribe(function (params) { return _this.filtre = (params['filter']); });
        this.searchForm.valueChanges
            .debounceTime(600)
            .distinctUntilChanged()
            .subscribe(function (term) { return _this.refresh(); });
        this.filtre = "";
        // DEBUG
        console.log("* CdtController *");
        // TODO Vérifier si les variables (devoirs, archives, user, pending) sont dispo et si l'user est logged via un CanActivate
        this.refresh();
        // TODO Pour le moment la SYNC est toujours effective donc la synchro ecrase tout le temps les données...
        // On configure une synchronisation automatique régulière (ms)
        // this.interval = IntervalObservable.create(1000).subscribe((t) => this.sync()); // DEBUG
    };
    CdtComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
        //this.interval.unsubscribe(); // DEBUG
    };
    CdtComponent.prototype.refresh = function () {
        this.devoirs = this.getDevoirs();
        this.recalcSections();
    };
    /**
     * Synchronise les devoirs, si lea SYNC est effective : on remplace les devoirs du template par les nouveaux
     */
    CdtComponent.prototype.sync = function () {
        var th = this;
        this._sync.do().then(function (str) {
            th.refresh();
            // DEBUG
            console.log(str);
        }, function (str) {
            // DEBUG
            console.log(str);
        });
    };
    /**
     * Récupère les devoirs du local Storage
     */
    CdtComponent.prototype.getDevoirs = function () {
        return this._parse.parse(this.type);
    };
    /**
     * Recalcule les sections à partir du tableau de devoirs du component
     * ATTENTION : On suppose que les devoirs sont déjà triés par date et classés par matière
     * @return {Section[]}
     */
    CdtComponent.prototype.recalcSections = function () {
        console.log("SECTIONS");
        var devoirs = this.filtrage(this.devoirs);
        var filtres_name = [];
        var filtres_count = [];
        this.flags_count = Array.apply(null, Array(this.flags.length)).map(Number.prototype.valueOf, 0);
        // Retour
        var sections = [];
        // Variables pour la boucle
        var section = new section_1.Section();
        var lastDate = new Date();
        var premier = true;
        // Pour chaque devoir...
        devoirs.forEach(function (devoir) {
            // Compte les flags
            this.flags_count[devoir.flag]++;
            // Enregistre les filtres appliquables
            if (filtres_name.indexOf(devoir.matiere) < 0) {
                filtres_name.push(devoir.matiere);
                filtres_count[filtres_name.indexOf(devoir.matiere)] = 1;
            }
            else
                filtres_count[filtres_name.indexOf(devoir.matiere)]++;
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
        // On créé les filtres appliquables
        if (this.filtre == "" && this.filtre_texte == "") {
            this.filtres = [];
            filtres_name.forEach(function (name, index) {
                this.filtres.push({
                    "label": "#" + name + " (" + filtres_count[index] + ")",
                    "value": "#" + name
                });
            }, this);
        }
        // Et on renvoi les sections !
        this.sections = sections;
    };
    /**
     * Applique un filtre aux devoirs s'il y a eu lieu
     * Remarque :
     * @return Devoir[]
     */
    CdtComponent.prototype.filtrage = function (devoirs) {
        var filtre_full = (this.filtre_texte.length > 2 ? this.filtre_texte : "") +
            (this.filtre_texte.length > 2 && this.filtre.length > 2 ? "&&" : "") +
            (this.filtre.length > 2 ? this.filtre : "");
        if (filtre_full.length < 2) {
            this.selectedFiltres = [];
            return devoirs;
        }
        else {
            console.log("FILTREDEVOIRS"); // DEBUG
            // Devoirs renvoyés
            var retour = [];
            // On récupère les conditions "ET"
            var filtresET = filtre_full.trim().split("&&");
            // Trouve le premier tableau non vide
            var nonvide = 0;
            var premier = true;
            // Pour chaque condition "ET"
            for (var i = 0; i < filtresET.length; i++) {
                // On récupère les conditions "OU"
                var filtresOU = filtresET[i].trim().split("||");
                // Sélection des devoirs pour ce groupement "ET"
                var retourTEMP = [];
                // Pour chaque condition "OU"
                for (var j = 0; j < filtresET[i].length; j++) {
                    if (filtresOU[j] != null && filtresOU[j] != "") {
                        nonvide++;
                        // On récupère le type de filtrage
                        var type = filtresOU[j].substr(0, 1);
                        var search = filtresOU[j].substr(1);
                        // Pour chaque devoir
                        for (var k = 0; k < devoirs.length; k++) {
                            // On teste s'il correspond à la condition selon le type de filtre
                            // Si le devoir répond à la condition (selon le type de filtre)
                            if ((type == "@" && devoirs[k].auteur.toLowerCase().match("^" + search.toLowerCase())) ||
                                (type == "#" && devoirs[k].matiere.toLowerCase().match("^" + search.toLowerCase())) ||
                                (type == "?" && devoirs[k].date.toLocaleDateString() == search) ||
                                (type == ":" && devoirs[k].flag == this.flags.indexOf(search)) ||
                                (type == "-" && devoirs[k].fait.toString() == search) ||
                                (devoirs[k].texte.toLowerCase().match(filtresOU[j].toLowerCase()))) {
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
                if (premier && nonvide > 0) {
                    premier = false;
                    retour = retourTEMP.slice();
                }
                else if (retourTEMP.length > 0) {
                    var length_1 = retour.length;
                    var todelete = [];
                    for (var l = 0; l < length_1; l++) {
                        var et = false;
                        for (var k = 0; !et && k < retourTEMP.length; k++)
                            if (retour[l] == retourTEMP[k])
                                et = true;
                        if (!et)
                            todelete.push(retour[l]);
                    }
                    for (var k = 0; k < todelete.length; k++)
                        retour.splice(retour.indexOf(todelete[k]), 1);
                }
                else if (nonvide > 0) {
                    retour = [];
                }
            }
            return retour;
        }
    };
    CdtComponent.prototype.filtr = function (filtre) {
        this.filtre = filtre;
        this.refresh();
    };
    CdtComponent.prototype.clear_filtr = function () {
        this.selectedFiltres = [];
        this.filtre = "";
        this.filtre_texte = "";
        this.refresh();
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
        this.selectedComm = devoir;
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
        this.selectedComm = devoir;
        this.pend("COMM", { "id": devoir.id, "content": commentaire });
        this.input[index] = "";
    };
    /* DEBUG : unused
    private unselect():void {
        this.selectedComm = new Devoir();
    }
    */
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
        // Rafraichi l'affichage
        this.refresh();
    };
    CdtComponent = __decorate([
        core_1.Component({
            selector: 'agd-cdt',
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
                common_2.Header,
                inputtextarea_1.InputTextarea,
                selectbutton_1.SelectButton,
                inputtext_1.InputText,
                forms_1.REACTIVE_FORM_DIRECTIVES
            ],
            providers: [
                synchronize_service_1.SyncService,
                date_service_1.DateService,
                parse_service_1.ParseService
            ],
            pipes: [
                linky_pipe_1.LinkyPipe
            ]
        }), 
        __metadata('design:paramtypes', [synchronize_service_1.SyncService, date_service_1.DateService, parse_service_1.ParseService, notification_service_1.NotificationService, router_1.ActivatedRoute, user_service_1.UserService])
    ], CdtComponent);
    return CdtComponent;
}());
exports.CdtComponent = CdtComponent;
//# sourceMappingURL=cdt.component.js.map