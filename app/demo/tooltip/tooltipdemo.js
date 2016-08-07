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
var tabview_1 = require('../../../components/tabview/tabview');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var tooltip_1 = require('../../../components/tooltip/tooltip');
var inputtext_1 = require('../../../components/inputtext/inputtext');
var router_1 = require('@angular/router');
var TooltipDemo = (function () {
    function TooltipDemo() {
    }
    TooltipDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/tooltip/tooltipdemo.html',
            directives: [codehighlighter_1.CodeHighlighter, tooltip_1.Tooltip, inputtext_1.InputText, tabpanel_1.TabPanel, tabview_1.TabView, router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], TooltipDemo);
    return TooltipDemo;
}());
exports.TooltipDemo = TooltipDemo;
//# sourceMappingURL=tooltipdemo.js.map