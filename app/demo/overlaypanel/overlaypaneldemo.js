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
var overlaypanel_1 = require('../../../components/overlaypanel/overlaypanel');
var button_1 = require('../../../components/button/button');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var datatable_1 = require('../../../components/datatable/datatable');
var column_1 = require('../../../components/column/column');
var carservice_1 = require('../service/carservice');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var OverlayPanelDemo = (function () {
    function OverlayPanelDemo(carService) {
        this.carService = carService;
    }
    OverlayPanelDemo.prototype.ngOnInit = function () {
        var _this = this;
        this.carService.getCarsSmall().then(function (cars) { return _this.cars1 = cars; });
        this.carService.getCarsSmall().then(function (cars) { return _this.cars2 = cars; });
    };
    OverlayPanelDemo.prototype.selectCar = function (event, car, overlaypanel) {
        this.selectedCar = car;
        overlaypanel.toggle(event);
    };
    OverlayPanelDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/overlaypanel/overlaypaneldemo.html',
            directives: [overlaypanel_1.OverlayPanel, datatable_1.DataTable, column_1.Column, button_1.Button, tabview_1.TabView, tabpanel_1.TabPanel, codehighlighter_1.CodeHighlighter, router_1.ROUTER_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS, carservice_1.CarService]
        }), 
        __metadata('design:paramtypes', [carservice_1.CarService])
    ], OverlayPanelDemo);
    return OverlayPanelDemo;
}());
exports.OverlayPanelDemo = OverlayPanelDemo;
//# sourceMappingURL=overlaypaneldemo.js.map