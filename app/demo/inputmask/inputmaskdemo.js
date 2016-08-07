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
var inputmask_1 = require('../../../components/inputmask/inputmask');
var inputtext_1 = require('../../../components/inputtext/inputtext');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var button_1 = require('../../../components/button/button');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var router_1 = require('@angular/router');
var InputMaskDemo = (function () {
    function InputMaskDemo() {
    }
    InputMaskDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/inputmask/inputmaskdemo.html',
            directives: [inputmask_1.InputMask, inputtext_1.InputText, button_1.Button, tabview_1.TabView, tabpanel_1.TabPanel, codehighlighter_1.CodeHighlighter, router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], InputMaskDemo);
    return InputMaskDemo;
}());
exports.InputMaskDemo = InputMaskDemo;
//# sourceMappingURL=inputmaskdemo.js.map