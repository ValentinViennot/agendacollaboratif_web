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
var lightbox_1 = require('../../../components/lightbox/lightbox');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var router_1 = require('@angular/router');
var LightboxDemo = (function () {
    function LightboxDemo() {
        this.images = [];
        this.images.push({ source: 'showcase/resources/demo/images/sopranos/sopranos1.jpg', thumbnail: 'showcase/resources/demo/images/sopranos/sopranos1_small.jpg', title: 'Sopranos 1' });
        this.images.push({ source: 'showcase/resources/demo/images/sopranos/sopranos2.jpg', thumbnail: 'showcase/resources/demo/images/sopranos/sopranos2_small.jpg', title: 'Sopranos 2' });
        this.images.push({ source: 'showcase/resources/demo/images/sopranos/sopranos3.jpg', thumbnail: 'showcase/resources/demo/images/sopranos/sopranos3_small.jpg', title: 'Sopranos 3' });
        this.images.push({ source: 'showcase/resources/demo/images/sopranos/sopranos4.jpg', thumbnail: 'showcase/resources/demo/images/sopranos/sopranos4_small.jpg', title: 'Sopranos 4' });
    }
    LightboxDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/lightbox/lightboxdemo.html',
            directives: [lightbox_1.Lightbox, tabview_1.TabView, tabpanel_1.TabPanel, codehighlighter_1.CodeHighlighter, router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], LightboxDemo);
    return LightboxDemo;
}());
exports.LightboxDemo = LightboxDemo;
//# sourceMappingURL=lightboxdemo.js.map