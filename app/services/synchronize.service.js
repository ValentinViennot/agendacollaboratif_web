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
var http_1 = require('@angular/http');
var mock_1 = require('../mock');
var SyncService = (function () {
    function SyncService(http) {
        this.http = http;
    }
    /**
     * Envoi les requêtes vers le serveur et récupère les nouvelles données
     * @return Promise<string> Resolve si la synchro a été effective, Reject sinon
     */
    SyncService.prototype.do = function () {
        // On commence par envoyer les requêtes en attente
        return this.sendPending()
            .then(this.getDevoirs, function (result) {
            return Promise.reject(result);
        });
    };
    // TODO Requete POST et APIS
    /**
     * Envoi des requêtes locales (DO, ADD, DEL) vers le serveur
     * En cas de succès les requêtes sont effacées du stockage navigateur
     * En cas d'échec elles y restent jusqu'à la prochaine synchro réussie
     * @return Resolve si pas d'action nécessaire ou si requêtes bien envoyées, Reject pour tout autre cas
     */
    SyncService.prototype.sendPending = function () {
        /* DEBUG
       console.log("* Envoi des requêtes locales *");
       // On vérifie la connexion à Internet
       if (navigator.onLine) {
           // On vérifie la présence des variables dans le stockage local
           if (
               window.localStorage.getItem("user")
               && window.localStorage.getItem("pendingDO")
               && window.localStorage.getItem("pendingADD")
               && window.localStorage.getItem("pendingDEL")
           ) {
               // On récupère l'objet utilisateur pour la clé de sécurité
               var user = JSON.parse(window.localStorage.getItem("user"));
               // On stocke temporairement les pending list
               var do_op = JSON.parse(window.localStorage.getItem("pendingDO"));
               var add_op = JSON.parse(window.localStorage.getItem("pendingADD"));
               var del_op = JSON.parse(window.localStorage.getItem("pendingDEL"));
               // S'il y a des opérations à faire
               if (do_op.length + add_op.length + del_op.length > 0) {
                   // On vide les pending list (opérations en attente) du local storage (navigateur)
                   // pour éviter les doublons si une deuxième synchro se déclenchait
                   window.localStorage.setItem("pendingDEL", JSON.stringify([]));
                   window.localStorage.setItem("pendingADD", JSON.stringify([]));
                   window.localStorage.setItem("pendingDO", JSON.stringify([]));
                   // Préparons les données de la requête
                   var data = [{
                       "auth": user.auth, // Pour authentifier l'utilisateur sur le serveur
                       "do": do_op, // Devoirs à marquer comme faits
                       "add": add_op, // Ajouts en attente
                       "del": del_op // Suppressions en attente
                   }];
                   // On effectue la requête
                   var headers = new Headers({'Content-Type': 'application/json'});
                   var options = new RequestOptions({headers: headers});
                   th.http.post('http://apis.groupesix.xyz/pending/', JSON.stringify(data), options)
                       .toPromise()
                       .then(
                           // En cas de succès de la requête
                           function () {
                               return Promise.resolve("SYNC DONE");
                           }
                       )
                       .catch(
                           // En cas d'échec du post des pending list
                           function (response:any) {
                               // On remet les opérations non effectuées au local storage
                               window.localStorage.setItem("pendingDEL", JSON.stringify(del_op));
                               window.localStorage.setItem("pendingADD", JSON.stringify(add_op));
                               window.localStorage.setItem("pendingDO", JSON.stringify(do_op));
                               // On traite l'erreur
                               return this.handleError(response);
                           }
                       );
               } else {
                   return Promise.resolve("SYNC INFO - Pas d'opération en attente");
               }
           } else {
               return Promise.reject("SYNC ERR! - Il manque des variables au stockage local");
           }
       }
       else {
           return Promise.reject("SYNC ERR! - Pas de connexion Internet");
       }
       */
        return Promise.resolve("DEBUG - Pending 'envoyees'"); // DEBUG
    };
    // TODO Requete Devoirs & penser au hash de version (reject si pas besoin de sync)
    /**
     * Réupère les devoirs et tâches depuis le serveur seulement si la version locale est différente de celle du serveur
     * @return {Promise<string>} Resolve si des devoirs ont été récupérés correctement, Reject sinon
     */
    SyncService.prototype.getDevoirs = function () {
        /*
         // On récupère les devoirs depuis le serveur
         $http.post('http://apis.groupesix.xyz/devoirs/', {"auth":user.auth})
         .then(
         // En cas de succès
         function (response: any) {
         // On enregistre les nouveaux devoirs au local storage
         window.localStorage.setItem("devoirs", JSON.stringify(response.data));
         // On termine la Synchro avec succès !
         defer.resolve("Opérations effectuées et données récupérées du serveur !");
         },
         function () {
         defer.reject("Opérations non effectuées et données non récupérées...");
         }
         );
         */
        window.localStorage.setItem("devoirs", JSON.stringify(mock_1.DEVOIRS));
        return Promise.resolve("DEBUG - Devoirs écrits au local storage"); // DEBUG
    };
    // TODO Regarder les codes d'erreur et gérer les cas depuis les APIS + notifications ici
    /**
     * Gestion des erreurs HTTP
     * @param error
     * @returns {Promise<void>|Promise<T>}
     */
    SyncService.prototype.handleError = function (error) {
        var msg = "SYNC ERR! - ";
        switch (error.status) {
            case 401:
                msg += "Authentification non valide !";
                break;
        }
        return Promise.reject(msg);
    };
    // TODO Requete Archives & appeler seulement au début, une fois
    SyncService.prototype.getArchives = function () {
        window.localStorage.setItem("archives", JSON.stringify(mock_1.ARCHIVES)); // DEBUG
    };
    SyncService.prototype.getUser = function () {
        var USER = {
            "id": 1,
            "auth": "46edb1262452d1cbe659601c43a7eb2c",
            "nom": "Viennot",
            "prenom": "Valentin",
            "mail": "tinodu78@gmail.com",
            "notifs": 2,
            "push": true
        };
        return USER; // DEBUG
    };
    SyncService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SyncService);
    return SyncService;
}());
exports.SyncService = SyncService;
//# sourceMappingURL=synchronize.service.js.map