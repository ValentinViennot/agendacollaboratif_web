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
var router_1 = require('@angular/router');
var cdt_component_1 = require('./cdt/cdt.component');
var group_component_1 = require("./group/group.component");
var user_component_1 = require("./user/user.component");
exports.routes = [
    {
        path: 'cdt',
        component: cdt_component_1.CdtComponent
    },
    {
        path: 'group',
        component: group_component_1.GroupComponent
    },
    {
        path: 'user',
        component: user_component_1.UserComponent
    },
    {
        path: '',
        redirectTo: '/cdt',
        pathMatch: 'prefix'
    },
    { path: '**', redirectTo: '/cdt' }
];
// Authentification https://angular.io/docs/ts/latest/guide/router.html : can activate
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(exports.routes)
];
//# sourceMappingURL=app.routes.js.map