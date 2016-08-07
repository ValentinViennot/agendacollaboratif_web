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
var galleria_1 = require('../../../components/galleria/galleria');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var router_1 = require('@angular/router');
var GalleriaDemo = (function () {
    function GalleriaDemo() {
        this.images = [];
        this.images.push({ source: 'showcase/resources/demo/images/galleria/galleria1.jpg', alt: 'Description for Image 1', title: 'Title 1' });
        this.images.push({ source: 'showcase/resources/demo/images/galleria/galleria2.jpg', alt: 'Description for Image 2', title: 'Title 2' });
        this.images.push({ source: 'showcase/resources/demo/images/galleria/galleria3.jpg', alt: 'Description for Image 3', title: 'Title 3' });
        this.images.push({ source: 'showcase/resources/demo/images/galleria/galleria4.jpg', alt: 'Description for Image 4', title: 'Title 4' });
        this.images.push({ source: 'showcase/resources/demo/images/galleria/galleria5.jpg', alt: 'Description for Image 5', title: 'Title 5' });
        this.images.push({ source: 'showcase/resources/demo/images/galleria/galleria6.jpg', alt: 'Description for Image 6', title: 'Title 6' });
        this.images.push({ source: 'showcase/resources/demo/images/galleria/galleria7.jpg', alt: 'Description for Image 7', title: 'Title 7' });
        this.images.push({ source: 'showcase/resources/demo/images/galleria/galleria8.jpg', alt: 'Description for Image 8', title: 'Title 8' });
        this.images.push({ source: 'showcase/resources/demo/images/galleria/galleria9.jpg', alt: 'Description for Image 9', title: 'Title 9' });
        this.images.push({ source: 'showcase/resources/demo/images/galleria/galleria10.jpg', alt: 'Description for Image 10', title: 'Title 10' });
        this.images.push({ source: 'showcase/resources/demo/images/galleria/galleria11.jpg', alt: 'Description for Image 11', title: 'Title 11' });
        this.images.push({ source: 'showcase/resources/demo/images/galleria/galleria12.jpg', alt: 'Description for Image 12', title: 'Title 12' });
    }
    GalleriaDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/galleria/galleriademo.html',
            directives: [galleria_1.Galleria, tabview_1.TabView, tabpanel_1.TabPanel, codehighlighter_1.CodeHighlighter, router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], GalleriaDemo);
    return GalleriaDemo;
}());
exports.GalleriaDemo = GalleriaDemo;
//# sourceMappingURL=galleriademo.js.map