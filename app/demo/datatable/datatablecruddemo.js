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
var datatable_1 = require('../../../components/datatable/datatable');
var button_1 = require('../../../components/button/button');
var inputtext_1 = require('../../../components/inputtext/inputtext');
var dialog_1 = require('../../../components/dialog/dialog');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var column_1 = require('../../../components/column/column');
var datatablesubmenu_component_1 = require('./datatablesubmenu.component');
var carservice_1 = require('../service/carservice');
var common_1 = require('../../../components/common');
var common_2 = require('../../../components/common');
var DataTableCrudDemo = (function () {
    function DataTableCrudDemo(carService) {
        this.carService = carService;
        this.car = new PrimeCar();
    }
    DataTableCrudDemo.prototype.ngOnInit = function () {
        var _this = this;
        this.carService.getCarsSmall().then(function (cars) { return _this.cars = cars; });
    };
    DataTableCrudDemo.prototype.showDialogToAdd = function () {
        this.newCar = true;
        this.car = new PrimeCar();
        this.displayDialog = true;
    };
    DataTableCrudDemo.prototype.save = function () {
        if (this.newCar)
            this.cars.push(this.car);
        else
            this.cars[this.findSelectedCarIndex()] = this.car;
        this.car = null;
        this.displayDialog = false;
    };
    DataTableCrudDemo.prototype.delete = function () {
        this.cars.splice(this.findSelectedCarIndex(), 1);
        this.car = null;
        this.displayDialog = false;
    };
    DataTableCrudDemo.prototype.onRowSelect = function (event) {
        this.newCar = false;
        this.car = this.cloneCar(event.data);
        this.displayDialog = true;
    };
    DataTableCrudDemo.prototype.cloneCar = function (c) {
        var car = new PrimeCar();
        for (var prop in c) {
            car[prop] = c[prop];
        }
        return car;
    };
    DataTableCrudDemo.prototype.findSelectedCarIndex = function () {
        return this.cars.indexOf(this.selectedCar);
    };
    DataTableCrudDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/datatable/datatablecruddemo.html',
            directives: [datatable_1.DataTable, column_1.Column, datatablesubmenu_component_1.DataTableSubmenu, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, common_1.Header, common_2.Footer, dialog_1.Dialog, button_1.Button, inputtext_1.InputText, router_1.ROUTER_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS, carservice_1.CarService],
            styles: ["\n        .ui-grid-row div {\n          padding: 4px 10px\n        }\n        \n        .ui-grid-row div label {\n          font-weight: bold;\n        }\n  "]
        }), 
        __metadata('design:paramtypes', [carservice_1.CarService])
    ], DataTableCrudDemo);
    return DataTableCrudDemo;
}());
exports.DataTableCrudDemo = DataTableCrudDemo;
var PrimeCar = (function () {
    function PrimeCar(vin, year, brand, color) {
        this.vin = vin;
        this.year = year;
        this.brand = brand;
        this.color = color;
    }
    return PrimeCar;
}());
//# sourceMappingURL=datatablecruddemo.js.map