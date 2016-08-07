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
var http_1 = require('@angular/http');
var datagrid_1 = require('../../../components/datagrid/datagrid');
var common_1 = require('../../../components/common');
var common_2 = require('../../../components/common');
var panel_1 = require('../../../components/panel/panel');
var button_1 = require('../../../components/button/button');
var dialog_1 = require('../../../components/dialog/dialog');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var carservice_1 = require('../service/carservice');
var DataGridDemo = (function () {
    function DataGridDemo(carService) {
        this.carService = carService;
    }
    DataGridDemo.prototype.ngOnInit = function () {
        var _this = this;
        this.carService.getCarsLarge().then(function (cars) { return _this.cars = cars; });
    };
    DataGridDemo.prototype.selectCar = function (car) {
        this.selectedCar = car;
        this.displayDialog = true;
    };
    DataGridDemo.prototype.onDialogHide = function () {
        this.selectedCar = null;
    };
    DataGridDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/datagrid/datagriddemo.html',
            directives: [datagrid_1.DataGrid, common_1.Header, common_2.Footer, dialog_1.Dialog, panel_1.Panel, button_1.Button, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, router_1.ROUTER_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS, carservice_1.CarService]
        }), 
        __metadata('design:paramtypes', [carservice_1.CarService])
    ], DataGridDemo);
    return DataGridDemo;
}());
exports.DataGridDemo = DataGridDemo;
//# sourceMappingURL=datagriddemo.js.map