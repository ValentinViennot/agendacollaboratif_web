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
var splitbutton_1 = require('../../../components/splitbutton/splitbutton');
var splitbuttonitem_1 = require('../../../components/splitbutton/splitbuttonitem');
var growl_1 = require('../../../components/growl/growl');
var router_1 = require('@angular/router');
var SplitButtonDemo = (function () {
    function SplitButtonDemo() {
        this.msgs = [];
    }
    SplitButtonDemo.prototype.save = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Success', detail: 'Data Saved' });
    };
    SplitButtonDemo.prototype.update = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Success', detail: 'Data Updated' });
    };
    SplitButtonDemo.prototype.delete = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Success', detail: 'Data Deleted' });
    };
    SplitButtonDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/splitbutton/splitbuttondemo.html',
            directives: [splitbutton_1.SplitButton, splitbuttonitem_1.SplitButtonItem, growl_1.Growl, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], SplitButtonDemo);
    return SplitButtonDemo;
}());
exports.SplitButtonDemo = SplitButtonDemo;
//# sourceMappingURL=splitbuttondemo.js.map