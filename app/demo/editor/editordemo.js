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
var editor_1 = require('../../../components/editor/editor');
var common_1 = require('../../../components/common');
var button_1 = require('../../../components/button/button');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var router_1 = require('@angular/router');
var EditorDemo = (function () {
    function EditorDemo() {
        this.text1 = '<div>Hello World!</div><div>PrimeNG <b>Editor</b> Rocks</div><div><br></div>';
    }
    EditorDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/editor/editordemo.html',
            directives: [editor_1.Editor, common_1.Header, button_1.Button, tabview_1.TabView, tabpanel_1.TabPanel, codehighlighter_1.CodeHighlighter, router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], EditorDemo);
    return EditorDemo;
}());
exports.EditorDemo = EditorDemo;
//# sourceMappingURL=editordemo.js.map