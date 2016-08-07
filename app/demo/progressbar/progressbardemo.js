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
var messages_1 = require('../../../components/messages/messages');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var progressbar_1 = require('../../../components/progressbar/progressbar');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var growl_1 = require('../../../components/growl/growl');
var router_1 = require('@angular/router');
var ProgressBarDemo = (function () {
    function ProgressBarDemo() {
        this.value = 0;
    }
    ProgressBarDemo.prototype.ngOnInit = function () {
        var _this = this;
        var interval = setInterval(function () {
            _this.value = _this.value + Math.floor(Math.random() * 10) + 1;
            if (_this.value >= 100) {
                _this.value = 100;
                _this.msgs = [{ severity: 'info', summary: 'Success', detail: 'Process Completed' }];
                clearInterval(interval);
            }
        }, 2000);
    };
    ProgressBarDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/progressbar/progressbardemo.html',
            directives: [messages_1.Messages, tabpanel_1.TabPanel, tabview_1.TabView, progressbar_1.ProgressBar, codehighlighter_1.CodeHighlighter, router_1.ROUTER_DIRECTIVES, growl_1.Growl]
        }), 
        __metadata('design:paramtypes', [])
    ], ProgressBarDemo);
    return ProgressBarDemo;
}());
exports.ProgressBarDemo = ProgressBarDemo;
//# sourceMappingURL=progressbardemo.js.map