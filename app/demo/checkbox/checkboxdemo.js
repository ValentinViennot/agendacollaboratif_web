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
var checkbox_1 = require('../../../components/checkbox/checkbox');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var router_1 = require('@angular/router');
var CheckboxDemo = (function () {
    function CheckboxDemo() {
        this.selectedCities = [];
        this.selectedCategories = ['Technology', 'Sports'];
        this.checked = false;
    }
    CheckboxDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/checkbox/checkboxdemo.html',
            styles: ["\n        .ui-grid .ui-grid-col-1,\n        .ui-grid .ui-grid-col-11 {\n            padding: 4px 10px;\n        }\n\n        .ui-grid label {\n            display: block;\n            margin: 2px 0 0 4px;\n        }\n    "],
            directives: [checkbox_1.Checkbox, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], CheckboxDemo);
    return CheckboxDemo;
}());
exports.CheckboxDemo = CheckboxDemo;
//# sourceMappingURL=checkboxdemo.js.map