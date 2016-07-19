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
 * Created by Valentin on 16/07/2016.
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
var core_1 = require("@angular/core");
var DateService = (function () {
    function DateService() {
        this.today = new Date();
    }
    DateService.prototype.getDay = function (date) {
        var day = "ERREUR";
        switch (date.getDay()) {
            case 0:
                day = "Dimanche";
                break;
            case 1:
                day = "Lundi";
                break;
            case 2:
                day = "Mardi";
                break;
            case 3:
                day = "Mercredi";
                break;
            case 4:
                day = "Jeudi";
                break;
            case 5:
                day = "Vendredi";
                break;
            case 6:
                day = "Samedi";
                break;
        }
        return day;
    };
    DateService.prototype.getDayTiny = function (date) {
        return this.getDay(date).substr(0, 3) + "."; // TODO
    };
    DateService.prototype.recentDateTime = function (date) {
        if (date.toDateString() == this.today.toDateString()) {
            return date.toLocaleTimeString().substr(0, 5);
        }
        else {
            return date.toLocaleDateString();
        }
    };
    DateService.prototype.jjmm = function (date) {
        return date.toLocaleDateString().substr(0, 5);
    };
    DateService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DateService);
    return DateService;
}());
exports.DateService = DateService;
//# sourceMappingURL=date.service.js.map