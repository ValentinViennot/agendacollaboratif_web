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
var tabview_1 = require('../../../components/tabview/tabview');
var codehighlighter_1 = require('../../../components/codehighlighter/codehighlighter');
var tabpanel_1 = require('../../../components/tabview/tabpanel');
var router_1 = require('@angular/router');
var CodeHighlighterDemo = (function () {
    function CodeHighlighterDemo() {
        this.clicks = 0;
    }
    CodeHighlighterDemo.prototype.count = function () {
        this.clicks++;
    };
    CodeHighlighterDemo = __decorate([
        core_1.Component({
            template: "\n        <div class=\"ContentSideSections\">\n            <div class=\"Content100 overHidden TextShadow\">\n                <span class=\"fontSize30 TextShadow orange mediumFont marginBottom20 dispBlock\">CodeHighlighter</span>\n                <span class=\"defaultText dispTable\">CodeHighlighter is an attribute directive to highlight code blocks using PrismJS</span>\n            </div>\n        </div>\n\n        <div class=\"ContentSideSections Implementation\">\n            <h3 class=\"first\">CSS</h3>\n<pre>\n<code class=\"language-css\" pCode>\n.ui-datatable table {\n\tborder-collapse:collapse;\n    width: 100%;\n    table-layout: fixed;\n}\n</code>\n</pre>\n            \n            <h3>HTML</h3>\n<pre>\n<code class=\"language-markup\" pCode>\n&lt;div id=\"pm\" style=\"width:300px\"&gt;\n    &lt;div&gt;\n        &lt;div&gt;&lt;a data-icon=\"fa-file-o\"&gt;File&lt;/a&gt;&lt;/div&gt;\n        &lt;div&gt;\n            &lt;ul&gt;\n                &lt;li&gt;&lt;a data-icon=\"fa-plus\"&gt;New&lt;/a&gt;\n                    &lt;ul&gt;\n                        &lt;li&gt;&lt;a&gt;Project&lt;/a&gt;&lt;/li&gt;\n                        &lt;li&gt;&lt;a&gt;Other&lt;/a&gt;&lt;/li&gt;\n                    &lt;/ul&gt;\n                &lt;/li&gt;\n                &lt;li&gt;&lt;a&gt;Open&lt;/a&gt;&lt;/li&gt;\n                &lt;li&gt;&lt;a&gt;Quit&lt;/a&gt;&lt;/li&gt;\n            &lt;/ul&gt;\n        &lt;/div&gt;\n    &lt;/div&gt;\n&lt;/div&gt;\n</code>\n</pre>\n            \n            <h3>Javascript</h3>\n<pre>\n<code class=\"language-javascript\" pCode>\nvar map;\nfunction initMap() {\n  map = new google.maps.Map(document.getElementById('map'), {\n    center: {lat: -34.397, lng: 150.644},\n    zoom: 8\n  });\n}\n</code>\n</pre>\n\n            <h3>Typescript</h3>\n<pre>\n<code class=\"language-typescript\" pCode>\nimport {Directive, ElementRef, OnInit} from '@angular/core';\n\ndeclare var Prism: any;\n\n@Directive({\n    selector: '[pCode]'\n})\nexport class CodeHighlighter implements OnInit {\n        \n    constructor(private el: ElementRef) {}\n    \n    ngOnInit() {\n        Prism.highlightElement(this.el.nativeElement);\n    }\n}\n</code>\n</pre>\n        </div>\n\n        <div class=\"ContentSideSections Source\">\n            <p-tabView effect=\"fade\">\n                <p-tabPanel header=\"Documentation\">\n                            <h3>Import</h3>\n<pre>\n<code class=\"language-typescript\" pCode>\nimport {CodeHighlighter} from 'primeng/primeng';\n</code>\n</pre>\n\n                    <h3>Getting Started</h3>\n                    <p>CodeHighlighter is applied to a code element with [pCode] directive. The &lt;code&gt; should have\n                    a style class having language- prefix to specify the language to highlight. See Prismjs docs for the list of available languages.\n                    An example block with css code would be as follows.</p>\n                    \n<pre>\n<code class=\"language-markup\" pCode>\n&lt;pre&gt;\n&lt;code class=\"language-css\" pCode&gt;\n.ui-datatable table {\n\tborder-collapse:collapse;\n    width: 100%;\n    table-layout: fixed;\n}\n&lt;/code&gt;\n&lt;/pre&gt;\n</code>\n</pre>                        \n                    <h3>Dependencies</h3>\n                    <p>Prismjs</p>\n                </p-tabPanel>\n             </p-tabView>\n        </div>\n    ",
            directives: [codehighlighter_1.CodeHighlighter, tabpanel_1.TabPanel, tabview_1.TabView, router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], CodeHighlighterDemo);
    return CodeHighlighterDemo;
}());
exports.CodeHighlighterDemo = CodeHighlighterDemo;
//# sourceMappingURL=codehighlighterdemo.js.map