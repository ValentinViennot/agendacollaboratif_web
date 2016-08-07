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
var treetable_1 = require('../../../components/treetable/treetable');
var column_1 = require('../../../components/column/column');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabview_1 = require('../../../components/tabview/tabview');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var nodeservice_1 = require('../service/nodeservice');
var growl_1 = require('../../../components/growl/growl');
var common_1 = require('../../../components/common');
var TreeTableDemo = (function () {
    function TreeTableDemo(nodeService) {
        this.nodeService = nodeService;
    }
    TreeTableDemo.prototype.ngOnInit = function () {
        var _this = this;
        this.nodeService.getFilesystem().then(function (files) { return _this.files = files; });
        this.nodeService.getLazyFilesystem().then(function (files) { return _this.lazyFiles = files; });
    };
    TreeTableDemo.prototype.nodeSelect = function (event) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Node Selected', detail: event.node.data.name });
    };
    TreeTableDemo.prototype.nodeUnselect = function (event) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Node Unselected', detail: event.node.data.name });
    };
    TreeTableDemo.prototype.nodeExpand = function (event) {
        if (event.node) {
            //in a real application, make a call to a remote url to load children of the current node and add the new nodes as children
            this.nodeService.getLazyFilesystem().then(function (nodes) { return event.node.children = nodes; });
        }
    };
    TreeTableDemo = __decorate([
        core_1.Component({
            templateUrl: 'showcase/demo/treetable/treetabledemo.html',
            directives: [treetable_1.TreeTable, column_1.Column, tabview_1.TabView, growl_1.Growl, tabpanel_1.TabPanel, common_1.Header, codehighlighter_1.CodeHighlighter, router_1.ROUTER_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS, nodeservice_1.NodeService]
        }), 
        __metadata('design:paramtypes', [nodeservice_1.NodeService])
    ], TreeTableDemo);
    return TreeTableDemo;
}());
exports.TreeTableDemo = TreeTableDemo;
//# sourceMappingURL=treetabledemo.js.map