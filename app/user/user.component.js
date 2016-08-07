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
var common_1 = require("@angular/common");
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/distinctUntilChanged');
var user_service_1 = require("../services/user.service");
var panel_1 = require("../../components/panel/panel");
var button_1 = require("../../components/button/button");
var inputtext_1 = require("../../components/inputtext/inputtext");
var tooltip_1 = require("../../components/tooltip/tooltip");
var togglebutton_1 = require("../../components/togglebutton/togglebutton");
var inputswitch_1 = require("../../components/inputswitch/inputswitch");
var UserComponent = (function () {
    // Constructeur (de services)
    function UserComponent(_user) {
        this._user = _user;
        this.changed = false;
        this.form = new common_1.Control();
    }
    // Initialisation
    UserComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("* UserController *");
        this.user = this._user.getUser();
        // DEBUG : Est appelé sans raison au chargement !
        this.form.valueChanges
            .debounceTime(600)
            .distinctUntilChanged()
            .subscribe(function (form) { return _this.changed = true; });
    };
    UserComponent.prototype.save = function () {
        this.changed = false;
    };
    UserComponent = __decorate([
        core_1.Component({
            selector: 'agd-user',
            templateUrl: 'app/user/user.html',
            directives: [
                panel_1.Panel,
                button_1.Button,
                inputtext_1.InputText,
                tooltip_1.Tooltip,
                togglebutton_1.ToggleButton,
                inputswitch_1.InputSwitch
            ],
            providers: [],
            pipes: []
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService])
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map