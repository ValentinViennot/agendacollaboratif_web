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
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var column_1 = require('../../../components/column/column');
var datatablesubmenu_component_1 = require('./datatablesubmenu.component');
var carservice_1 = require('../service/carservice');
var DataTableColReorderDemo = (function () {
    function DataTableColReorderDemo(carService) {
        this.carService = carService;
    }
    DataTableColReorderDemo.prototype.ngOnInit = function () {
        var _this = this;
        this.carService.getCarsSmall().then(function (cars) { return _this.cars = cars; });
    };
    DataTableColReorderDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/datatable/datatablecolreorderdemo.html',
            directives: [datatable_1.DataTable, column_1.Column, datatablesubmenu_component_1.DataTableSubmenu, tabpanel_1.TabPanel, tabview_1.TabView, codehighlighter_1.CodeHighlighter, router_1.ROUTER_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS, carservice_1.CarService]
        }), 
        __metadata('design:paramtypes', [carservice_1.CarService])
    ], DataTableColReorderDemo);
    return DataTableColReorderDemo;
}());
exports.DataTableColReorderDemo = DataTableColReorderDemo;
//# sourceMappingURL=datatablecolreorderdemo.js.map