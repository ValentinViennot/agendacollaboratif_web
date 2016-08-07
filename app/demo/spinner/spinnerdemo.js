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
var spinner_1 = require('../../../components/spinner/spinner');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var button_1 = require('../../../components/button/button');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var router_1 = require('@angular/router');
var SpinnerDemo = (function () {
    function SpinnerDemo() {
        this.val4 = 100;
    }
    SpinnerDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/spinner/spinnerdemo.html',
            directives: [spinner_1.Spinner, button_1.Button, tabview_1.TabView, tabpanel_1.TabPanel, codehighlighter_1.CodeHighlighter, router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], SpinnerDemo);
    return SpinnerDemo;
}());
exports.SpinnerDemo = SpinnerDemo;
//# sourceMappingURL=spinnerdemo.js.map