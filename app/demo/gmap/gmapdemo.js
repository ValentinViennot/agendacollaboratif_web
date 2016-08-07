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
var gmap_1 = require('../../../components/gmap/gmap');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var button_1 = require('../../../components/button/button');
var dialog_1 = require('../../../components/dialog/dialog');
var growl_1 = require('../../../components/growl/growl');
var checkbox_1 = require('../../../components/checkbox/checkbox');
var inputtext_1 = require('../../../components/inputtext/inputtext');
var common_1 = require('../../../components/common');
var router_1 = require('@angular/router');
var GMapDemo = (function () {
    function GMapDemo() {
        this.msgs = [];
    }
    GMapDemo.prototype.ngOnInit = function () {
        this.options = {
            center: { lat: 36.890257, lng: 30.707417 },
            zoom: 12
        };
        this.initOverlays();
        this.infoWindow = new google.maps.InfoWindow();
    };
    GMapDemo.prototype.handleMapClick = function (event) {
        this.dialogVisible = true;
        this.selectedPosition = event.latLng;
    };
    GMapDemo.prototype.handleOverlayClick = function (event) {
        this.msgs = [];
        var isMarker = event.overlay.getTitle != undefined;
        if (isMarker) {
            var title = event.overlay.getTitle();
            this.infoWindow.setContent('<div>' + title + '</div>');
            this.infoWindow.open(event.map, event.overlay);
            event.map.setCenter(event.overlay.getPosition());
            this.msgs.push({ severity: 'info', summary: 'Marker Selected', detail: title });
        }
        else {
            this.msgs.push({ severity: 'info', summary: 'Shape Selected', detail: '' });
        }
    };
    GMapDemo.prototype.addMarker = function () {
        this.overlays.push(new google.maps.Marker({ position: { lat: this.selectedPosition.lat(), lng: this.selectedPosition.lng() }, title: this.markerTitle, draggable: this.draggable }));
        this.markerTitle = null;
        this.dialogVisible = false;
    };
    GMapDemo.prototype.handleDragEnd = function (event) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Marker Dragged', detail: event.overlay.getTitle() });
    };
    GMapDemo.prototype.initOverlays = function () {
        if (!this.overlays || !this.overlays.length) {
            this.overlays = [
                new google.maps.Marker({ position: { lat: 36.879466, lng: 30.667648 }, title: "Konyaalti" }),
                new google.maps.Marker({ position: { lat: 36.883707, lng: 30.689216 }, title: "Ataturk Park" }),
                new google.maps.Marker({ position: { lat: 36.885233, lng: 30.702323 }, title: "Oldtown" }),
                new google.maps.Polygon({ paths: [
                        { lat: 36.9177, lng: 30.7854 }, { lat: 36.8851, lng: 30.7802 }, { lat: 36.8829, lng: 30.8111 }, { lat: 36.9177, lng: 30.8159 }
                    ], strokeOpacity: 0.5, strokeWeight: 1, fillColor: '#1976D2', fillOpacity: 0.35
                }),
                new google.maps.Circle({ center: { lat: 36.90707, lng: 30.56533 }, fillColor: '#1976D2', fillOpacity: 0.35, strokeWeight: 1, radius: 1500 }),
                new google.maps.Polyline({ path: [{ lat: 36.86149, lng: 30.63743 }, { lat: 36.86341, lng: 30.72463 }], geodesic: true, strokeColor: '#FF0000', strokeOpacity: 0.5, strokeWeight: 2 })
            ];
        }
    };
    GMapDemo.prototype.zoomIn = function (map) {
        map.setZoom(map.getZoom() + 1);
    };
    GMapDemo.prototype.zoomOut = function (map) {
        map.setZoom(map.getZoom() - 1);
    };
    GMapDemo.prototype.clear = function () {
        this.overlays = [];
    };
    GMapDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/gmap/gmapdemo.html',
            directives: [gmap_1.GMap, tabpanel_1.TabPanel, tabview_1.TabView, button_1.Button, dialog_1.Dialog, inputtext_1.InputText, checkbox_1.Checkbox, growl_1.Growl, common_1.Footer, codehighlighter_1.CodeHighlighter, router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], GMapDemo);
    return GMapDemo;
}());
exports.GMapDemo = GMapDemo;
//# sourceMappingURL=gmapdemo.js.map