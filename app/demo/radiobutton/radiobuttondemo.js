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
var radiobutton_1 = require('../../../components/radiobutton/radiobutton');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var router_1 = require('@angular/router');
var RadioButtonDemo = (function () {
    function RadioButtonDemo() {
        this.val2 = 'Option 2';
    }
    RadioButtonDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/radiobutton/radiobuttondemo.html',
            styles: ["\n        .ui-grid label {\n            display: inline-block;\n            margin: 3px 0px 0px 4px;\n        }\n    "],
            directives: [radiobutton_1.RadioButton, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], RadioButtonDemo);
    return RadioButtonDemo;
}());
exports.RadioButtonDemo = RadioButtonDemo;
//# sourceMappingURL=radiobuttondemo.js.map