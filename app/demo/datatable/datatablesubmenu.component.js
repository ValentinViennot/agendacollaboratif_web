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
var DataTableSubmenu = (function () {
    function DataTableSubmenu() {
    }
    DataTableSubmenu = __decorate([
        core_1.Component({
            selector: 'datatable-demos',
            template: "\n        <div id=\"datatable-submenu\" class=\"ContentSideSections SubSubMenu ui-helper-clearfix\">\n            <ul>\n                <li><a [routerLink]=\"['/datatable']\">&#9679; Basic</a></li>\n                <li><a [routerLink]=\"['/datatablefacets']\">&#9679; Facets</a></li>\n                <li><a [routerLink]=\"['/datatabletemplating']\">&#9679; Templating</a></li>\n                <li><a [routerLink]=\"['/datatablegroup']\">&#9679; Group</a></li>\n                <li><a [routerLink]=\"['/datatablepaginator']\">&#9679; Paginator</a></li>\n                <li><a [routerLink]=\"['/datatablesort']\">&#9679; Sort</a></li>\n                <li><a [routerLink]=\"['/datatablefilter']\">&#9679; Filter</a></li>\n                <li><a [routerLink]=\"['/datatableselection']\">&#9679; Selection</a></li>\n                <li><a [routerLink]=\"['/datatableeditable']\">&#9679; Editable</a></li>\n                <li><a [routerLink]=\"['/datatablerowexpansion']\">&#9679; Expand</a></li>\n                <li><a [routerLink]=\"['/datatablecolresize']\">&#9679; Resize</a></li>\n                <li><a [routerLink]=\"['/datatablecolreorder']\">&#9679; Reorder</a></li>\n                <li><a [routerLink]=\"['/datatablescroll']\">&#9679; Scroll</a></li>\n                <li><a [routerLink]=\"['/datatablelazy']\">&#9679; Lazy</a></li>\n                <li><a [routerLink]=\"['/datatablecontextmenu']\">&#9679; ContextMenu</a></li>\n                <li><a [routerLink]=\"['/datatablecoltoggler']\">&#9679; ColToggler</a></li>\n                <li><a [routerLink]=\"['/datatableresponsive']\">&#9679; Responsive</a></li>\n                <li><a [routerLink]=\"['/datatablecrud']\">&#9679; Crud</a></li>\n                <li><a [routerLink]=\"['/datatableexport']\">&#9679; Export</a></li>\n            </ul>\n        </div>\n    ",
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], DataTableSubmenu);
    return DataTableSubmenu;
}());
exports.DataTableSubmenu = DataTableSubmenu;
//# sourceMappingURL=datatablesubmenu.component.js.map