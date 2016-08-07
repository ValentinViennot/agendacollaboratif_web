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
var DataScrollerSubMenu = (function () {
    function DataScrollerSubMenu() {
    }
    DataScrollerSubMenu = __decorate([
        core_1.Component({
            selector: 'datascroller-demos',
            template: "\n        <div id=\"datatable-submenu\" class=\"ContentSideSections SubSubMenu ui-helper-clearfix\">\n            <ul>\n                <li><a [routerLink]=\"['/datascroller']\">&#9679; Window</a></li>\n                <li><a [routerLink]=\"['/datascrollerinline']\">&#9679; Inline</a></li>\n                <li><a [routerLink]=\"['/datascrollerloader']\">&#9679; Loader</a></li>\n                <li><a [routerLink]=\"['/datascrollerinfinite']\">&#9679; Infinite</a></li>\n            </ul>\n        </div>\n    ",
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], DataScrollerSubMenu);
    return DataScrollerSubMenu;
}());
exports.DataScrollerSubMenu = DataScrollerSubMenu;
//# sourceMappingURL=datascrollersubmenu.js.map