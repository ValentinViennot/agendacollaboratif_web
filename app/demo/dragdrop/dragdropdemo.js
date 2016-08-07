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
var draggable_1 = require('../../../components/dragdrop/draggable');
var droppable_1 = require('../../../components/dragdrop/droppable');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var button_1 = require('../../../components/button/button');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var panel_1 = require('../../../components/panel/panel');
var column_1 = require('../../../components/column/column');
var datatable_1 = require('../../../components/datatable/datatable');
var carservice_1 = require('../service/carservice');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var DragDropDemo = (function () {
    function DragDropDemo(carService) {
        this.carService = carService;
    }
    DragDropDemo.prototype.ngOnInit = function () {
        var _this = this;
        this.selectedCars = [];
        this.carService.getCarsSmall().then(function (cars) { return _this.availableCars = cars; });
    };
    DragDropDemo.prototype.dragStart = function (event, car) {
        this.draggedCar = car;
    };
    DragDropDemo.prototype.drop = function (event) {
        if (this.draggedCar) {
            this.selectedCars.push(this.draggedCar);
            this.availableCars.splice(this.findIndex(this.draggedCar), 1);
            this.draggedCar = null;
        }
    };
    DragDropDemo.prototype.dragEnd = function (event) {
        this.draggedCar = null;
    };
    DragDropDemo.prototype.findIndex = function (car) {
        var index = -1;
        for (var i = 0; i < this.availableCars.length; i++) {
            if (car.vin === this.availableCars[i].vin) {
                index = i;
                break;
            }
        }
        return index;
    };
    DragDropDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/dragdrop/dragdropdemo.html',
            directives: [draggable_1.Draggable, droppable_1.Droppable, button_1.Button, tabview_1.TabView, tabpanel_1.TabPanel, panel_1.Panel, column_1.Column, datatable_1.DataTable, codehighlighter_1.CodeHighlighter, router_1.ROUTER_DIRECTIVES],
            styles: ["\n        .ui-grid li {\n            list-style-type: none;\n            padding: 10px;\n            margin-bottom: 5px;\n        }\n    "],
            providers: [http_1.HTTP_PROVIDERS, carservice_1.CarService]
        }), 
        __metadata('design:paramtypes', [carservice_1.CarService])
    ], DragDropDemo);
    return DragDropDemo;
}());
exports.DragDropDemo = DragDropDemo;
//# sourceMappingURL=dragdropdemo.js.map