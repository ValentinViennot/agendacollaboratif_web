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
var tree_1 = require('../../../components/tree/tree');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var nodeservice_1 = require('../service/nodeservice');
var growl_1 = require('../../../components/growl/growl');
var contextmenu_1 = require('../../../components/contextmenu/contextmenu');
var TreeDemo = (function () {
    function TreeDemo(nodeService) {
        this.nodeService = nodeService;
    }
    TreeDemo.prototype.ngOnInit = function () {
        var _this = this;
        this.nodeService.getFiles().then(function (files) { return _this.files = files; });
        this.nodeService.getLazyFiles().then(function (files) { return _this.lazyFiles = files; });
        this.items = [
            { label: 'View', icon: 'fa-search', command: function (event) { return _this.viewFile(_this.selectedFile2); } },
            { label: 'Unselect', icon: 'fa-close', command: function (event) { return _this.unselectFile(); } }
        ];
    };
    TreeDemo.prototype.nodeSelect = function (event) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Node Selected', detail: event.node.label });
    };
    TreeDemo.prototype.nodeUnselect = function (event) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Node Unselected', detail: event.node.label });
    };
    TreeDemo.prototype.nodeExpand = function (event) {
        if (event.node) {
            //in a real application, make a call to a remote url to load children of the current node and add the new nodes as children
            this.nodeService.getLazyFiles().then(function (nodes) { return event.node.children = nodes; });
        }
    };
    TreeDemo.prototype.viewFile = function (file) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Node Selected with Right Click', detail: file.label });
    };
    TreeDemo.prototype.unselectFile = function () {
        this.selectedFile2 = null;
    };
    TreeDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/tree/treedemo.html',
            directives: [tree_1.Tree, tabview_1.TabView, growl_1.Growl, tabpanel_1.TabPanel, contextmenu_1.ContextMenu, codehighlighter_1.CodeHighlighter, router_1.ROUTER_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS, nodeservice_1.NodeService]
        }), 
        __metadata('design:paramtypes', [nodeservice_1.NodeService])
    ], TreeDemo);
    return TreeDemo;
}());
exports.TreeDemo = TreeDemo;
//# sourceMappingURL=treedemo.js.map