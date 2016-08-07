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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
// Affichage des notifications
var growl_1 = require("../components/growl/growl");
// Gestion des notifications
var notification_service_1 = require("./services/notification.service");
// Gestion de l'utilisateur
var user_service_1 = require("./services/user.service");
var AppComponent = (function () {
    function AppComponent(_notif, _user) {
        this._notif = _notif;
        this._user = _user;
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'body',
            templateUrl: "app/app.html",
            directives: [
                router_1.ROUTER_DIRECTIVES,
                growl_1.Growl
            ],
            providers: [
                notification_service_1.NotificationService,
                user_service_1.UserService
            ]
        }), 
        __metadata('design:paramtypes', [notification_service_1.NotificationService, user_service_1.UserService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map