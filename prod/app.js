webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/*
	   "l'Agenda Collaboratif"
	   Copyright (C)  2016  Valentin VIENNOT
	   Contact : vviennot@orange.fr

	   This program is free software: you can redistribute it and/or modify
	   it under the terms of the GNU General Public License as published by
	   the Free Software Foundation, either version 3 of the License, or
	   (at your option) any later version.
	   
	   You have to put a copy of this program's license into your project.

	   This program is distributed in the hope that it will be useful,
	   but WITHOUT ANY WARRANTY; without even the implied warranty of
	   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	   GNU General Public License for more details.
	   
	   FULL LICENSE FILE : https://github.com/misterw97/agendacollaboratif/edit/master/LICENSE
	*/
	var platform_browser_dynamic_1 = __webpack_require__(1);
	var core_1 = __webpack_require__(5);
	var app_component_1 = __webpack_require__(328);
	var app_routes_1 = __webpack_require__(385);
	var http_1 = __webpack_require__(436);
	var common_1 = __webpack_require__(2);
	var forms_1 = __webpack_require__(387);
	//enableProdMode();
	platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
	    app_routes_1.APP_ROUTER_PROVIDERS,
	    http_1.HTTP_PROVIDERS,
	    forms_1.disableDeprecatedForms(),
	    forms_1.provideForms(),
	    core_1.provide(common_1.LocationStrategy, { useClass: common_1.HashLocationStrategy })
	]);
	//# sourceMappingURL=boot.js.map

/***/ },

/***/ 328:
/***/ function(module, exports, __webpack_require__) {

	/*
	   "l'Agenda Collaboratif"
	   Copyright (C)  2016  Valentin VIENNOT
	   Contact : vviennot@orange.fr

	   This program is free software: you can redistribute it and/or modify
	   it under the terms of the GNU General Public License as published by
	   the Free Software Foundation, either version 3 of the License, or
	   (at your option) any later version.
	   
	   You have to put a copy of this program's license into your project.

	   This program is distributed in the hope that it will be useful,
	   but WITHOUT ANY WARRANTY; without even the implied warranty of
	   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	   GNU General Public License for more details.
	   
	   FULL LICENSE FILE : https://github.com/misterw97/agendacollaboratif/edit/master/LICENSE
	*/
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
	var core_1 = __webpack_require__(5);
	var router_1 = __webpack_require__(329);
	// Affichage des notifications
	var growl_1 = __webpack_require__(381);
	// Gestion des notifications
	var notification_service_1 = __webpack_require__(383);
	// Gestion de l'utilisateur
	var user_service_1 = __webpack_require__(384);
	var AppComponent = (function () {
	    function AppComponent(_notif, _user) {
	        this._notif = _notif;
	        this._user = _user;
	    }
	    AppComponent = __decorate([
	        core_1.Component({
	            selector: 'body',
	            templateUrl: "app/app.html",
	            directives: [
	                router_1.ROUTER_DIRECTIVES,
	                growl_1.Growl
	            ],
	            providers: [
	                notification_service_1.NotificationService,
	                user_service_1.UserService
	            ]
	        }), 
	        __metadata('design:paramtypes', [notification_service_1.NotificationService, user_service_1.UserService])
	    ], AppComponent);
	    return AppComponent;
	}());
	exports.AppComponent = AppComponent;
	//# sourceMappingURL=app.component.js.map

/***/ },

/***/ 381:
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(5);
	var domhandler_1 = __webpack_require__(382);
	var Growl = (function () {
	    function Growl(el, domHandler, differs) {
	        this.el = el;
	        this.domHandler = domHandler;
	        this.sticky = false;
	        this.life = 3000;
	        this.differ = differs.find([]).create(null);
	        this.zIndex = domhandler_1.DomHandler.zindex;
	    }
	    Growl.prototype.ngAfterViewInit = function () {
	        this.container = this.el.nativeElement.children[0];
	    };
	    Growl.prototype.ngDoCheck = function () {
	        var _this = this;
	        var changes = this.differ.diff(this.value);
	        if (changes) {
	            if (this.stopDoCheckPropagation) {
	                this.stopDoCheckPropagation = false;
	            }
	            else if (this.value && this.value.length) {
	                this.zIndex = ++domhandler_1.DomHandler.zindex;
	                this.domHandler.fadeIn(this.container, 250);
	                if (!this.sticky) {
	                    if (this.timeout) {
	                        clearTimeout(this.timeout);
	                    }
	                    this.timeout = setTimeout(function () {
	                        _this.removeAll();
	                    }, this.life);
	                }
	            }
	        }
	    };
	    Growl.prototype.remove = function (msg, msgel) {
	        var _this = this;
	        this.stopDoCheckPropagation = true;
	        this.domHandler.fadeOut(msgel, 250);
	        setTimeout(function () {
	            _this.value.splice(_this.findMessageIndex(msg), 1);
	        }, 250);
	    };
	    Growl.prototype.removeAll = function () {
	        var _this = this;
	        if (this.value && this.value.length) {
	            this.stopDoCheckPropagation = true;
	            this.domHandler.fadeOut(this.container, 250);
	            setTimeout(function () {
	                _this.value.splice(0, _this.value.length);
	            }, 250);
	        }
	    };
	    Growl.prototype.findMessageIndex = function (msg) {
	        var index = -1;
	        if (this.value && this.value.length) {
	            for (var i = 0; i < this.value.length; i++) {
	                if (this.value[i] == msg) {
	                    index = i;
	                    break;
	                }
	            }
	        }
	        return index;
	    };
	    Growl.prototype.ngOnDestroy = function () {
	        if (!this.sticky) {
	            clearTimeout(this.timeout);
	        }
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], Growl.prototype, "sticky", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], Growl.prototype, "life", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Array)
	    ], Growl.prototype, "value", void 0);
	    Growl = __decorate([
	        core_1.Component({
	            selector: 'p-growl',
	            template: "\n        <div class=\"ui-growl ui-widget\" [style.zIndex]=\"zIndex\">\n            <div #msgel *ngFor=\"let msg of value\" class=\"ui-growl-item-container ui-state-highlight ui-corner-all ui-shadow\" aria-live=\"polite\"\n                [ngClass]=\"{'ui-growl-message-info ':msg.severity == 'info','ui-growl-message-warn':msg.severity == 'warn','ui-growl-message-error':msg.severity == 'error'}\">\n                <div class=\"ui-growl-item\">\n                     <div class=\"ui-growl-icon-close fa fa-close\" (click)=\"remove(msg,msgel)\"></div>\n                     <span class=\"ui-growl-image fa fa-2x ui-growl-image-info\"\n                        [ngClass]=\"{'fa-info-circle':msg.severity == 'info','fa-warning':msg.severity == 'warn','fa-close':msg.severity == 'error'}\"></span>\n                     <div class=\"ui-growl-message\">\n                        <span class=\"ui-growl-title\">{{msg.summary}}</span>\n                        <p>{{msg.detail}}</p>\n                     </div>\n                     <div style=\"clear: both;\"></div>\n                </div>\n            </div>\n        </div>\n    ",
	            providers: [domhandler_1.DomHandler]
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler, core_1.IterableDiffers])
	    ], Growl);
	    return Growl;
	}());
	exports.Growl = Growl;
	//# sourceMappingURL=growl.js.map

/***/ },

/***/ 382:
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(5);
	var DomHandler = (function () {
	    function DomHandler() {
	    }
	    DomHandler.prototype.addClass = function (element, className) {
	        if (element.classList)
	            element.classList.add(className);
	        else
	            element.className += ' ' + className;
	    };
	    DomHandler.prototype.addMultipleClasses = function (element, className) {
	        if (element.classList) {
	            var styles = className.split(' ');
	            for (var i = 0; i < styles.length; i++) {
	                element.classList.add(styles[i]);
	            }
	        }
	        else {
	            var styles = className.split(' ');
	            for (var i = 0; i < styles.length; i++) {
	                element.className += ' ' + styles[i];
	            }
	        }
	    };
	    DomHandler.prototype.removeClass = function (element, className) {
	        if (element.classList)
	            element.classList.remove(className);
	        else
	            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	    };
	    DomHandler.prototype.hasClass = function (element, className) {
	        if (element.classList)
	            return element.classList.contains(className);
	        else
	            return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
	    };
	    DomHandler.prototype.siblings = function (element) {
	        return Array.prototype.filter.call(element.parentNode.children, function (child) {
	            return child !== element;
	        });
	    };
	    DomHandler.prototype.find = function (element, selector) {
	        return element.querySelectorAll(selector);
	    };
	    DomHandler.prototype.findSingle = function (element, selector) {
	        return element.querySelector(selector);
	    };
	    DomHandler.prototype.index = function (element) {
	        var children = element.parentNode.childNodes;
	        var num = 0;
	        for (var i = 0; i < children.length; i++) {
	            if (children[i] == element)
	                return num;
	            if (children[i].nodeType == 1)
	                num++;
	        }
	        return -1;
	    };
	    DomHandler.prototype.relativePosition = function (element, target) {
	        var elementDimensions = element.offsetParent ? { width: element.outerWidth, height: element.outerHeight } : this.getHiddenElementDimensions(element);
	        var targetHeight = target.offsetHeight;
	        var targetWidth = target.offsetWidth;
	        var targetOffset = target.getBoundingClientRect();
	        var top, left;
	        if ((targetOffset.top + targetHeight + elementDimensions.height) > window.innerHeight)
	            top = -1 * (elementDimensions.height);
	        else
	            top = targetHeight;
	        if ((targetOffset.left + elementDimensions.width) > window.innerWidth)
	            left = targetWidth - elementDimensions.width;
	        else
	            left = 0;
	        element.style.top = top + 'px';
	        element.style.left = left + 'px';
	    };
	    DomHandler.prototype.absolutePosition = function (element, target) {
	        var elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : this.getHiddenElementDimensions(element);
	        var elementOuterHeight = elementDimensions.height;
	        var elementOuterWidth = elementDimensions.width;
	        var targetOuterHeight = target.offsetHeight;
	        var targetOuterWidth = target.offsetWidth;
	        var targetOffset = target.getBoundingClientRect();
	        var windowScrollTop = this.getWindowScrollTop();
	        var windowScrollLeft = this.getWindowScrollLeft();
	        var top, left;
	        if (targetOffset.top + targetOuterHeight + elementOuterHeight > window.innerHeight)
	            top = targetOffset.top + windowScrollTop - elementOuterHeight;
	        else
	            top = targetOuterHeight + targetOffset.top + windowScrollTop;
	        if (targetOffset.left + targetOuterWidth + elementOuterWidth > window.innerWidth)
	            left = targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth;
	        else
	            left = targetOffset.left + windowScrollLeft;
	        element.style.top = top + 'px';
	        element.style.left = left + 'px';
	    };
	    DomHandler.prototype.getHiddenElementOuterHeight = function (element) {
	        element.style.visibility = 'hidden';
	        element.style.display = 'block';
	        var elementHeight = element.offsetHeight;
	        element.style.display = 'none';
	        element.style.visibility = 'visible';
	        return elementHeight;
	    };
	    DomHandler.prototype.getHiddenElementOuterWidth = function (element) {
	        element.style.visibility = 'hidden';
	        element.style.display = 'block';
	        var elementWidth = element.offsetWidth;
	        element.style.display = 'none';
	        element.style.visibility = 'visible';
	        return elementWidth;
	    };
	    DomHandler.prototype.getHiddenElementDimensions = function (element) {
	        var dimensions = {};
	        element.style.visibility = 'hidden';
	        element.style.display = 'block';
	        dimensions.width = element.offsetWidth;
	        dimensions.height = element.offsetHeight;
	        element.style.display = 'none';
	        element.style.visibility = 'visible';
	        return dimensions;
	    };
	    DomHandler.prototype.scrollInView = function (container, item) {
	        var borderTopValue = getComputedStyle(container).getPropertyValue('borderTopWidth');
	        var borderTop = borderTopValue ? parseFloat(borderTopValue) : 0;
	        var paddingTopValue = getComputedStyle(container).getPropertyValue('paddingTop');
	        var paddingTop = paddingTopValue ? parseFloat(paddingTopValue) : 0;
	        var containerRect = container.getBoundingClientRect();
	        var itemRect = item.getBoundingClientRect();
	        var offset = (itemRect.top + document.body.scrollTop) - (containerRect.top + document.body.scrollTop) - borderTop - paddingTop;
	        var scroll = container.scrollTop;
	        var elementHeight = container.clientHeight;
	        var itemHeight = this.getOuterHeight(item);
	        if (offset < 0) {
	            container.scrollTop = scroll + offset;
	        }
	        else if ((offset + itemHeight) > elementHeight) {
	            container.scrollTop = scroll + offset - elementHeight + itemHeight;
	        }
	    };
	    DomHandler.prototype.fadeIn = function (element, duration) {
	        element.style.opacity = 0;
	        var last = +new Date();
	        var tick = function () {
	            element.style.opacity = +element.style.opacity + (new Date().getTime() - last) / duration;
	            last = +new Date();
	            if (+element.style.opacity < 1) {
	                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
	            }
	        };
	        tick();
	    };
	    DomHandler.prototype.fadeOut = function (element, ms) {
	        var opacity = 1, interval = 50, duration = ms, gap = interval / duration;
	        var fading = setInterval(function () {
	            opacity = opacity - gap;
	            element.style.opacity = opacity;
	            if (opacity <= 0) {
	                clearInterval(fading);
	            }
	        }, interval);
	    };
	    DomHandler.prototype.getWindowScrollTop = function () {
	        var doc = document.documentElement;
	        return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
	    };
	    DomHandler.prototype.getWindowScrollLeft = function () {
	        var doc = document.documentElement;
	        return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
	    };
	    DomHandler.prototype.matches = function (element, selector) {
	        var p = Element.prototype;
	        var f = p['matches'] || p.webkitMatchesSelector || p['mozMatchesSelector'] || p.msMatchesSelector || function (s) {
	            return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
	        };
	        return f.call(element, selector);
	    };
	    DomHandler.prototype.getOuterWidth = function (el, margin) {
	        var width = el.offsetWidth;
	        if (margin) {
	            var style = getComputedStyle(el);
	            width += parseInt(style.paddingLeft) + parseInt(style.paddingRight);
	        }
	        return width;
	    };
	    DomHandler.prototype.getHorizontalMargin = function (el) {
	        var style = getComputedStyle(el);
	        return parseInt(style.marginLeft) + parseInt(style.marginRight);
	    };
	    DomHandler.prototype.innerWidth = function (el) {
	        var width = el.offsetWidth;
	        var style = getComputedStyle(el);
	        width += parseInt(style.paddingLeft) + parseInt(style.paddingRight);
	        return width;
	    };
	    DomHandler.prototype.width = function (el) {
	        var width = el.offsetWidth;
	        var style = getComputedStyle(el);
	        width -= parseInt(style.paddingLeft) + parseInt(style.paddingRight);
	        return width;
	    };
	    DomHandler.prototype.getOuterHeight = function (el, margin) {
	        var height = el.offsetHeight;
	        if (margin) {
	            var style = getComputedStyle(el);
	            height += parseInt(style.marginTop) + parseInt(style.marginBottom);
	        }
	        return height;
	    };
	    DomHandler.prototype.getHeight = function (el) {
	        var height = el.offsetHeight;
	        var style = getComputedStyle(el);
	        height -= parseInt(style.paddingTop) + parseInt(style.paddingBottom) + parseInt(style.borderTopWidth) + parseInt(style.borderBottomWidth);
	        return height;
	    };
	    DomHandler.prototype.getViewport = function () {
	        var win = window, d = document, e = d.documentElement, g = d.getElementsByTagName('body')[0], w = win.innerWidth || e.clientWidth || g.clientWidth, h = win.innerHeight || e.clientHeight || g.clientHeight;
	        return { width: w, height: h };
	    };
	    DomHandler.prototype.equals = function (obj1, obj2) {
	        if (obj1 == null || obj2 == null) {
	            return false;
	        }
	        if (obj1 == obj2) {
	            return true;
	        }
	        if (typeof obj1 == 'object' && typeof obj2 == 'object') {
	            for (var p in obj1) {
	                if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) {
	                    return false;
	                }
	                switch (typeof (obj1[p])) {
	                    case 'object':
	                        if (!this.equals(obj1[p], obj2[p]))
	                            return false;
	                        break;
	                    case 'function':
	                        if (typeof (obj2[p]) == 'undefined' || (p != 'compare' && obj1[p].toString() != obj2[p].toString()))
	                            return false;
	                        break;
	                    default:
	                        if (obj1[p] != obj2[p])
	                            return false;
	                        break;
	                }
	            }
	            for (var p in obj2) {
	                if (typeof (obj1[p]) == 'undefined')
	                    return false;
	            }
	            return true;
	        }
	        return false;
	    };
	    DomHandler.zindex = 1000;
	    DomHandler = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], DomHandler);
	    return DomHandler;
	}());
	exports.DomHandler = DomHandler;
	//# sourceMappingURL=domhandler.js.map

/***/ },

/***/ 383:
/***/ function(module, exports, __webpack_require__) {

	/*
	   "l'Agenda Collaboratif"
	   Copyright (C)  2016  Valentin VIENNOT
	   Contact : vviennot@orange.fr

	   This program is free software: you can redistribute it and/or modify
	   it under the terms of the GNU General Public License as published by
	   the Free Software Foundation, either version 3 of the License, or
	   (at your option) any later version.
	   
	   You have to put a copy of this program's license into your project.

	   This program is distributed in the hope that it will be useful,
	   but WITHOUT ANY WARRANTY; without even the implied warranty of
	   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	   GNU General Public License for more details.
	   
	   FULL LICENSE FILE : https://github.com/misterw97/agendacollaboratif/edit/master/LICENSE
	*/
	/**
	* Created by Valentin on 17/07/2016.
	*/
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
	var core_1 = __webpack_require__(5);
	var NotificationService = (function () {
	    function NotificationService() {
	        this.msgs = [];
	    }
	    NotificationService.prototype.add = function (level, titre, message) {
	        // TODO Problème affichage notification après que les premières se soient effacées
	        var levels = ["info", "warn", "error"];
	        this.msgs.push({ severity: levels[level], summary: titre, detail: message }); // DEBUG
	    };
	    NotificationService.prototype.ask = function (titre, message, confirmer, annuler) {
	        return Promise.resolve("DEBUG");
	    };
	    NotificationService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], NotificationService);
	    return NotificationService;
	}());
	exports.NotificationService = NotificationService;
	//# sourceMappingURL=notification.service.js.map

/***/ },

/***/ 384:
/***/ function(module, exports, __webpack_require__) {

	/*
	   "l'Agenda Collaboratif"
	   Copyright (C)  2016  Valentin VIENNOT
	   Contact : vviennot@orange.fr

	   This program is free software: you can redistribute it and/or modify
	   it under the terms of the GNU General Public License as published by
	   the Free Software Foundation, either version 3 of the License, or
	   (at your option) any later version.
	   
	   You have to put a copy of this program's license into your project.

	   This program is distributed in the hope that it will be useful,
	   but WITHOUT ANY WARRANTY; without even the implied warranty of
	   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	   GNU General Public License for more details.
	   
	   FULL LICENSE FILE : https://github.com/misterw97/agendacollaboratif/edit/master/LICENSE
	*/
	/**
	 * Created by Valentin on 06/08/2016.
	 */
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
	var core_1 = __webpack_require__(5);
	var UserService = (function () {
	    function UserService() {
	        // DEBUG car par de service login pour le moment
	        this.user = {
	            "id": 1,
	            "version": 1,
	            "auth": "46edb1262452d1cbe659601c43a7eb2c",
	            "nom": "Viennot",
	            "prenom": "Valentin",
	            "email": "tinodu78@gmail.com",
	            "notifs": 2,
	            "mail": true,
	            "fake_identity": true
	        };
	        // TODO API login qui enregistre en local storage l'utilisateur
	    }
	    UserService.prototype.getUser = function () {
	        // TODO Actualisation avec gestion de version
	        return this.user;
	    };
	    /**
	     * Renvoit le token de sécurité qui identifie l'utilisateur sur cet appareil
	     * @return {string}
	     */
	    UserService.prototype.getToken = function () {
	        return this.user.auth;
	    };
	    UserService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], UserService);
	    return UserService;
	}());
	exports.UserService = UserService;
	//# sourceMappingURL=user.service.js.map

/***/ },

/***/ 385:
/***/ function(module, exports, __webpack_require__) {

	/*
	   "l'Agenda Collaboratif"
	   Copyright (C)  2016  Valentin VIENNOT
	   Contact : vviennot@orange.fr

	   This program is free software: you can redistribute it and/or modify
	   it under the terms of the GNU General Public License as published by
	   the Free Software Foundation, either version 3 of the License, or
	   (at your option) any later version.
	   
	   You have to put a copy of this program's license into your project.

	   This program is distributed in the hope that it will be useful,
	   but WITHOUT ANY WARRANTY; without even the implied warranty of
	   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	   GNU General Public License for more details.
	   
	   FULL LICENSE FILE : https://github.com/misterw97/agendacollaboratif/edit/master/LICENSE
	*/
	"use strict";
	var router_1 = __webpack_require__(329);
	var cdt_component_1 = __webpack_require__(386);
	var group_component_1 = __webpack_require__(474);
	var user_component_1 = __webpack_require__(478);
	exports.routes = [
	    {
	        path: 'cdt',
	        component: cdt_component_1.CdtComponent
	    },
	    {
	        path: 'group',
	        component: group_component_1.GroupComponent
	    },
	    {
	        path: 'user',
	        component: user_component_1.UserComponent
	    },
	    {
	        path: '',
	        redirectTo: '/cdt',
	        pathMatch: 'prefix'
	    },
	    { path: '**', redirectTo: '/cdt' }
	];
	// Authentification https://angular.io/docs/ts/latest/guide/router.html : can activate
	exports.APP_ROUTER_PROVIDERS = [
	    router_1.provideRouter(exports.routes)
	];
	//# sourceMappingURL=app.routes.js.map

/***/ },

/***/ 386:
/***/ function(module, exports, __webpack_require__) {

	/*
	   "l'Agenda Collaboratif"
	   Copyright (C)  2016  Valentin VIENNOT
	   Contact : vviennot@orange.fr

	   This program is free software: you can redistribute it and/or modify
	   it under the terms of the GNU General Public License as published by
	   the Free Software Foundation, either version 3 of the License, or
	   (at your option) any later version.
	   
	   You have to put a copy of this program's license into your project.

	   This program is distributed in the hope that it will be useful,
	   but WITHOUT ANY WARRANTY; without even the implied warranty of
	   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	   GNU General Public License for more details.
	   
	   FULL LICENSE FILE : https://github.com/misterw97/agendacollaboratif/edit/master/LICENSE
	*/
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
	// TODO Améliorations, todos, DEBUG, relire code et erreurs, style
	// Angular2 components
	var core_1 = __webpack_require__(5);
	var router_1 = __webpack_require__(329);
	var forms_1 = __webpack_require__(387);
	// RXJS : Observables
	__webpack_require__(424);
	__webpack_require__(431);
	var section_1 = __webpack_require__(433);
	var devoir_1 = __webpack_require__(434);
	// Services persos
	var synchronize_service_1 = __webpack_require__(435);
	var date_service_1 = __webpack_require__(458);
	var parse_service_1 = __webpack_require__(459);
	var notification_service_1 = __webpack_require__(383);
	var user_service_1 = __webpack_require__(384);
	var linky_pipe_1 = __webpack_require__(460);
	// Prime UI / Prime NG directives
	var splitbutton_1 = __webpack_require__(462);
	var splitbuttonitem_1 = __webpack_require__(463);
	var panel_1 = __webpack_require__(464);
	var accordion_1 = __webpack_require__(465);
	var accordiontab_1 = __webpack_require__(466);
	var checkbox_1 = __webpack_require__(468);
	var button_1 = __webpack_require__(469);
	var overlaypanel_1 = __webpack_require__(470);
	var tooltip_1 = __webpack_require__(471);
	var common_1 = __webpack_require__(467);
	var inputtextarea_1 = __webpack_require__(472);
	var selectbutton_1 = __webpack_require__(473);
	// DEBUG
	var mock_1 = __webpack_require__(457);
	var CdtComponent = (function () {
	    function CdtComponent(_sync, _date, _parse, _notif, _route, _user) {
	        var _this = this;
	        this._sync = _sync;
	        this._date = _date;
	        this._parse = _parse;
	        this._notif = _notif;
	        this._route = _route;
	        this._user = _user;
	        // Sélection de la source à afficher TODO par variable et par défaut ?
	        this.type = "devoirs";
	        this.filtre = "";
	        this.filtre_texte = "";
	        this.filtres = [];
	        this.selectedFiltres = [];
	        this.term = new Control(); // Input
	        this.merge = [];
	        this.flags = ["grey", "blue", "orange", "red"];
	        this.input = [];
	        this.selectedDevoir = new devoir_1.Devoir();
	        this.selectedComm = new devoir_1.Devoir();
	        this.term.valueChanges
	            .debounceTime(600)
	            .distinctUntilChanged()
	            .subscribe(function (term) { return _this.filtr(_this.filtre); });
	    }
	    CdtComponent.prototype.ngOnInit = function () {
	        var _this = this;
	        // DEBUG
	        // TODO naviguer vers un query param this._router.navigate(['/cdt', { filter: 'test' }]);
	        // Normalement les vérifications que les variables existent avant d'arriver ici évitent la présence de ces lignes
	        window.localStorage.setItem("devoirs", JSON.stringify(mock_1.DEVOIRS));
	        window.localStorage.setItem("pendDEL", JSON.stringify([]));
	        window.localStorage.setItem("pendDELc", JSON.stringify([]));
	        window.localStorage.setItem("pendALERT", JSON.stringify([]));
	        window.localStorage.setItem("pendDO", JSON.stringify([]));
	        window.localStorage.setItem("pendFLAG", JSON.stringify([]));
	        window.localStorage.setItem("pendCOMM", JSON.stringify([]));
	        window.localStorage.setItem("pendMERGE", JSON.stringify([]));
	        // DEBUG
	        this.user = this._user.getUser();
	        this.sub = this._route
	            .params
	            .subscribe(function (params) { return _this.filtre = (params['filter']); });
	        this.filtre = "";
	        // DEBUG
	        console.log("* CdtController *");
	        // TODO Vérifier si les variables (devoirs, archives, user, pending) sont dispo et si l'user est logged via un CanActivate
	        this.refresh();
	        // TODO Pour le moment la SYNC est toujours effective donc la synchro ecrase tout le temps les données...
	        // On configure une synchronisation automatique régulière (ms)
	        // this.interval = IntervalObservable.create(1000).subscribe((t) => this.sync()); // DEBUG
	    };
	    CdtComponent.prototype.ngOnDestroy = function () {
	        this.sub.unsubscribe();
	        //this.interval.unsubscribe(); // DEBUG
	    };
	    CdtComponent.prototype.refresh = function () {
	        this.devoirs = this.getDevoirs();
	        this.recalcSections();
	    };
	    /**
	     * Synchronise les devoirs, si lea SYNC est effective : on remplace les devoirs du template par les nouveaux
	     */
	    CdtComponent.prototype.sync = function () {
	        var th = this;
	        this._sync.do().then(function (str) {
	            th.refresh();
	            // DEBUG
	            console.log(str);
	        }, function (str) {
	            // DEBUG
	            console.log(str);
	        });
	    };
	    /**
	     * Récupère les devoirs du local Storage
	     */
	    CdtComponent.prototype.getDevoirs = function () {
	        return this._parse.parse(this.type);
	    };
	    /**
	     * Recalcule les sections à partir du tableau de devoirs du component
	     * ATTENTION : On suppose que les devoirs sont déjà triés par date et classés par matière
	     * @return {Section[]}
	     */
	    CdtComponent.prototype.recalcSections = function () {
	        console.log("SECTIONS");
	        var devoirs = this.filtrage(this.devoirs);
	        var filtres_name = [];
	        var filtres_count = [];
	        this.flags_count = Array.apply(null, Array(this.flags.length)).map(Number.prototype.valueOf, 0);
	        // Retour
	        var sections = [];
	        // Variables pour la boucle
	        var section = new section_1.Section();
	        var lastDate = new Date();
	        var premier = true;
	        // Pour chaque devoir...
	        devoirs.forEach(function (devoir) {
	            // Compte les flags
	            this.flags_count[devoir.flag]++;
	            // Enregistre les filtres appliquables
	            if (filtres_name.indexOf(devoir.matiere) < 0) {
	                filtres_name.push(devoir.matiere);
	                filtres_count[filtres_name.indexOf(devoir.matiere)] = 1;
	            }
	            else
	                filtres_count[filtres_name.indexOf(devoir.matiere)]++;
	            // Si la date (jour) du devoir est différente de celle du précédent...
	            if (devoir.date.toDateString() != lastDate.toDateString()) {
	                // ...S'il s'agit du premier élément...
	                if (premier) {
	                    // ...alors le prochain ne sera plus le premier !
	                    premier = false;
	                }
	                else {
	                    // ...On ajoute la section en cours au retour
	                    sections.push(section);
	                }
	                // On initialise une nouvelle section
	                var day_num = devoir.date.getDate().toString();
	                var day_texte = this._date.getDayTiny(devoir.date);
	                section = {
	                    "titre": day_num,
	                    "sous_titre": day_texte,
	                    "devoirs": []
	                };
	            }
	            else if (premier) {
	                premier = false;
	                section = {
	                    "titre": devoir.date.getDate().toString(),
	                    "sous_titre": "Ajd.",
	                    "devoirs": []
	                };
	            }
	            // On ajoute le devoir à la section en cours
	            section.devoirs.push(devoir);
	            // On remplace la "date du dernier devoir" par celle de celui en cours
	            lastDate = devoir.date;
	            // Puis on passe au suivant !
	        }, this);
	        // On ajoute la dernière section créée aux sections
	        if (!premier)
	            sections.push(section);
	        // On créé les filtres appliquables
	        if (this.filtre == "" && this.filtre_texte == "") {
	            this.filtres = [];
	            filtres_name.forEach(function (name, index) {
	                this.filtres.push({
	                    "label": "#" + name + " (" + filtres_count[index] + ")",
	                    "value": "#" + name
	                });
	            }, this);
	        }
	        // Et on renvoi les sections !
	        this.sections = sections;
	    };
	    /**
	     * Applique un filtre aux devoirs s'il y a eu lieu
	     * Remarque :
	     * @return Devoir[]
	     */
	    CdtComponent.prototype.filtrage = function (devoirs) {
	        var filtre_full = (this.filtre_texte.length > 2 ? this.filtre_texte : "") +
	            (this.filtre_texte.length > 2 && this.filtre.length > 2 ? "&&" : "") +
	            (this.filtre.length > 2 ? this.filtre : "");
	        if (filtre_full.length < 2) {
	            this.selectedFiltres = [];
	            return devoirs;
	        }
	        else {
	            console.log("FILTREDEVOIRS"); // DEBUG
	            // Devoirs renvoyés
	            var retour = [];
	            // On récupère les conditions "ET"
	            var filtresET = filtre_full.trim().split("&&");
	            // Trouve le premier tableau non vide
	            var nonvide = 0;
	            var premier = true;
	            // Pour chaque condition "ET"
	            for (var i = 0; i < filtresET.length; i++) {
	                // On récupère les conditions "OU"
	                var filtresOU = filtresET[i].trim().split("||");
	                // Sélection des devoirs pour ce groupement "ET"
	                var retourTEMP = [];
	                // Pour chaque condition "OU"
	                for (var j = 0; j < filtresET[i].length; j++) {
	                    if (filtresOU[j] != null && filtresOU[j] != "") {
	                        nonvide++;
	                        // On récupère le type de filtrage
	                        var type = filtresOU[j].substr(0, 1);
	                        var search = filtresOU[j].substr(1);
	                        // Pour chaque devoir
	                        for (var k = 0; k < devoirs.length; k++) {
	                            // On teste s'il correspond à la condition selon le type de filtre
	                            // Si le devoir répond à la condition (selon le type de filtre)
	                            if ((type == "@" && devoirs[k].auteur.toLowerCase().match("^" + search.toLowerCase())) ||
	                                (type == "#" && devoirs[k].matiere.toLowerCase().match("^" + search.toLowerCase())) ||
	                                (type == "?" && devoirs[k].date.toLocaleDateString() == search) ||
	                                (type == ":" && devoirs[k].flag == this.flags.indexOf(search)) ||
	                                (type == "-" && devoirs[k].fait.toString() == search) ||
	                                (devoirs[k].texte.toLowerCase().match(filtresOU[j].toLowerCase()))) {
	                                // En évitant les doublons, on l'ajoute aux résultats retournés de la sous condition en cours
	                                if (retourTEMP.indexOf(devoirs[k]) < 0) {
	                                    retourTEMP.push(devoirs[k]);
	                                }
	                                // Pour parfaire l'affichage, on met à jour les filtres appliqués
	                                if (type == "#" && this.selectedFiltres.indexOf(filtresOU[j]) < 0)
	                                    this.selectedFiltres.push(filtresOU[j]);
	                            }
	                        }
	                    }
	                }
	                // A ce stade tous les devoirs répondant à au moins une condition du groupe "OU"
	                // sont ajoutés au tableau retourTEMP (sans doublon)
	                // Ajout au tableau de retour final
	                // S'il s'agit du premier tour, on copie tout simplement le contenu
	                if (premier && nonvide > 0) {
	                    premier = false;
	                    retour = retourTEMP.slice();
	                }
	                else if (retourTEMP.length > 0) {
	                    var length_1 = retour.length;
	                    var todelete = [];
	                    for (var l = 0; l < length_1; l++) {
	                        var et = false;
	                        for (var k = 0; !et && k < retourTEMP.length; k++)
	                            if (retour[l] == retourTEMP[k])
	                                et = true;
	                        if (!et)
	                            todelete.push(retour[l]);
	                    }
	                    for (var k = 0; k < todelete.length; k++)
	                        retour.splice(retour.indexOf(todelete[k]), 1);
	                }
	                else if (nonvide > 0) {
	                    retour = [];
	                }
	            }
	            return retour;
	        }
	    };
	    CdtComponent.prototype.filtr = function (filtre) {
	        this.filtre = filtre;
	        this.refresh();
	    };
	    CdtComponent.prototype.clear_filtr = function () {
	        this.selectedFiltres = [];
	        this.filtre = "";
	        this.filtre_texte = "";
	        this.refresh();
	    };
	    CdtComponent.prototype.done = function (devoir) {
	        // On change l'état du devoir
	        devoir.fait = !devoir.fait;
	        // On met à jour le nombre de "marqué comme fait"
	        if (devoir.fait)
	            var increment = +1;
	        else
	            var increment = -1;
	        this.devoirs[(this.devoirs).indexOf(devoir)].nb_fait += increment;
	        // Ajoute à la liste d'actions en attente
	        this.pend("DO", { "id": devoir.id, "done": devoir.fait });
	    };
	    /**
	     * Ajoute un devoir à la liste de "merge"
	     * @param devoir
	     */
	    CdtComponent.prototype.addToMerge = function (devoir) {
	        var faisable = true;
	        var raison = "";
	        // Si la liste d'attente est vide, il n'y a pas de risque
	        if (this.merge.length > 0) {
	            // Sinon il faut vérifier que le "merge" est faisable
	            // Tant que c'est faisable, on cherche un conflit
	            var i = 0;
	            while (faisable && i < this.merge.length) {
	                // S'ils sont les même
	                if (devoir.id == this.merge[i].id) {
	                    faisable = false;
	                    raison = "autre";
	                }
	                else if (devoir.matiere != this.merge[i].matiere) {
	                    faisable = false;
	                    raison = "de la même matière";
	                }
	                else if (devoir.date.valueOf() != this.merge[i].date.valueOf()) {
	                    faisable = false;
	                    raison = "pour la même date";
	                }
	                i++;
	            }
	        }
	        if (faisable)
	            this.merge.push(devoir);
	        else
	            this._notif.add(2, "Impossible de fusionner", "Etant donné les devoirs déjà en attente de fusion celui ci ne peut être ajouté.\n" +
	                "Choisis en un " + raison + " ou vide la liste de fusion.");
	    };
	    CdtComponent.prototype.clearMerge = function () {
	        this.merge = [];
	    };
	    CdtComponent.prototype.doMerge = function () {
	        var ids = [];
	        for (var i = 0; i < this.merge.length; i++)
	            ids[i] = this.merge[i].id;
	        this.pend("MERGE", ids);
	        this._notif.add(0, "Fusion préparée", "La demande de fusion pour ces " + this.merge.length + " devoirs sera bientôt transmise au serveur, à la prochaine synchronisation les anciens devoirs seront remplacés par le résultat de cette fusion !");
	        this.merge = [];
	    };
	    /**
	     * Signale le devoir comme indésirable
	     * @param devoir
	     */
	    CdtComponent.prototype.signaler = function (devoir) {
	        // On ajoute l'ID du devoir à la liste d'attente des signalements
	        this.pend("ALERT", devoir.id);
	        // Notifie l'utilisateur
	        this._notif.add(1, "Devoir signalé !", "Un modérateur l'examinera prochainement. S'il n'est pas conforme à nos règles d'utilisation il sera supprimé et son auteur sanctionné, votre identité ne sera jamais dévoilée au cours du processus.");
	    };
	    /**
	     * Suppression d'un devoir
	     * @param devoir à supprimer
	     */
	    CdtComponent.prototype.supprimer = function (devoir) {
	        var th = this;
	        this._notif.ask("Confirmation", "La suppression est définitive. Plus aucun utilisateur n'aura accès à ce devoir.", "Confirmer", "Annuler")
	            .then(function () {
	            // Supprimer de devoirs[]
	            th.devoirs.splice((th.devoirs).indexOf(devoir), 1);
	            // Ajout à la liste de suppression de devoirs
	            th.pend("DEL", devoir.id);
	            // Notifie l'utilisateur
	            th._notif.add(0, "Effectué.", "Le devoir a été supprimé de l'agenda !");
	        });
	    };
	    /**
	     * Supprime le commentaire
	     * @param devoir devoir auquel appartient ce commentaire
	     * @param commentaire à supprimer
	     */
	    CdtComponent.prototype.supprimer_comm = function (devoir, commentaire) {
	        // On supprime le commentaire du devoir concerné
	        devoir.commentaires.splice((devoir.commentaires).indexOf(commentaire), 1);
	        this.selectedComm = devoir;
	        // On ajoute l'opération en liste d'attente
	        this.pend("DELc", commentaire.id);
	    };
	    CdtComponent.prototype.sendComment = function (devoir, input, index) {
	        // Création du commentaire
	        var commentaire = {
	            "id": 0,
	            "user": this.user.id,
	            "auteur": this.user.prenom + this.user.nom,
	            "date": new Date(),
	            "texte": input
	        };
	        // On ajoute le commentaire au devoir
	        devoir.commentaires.splice(0, 0, commentaire);
	        // Ajout à la liste d'attente
	        this.selectedComm = devoir;
	        this.pend("COMM", { "id": devoir.id, "content": commentaire });
	        this.input[index] = "";
	    };
	    /* DEBUG : unused
	    private unselect():void {
	        this.selectedComm = new Devoir();
	    }
	    */
	    CdtComponent.prototype.selectDevoir = function (event, devoir, overlaypanel) {
	        this.selectedDevoir = devoir;
	        overlaypanel.toggle(event);
	    };
	    CdtComponent.prototype.getFlags = function () {
	        var retour = [];
	        for (var i = 0; i < this.flags.length; i++)
	            if (i != this.selectedDevoir.flag)
	                retour.push(i);
	        return retour;
	    };
	    CdtComponent.prototype.setFlag = function (flag, overlaypanel) {
	        this.selectedDevoir.flag = flag;
	        this.pend("FLAG", { "id": this.selectedDevoir.id, "flag": flag });
	        overlaypanel.hide();
	    };
	    CdtComponent.prototype.pend = function (list, push) {
	        // Ecrase localstorage
	        window.localStorage.setItem("devoirs", JSON.stringify(this.devoirs));
	        // Ajoute l'opération à la liste d'attente du suppression de commentaires
	        var pending = JSON.parse(window.localStorage.getItem("pend" + list));
	        pending.push(push);
	        window.localStorage.setItem("pend" + list, JSON.stringify(pending));
	        // Lance une synchronisation
	        this.sync();
	        // Rafraichi l'affichage
	        this.refresh();
	    };
	    CdtComponent = __decorate([
	        core_1.Component({
	            selector: 'agd-cdt',
	            templateUrl: 'app/cdt/cdt.html',
	            directives: [
	                splitbutton_1.SplitButton,
	                splitbuttonitem_1.SplitButtonItem,
	                panel_1.Panel,
	                accordion_1.Accordion,
	                accordiontab_1.AccordionTab,
	                checkbox_1.Checkbox,
	                button_1.Button,
	                overlaypanel_1.OverlayPanel,
	                tooltip_1.Tooltip,
	                common_1.Header,
	                inputtextarea_1.InputTextarea,
	                selectbutton_1.SelectButton,
	                forms_1.FORM_DIRECTIVES
	            ],
	            providers: [
	                synchronize_service_1.SyncService,
	                date_service_1.DateService,
	                parse_service_1.ParseService,
	                forms_1.FORM_PROVIDERS
	            ],
	            pipes: [
	                linky_pipe_1.LinkyPipe
	            ]
	        }), 
	        __metadata('design:paramtypes', [synchronize_service_1.SyncService, date_service_1.DateService, parse_service_1.ParseService, notification_service_1.NotificationService, router_1.ActivatedRoute, user_service_1.UserService])
	    ], CdtComponent);
	    return CdtComponent;
	}());
	exports.CdtComponent = CdtComponent;
	//# sourceMappingURL=cdt.component.js.map

/***/ },

/***/ 433:
/***/ function(module, exports) {

	"use strict";
	/**
	* Created by Valentin on 15/07/2016.
	*/
	var Section = (function () {
	    function Section() {
	    }
	    return Section;
	}());
	exports.Section = Section;
	//# sourceMappingURL=section.js.map

/***/ },

/***/ 434:
/***/ function(module, exports) {

	/*
	   "l'Agenda Collaboratif"
	   Copyright (C)  2016  Valentin VIENNOT
	   Contact : vviennot@orange.fr

	   This program is free software: you can redistribute it and/or modify
	   it under the terms of the GNU General Public License as published by
	   the Free Software Foundation, either version 3 of the License, or
	   (at your option) any later version.
	   
	   You have to put a copy of this program's license into your project.

	   This program is distributed in the hope that it will be useful,
	   but WITHOUT ANY WARRANTY; without even the implied warranty of
	   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	   GNU General Public License for more details.
	   
	   FULL LICENSE FILE : https://github.com/misterw97/agendacollaboratif/edit/master/LICENSE
	*/
	/**
	 * Created by Valentin on 14/07/2016.
	 */
	"use strict";
	var Devoir = (function () {
	    function Devoir() {
	    }
	    return Devoir;
	}());
	exports.Devoir = Devoir;
	//# sourceMappingURL=devoir.js.map

/***/ },

/***/ 435:
/***/ function(module, exports, __webpack_require__) {

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
	/*
	   "l'Agenda Collaboratif"
	   Copyright (C)  2016  Valentin VIENNOT
	   Contact : vviennot@orange.fr

	   This program is free software: you can redistribute it and/or modify
	   it under the terms of the GNU General Public License as published by
	   the Free Software Foundation, either version 3 of the License, or
	   (at your option) any later version.
	   
	   You have to put a copy of this program's license into your project.

	   This program is distributed in the hope that it will be useful,
	   but WITHOUT ANY WARRANTY; without even the implied warranty of
	   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	   GNU General Public License for more details.
	   
	   FULL LICENSE FILE : https://github.com/misterw97/agendacollaboratif/edit/master/LICENSE
	*/
	/**
	 * Created by Valentin on 13/07/2016.
	 */
	var core_1 = __webpack_require__(5);
	var http_1 = __webpack_require__(436);
	var mock_1 = __webpack_require__(457);
	var user_service_1 = __webpack_require__(384);
	var SyncService = (function () {
	    function SyncService(http, _user) {
	        this.http = http;
	        this._user = _user;
	    }
	    /**
	     * Envoi les requêtes vers le serveur et récupère les nouvelles données
	     * @return Promise<string> Resolve si la synchro a été effective, Reject sinon
	     */
	    SyncService.prototype.do = function () {
	        // On commence par envoyer les requêtes en attente
	        return this.sendPending()
	            .then(this.getDevoirs, function (result) {
	            return Promise.reject(result);
	        });
	    };
	    // TODO Requete POST et APIS
	    /**
	     * Envoi des requêtes locales (DO, ADD, DEL) vers le serveur
	     * En cas de succès les requêtes sont effacées du stockage navigateur
	     * En cas d'échec elles y restent jusqu'à la prochaine synchro réussie
	     * @return Resolve si pas d'action nécessaire ou si requêtes bien envoyées, Reject pour tout autre cas
	     */
	    SyncService.prototype.sendPending = function () {
	        // AJOUTER LES NOUVEAUX PENDING ! (reprendre juste le concept)
	        /* DEBUG
	       console.log("* Envoi des requêtes locales *");
	       // On vérifie la connexion à Internet
	       if (navigator.onLine) {
	           // On vérifie la présence des variables dans le stockage local
	           if (
	               window.localStorage.getItem("user")
	               && window.localStorage.getItem("pendingDO")
	               && window.localStorage.getItem("pendingADD")
	               && window.localStorage.getItem("pendingDEL")
	           ) {
	               // On récupère l'objet utilisateur pour la clé de sécurité
	               var user = JSON.parse(window.localStorage.getItem("user"));
	               // On stocke temporairement les pending list
	               var do_op = JSON.parse(window.localStorage.getItem("pendingDO"));
	               var add_op = JSON.parse(window.localStorage.getItem("pendingADD"));
	               var del_op = JSON.parse(window.localStorage.getItem("pendingDEL"));
	               // S'il y a des opérations à faire
	               if (do_op.length + add_op.length + del_op.length > 0) {
	                   // On vide les pending list (opérations en attente) du local storage (navigateur)
	                   // pour éviter les doublons si une deuxième synchro se déclenchait
	                   window.localStorage.setItem("pendingDEL", JSON.stringify([]));
	                   window.localStorage.setItem("pendingADD", JSON.stringify([]));
	                   window.localStorage.setItem("pendingDO", JSON.stringify([]));
	                   // Préparons les données de la requête
	                   var data = [{
	                       "auth": user.auth, // Pour authentifier l'utilisateur sur le serveur
	                       "do": do_op, // Devoirs à marquer comme faits
	                       "add": add_op, // Ajouts en attente
	                       "del": del_op // Suppressions en attente
	                   }];
	                   // On effectue la requête
	                   var headers = new Headers({'Content-Type': 'application/json'});
	                   var options = new RequestOptions({headers: headers});
	                   th.http.post('http://apis.groupesix.xyz/pending/', JSON.stringify(data), options)
	                       .toPromise()
	                       .then(
	                           // En cas de succès de la requête
	                           function () {
	                               return Promise.resolve("SYNC DONE");
	                           }
	                       )
	                       .catch(
	                           // En cas d'échec du post des pending list
	                           function (response:any) {
	                               // On remet les opérations non effectuées au local storage
	                               window.localStorage.setItem("pendingDEL", JSON.stringify(del_op));
	                               window.localStorage.setItem("pendingADD", JSON.stringify(add_op));
	                               window.localStorage.setItem("pendingDO", JSON.stringify(do_op));
	                               // On traite l'erreur
	                               return this.handleError(response);
	                           }
	                       );
	               } else {
	                   return Promise.resolve("SYNC INFO - Pas d'opération en attente");
	               }
	           } else {
	               return Promise.reject("SYNC ERR! - Il manque des variables au stockage local");
	               // Déconnecter l'utilisateur avec un message "Corrompu, vérifier lalala"
	           }
	       }
	       else {
	           return Promise.reject("SYNC ERR! - Pas de connexion Internet");
	       }
	       */
	        return Promise.resolve("DEBUG - Pending 'envoyees'"); // DEBUG
	    };
	    // TODO Requete Devoirs & penser au hash de version (reject si pas besoin de sync ni devoirs ni taches)
	    /**
	     * Réupère les devoirs et tâches depuis le serveur seulement si la version locale est différente de celle du serveur
	     * @return {Promise<string>} Resolve si des devoirs ont été récupérés correctement, Reject sinon
	     */
	    SyncService.prototype.getDevoirs = function () {
	        /*
	         // On récupère les devoirs depuis le serveur
	         $http.post('http://apis.groupesix.xyz/devoirs/', {"auth":user.auth})
	         .then(
	         // En cas de succès
	         function (response: any) {
	         // On enregistre les nouveaux devoirs au local storage
	         window.localStorage.setItem("devoirs", JSON.stringify(response.data));
	         // On termine la Synchro avec succès !
	         defer.resolve("Opérations effectuées et données récupérées du serveur !");
	         },
	         function () {
	         defer.reject("Opérations non effectuées et données non récupérées...");
	         }
	         );
	         */
	        return Promise.reject("DEBUG HORS LIGNE"); // DEBUG
	    };
	    // TODO Regarder les codes d'erreur et gérer les cas depuis les APIS + notifications ici
	    /**
	     * Gestion des erreurs HTTP
	     * @param error
	     * @returns {Promise<void>|Promise<T>}
	     */
	    SyncService.prototype.handleError = function (error) {
	        var msg = "SYNC ERR! - ";
	        switch (error.status) {
	            case 401:
	                msg += "Authentification non valide !";
	                break;
	        }
	        return Promise.reject(msg);
	    };
	    // TODO Requete Archives & appeler seulement au début, une fois
	    SyncService.prototype.getArchives = function () {
	        window.localStorage.setItem("archives", JSON.stringify(mock_1.ARCHIVES)); // DEBUG
	    };
	    SyncService.prototype.getGroups = function (index) {
	        // TODO
	        return [
	            {
	                "id": 1,
	                "parent": 0,
	                "nom": "INSA1",
	                "joint": true,
	                "group": true,
	                "color": 1
	            },
	            {
	                "id": 2,
	                "parent": 1,
	                "nom": "TEST2",
	                "joint": false,
	                "group": true,
	                "color": 2
	            },
	            {
	                "id": 3,
	                "parent": 2,
	                "nom": "MAT1",
	                "joint": true,
	                "group": false,
	                "color": 3
	            },
	            {
	                "id": 4,
	                "parent": 3,
	                "nom": "MAT2",
	                "joint": false,
	                "group": false,
	                "color": 4
	            }
	        ];
	    };
	    SyncService.prototype.getGroup = function (index) {
	        return {
	            "id": 2,
	            "parent": 1,
	            "nom": "TEST2",
	            "joint": false,
	            "group": true,
	            "color": 2
	        };
	    };
	    SyncService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [http_1.Http, user_service_1.UserService])
	    ], SyncService);
	    return SyncService;
	}());
	exports.SyncService = SyncService;
	//# sourceMappingURL=synchronize.service.js.map

/***/ },

/***/ 457:
/***/ function(module, exports) {

	/*
	   "l'Agenda Collaboratif"
	   Copyright (C)  2016  Valentin VIENNOT
	   Contact : vviennot@orange.fr

	   This program is free software: you can redistribute it and/or modify
	   it under the terms of the GNU General Public License as published by
	   the Free Software Foundation, either version 3 of the License, or
	   (at your option) any later version.
	   
	   You have to put a copy of this program's license into your project.

	   This program is distributed in the hope that it will be useful,
	   but WITHOUT ANY WARRANTY; without even the implied warranty of
	   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	   GNU General Public License for more details.
	   
	   FULL LICENSE FILE : https://github.com/misterw97/agendacollaboratif/edit/master/LICENSE
	*/
	/**
	 * Created by Valentin on 13/07/2016.
	 */
	"use strict";
	/**
	 * Données test
	 * POUR la génération de dates en JSON : https://openclassrooms.com/forum/sujet/transformer-un-datetime-en-date-pour-json
	 */
	exports.DEVOIRS = [
	    {
	        "id": 4,
	        "user": 2,
	        "date": new Date("07/17/2016"),
	        "auteur": "jeanmichel",
	        "matiere": "Maths",
	        "matiere_c": "matiere2",
	        "texte": "Suspendisse congue, ex non elementum vestibulum, dolor massa hendrerit ante, vel euismod nisl nunc sed felis. Fusce pharetra nunc non venenatis tempor. Phasellus ut tellus nec orci commodo porttitor at eleifend felis. Integer elementum auctor ultricies.",
	        "commentaires": [
	            {
	                "id": 100,
	                "user": 1,
	                "auteur": "valentinviennot",
	                "date": new Date("07/14/2016 14:17:00"),
	                "texte": "Phasellus sapien felis, rutrum quis luctus at, venenatis non justo. Ut sapien neque, accumsan non finibus vel, placerat et lacus. Donec euismod nibh vel placerat pharetra."
	            }
	        ],
	        "nb_fait": 3,
	        "fait": false,
	        "flag": 0
	    },
	    {
	        "id": 1,
	        "user": 1,
	        "date": new Date("07/17/2016"),
	        "auteur": "valentinviennot",
	        "matiere": "Physique",
	        "matiere_c": "matiere1",
	        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse congue, ex non elementum vestibulum, dolor massa hendrerit ante, vel euismod nisl nunc sed felis. Fusce pharetra nunc non venenatis tempor. Phasellus ut tellus nec orci commodo porttitor at eleifend felis. Integer elementum auctor ultricies.",
	        "commentaires": [
	            {
	                "id": 1,
	                "user": 2,
	                "auteur": "jeanmichel",
	                "date": new Date("07/14/2016 14:17:00"),
	                "texte": "Phasellus sapien felis, rutrum quis luctus at, venenatis non justo. Ut sapien neque, accumsan non finibus vel, placerat et lacus. Donec euismod nibh vel placerat pharetra."
	            }
	        ],
	        "nb_fait": 0,
	        "fait": false,
	        "flag": 0
	    },
	    {
	        "id": 2,
	        "user": 2,
	        "date": new Date("07/17/2016"),
	        "auteur": "jeanmichel",
	        "matiere": "Physique",
	        "matiere_c": "matiere2",
	        "texte": "Suspendisse congue, ex non elementum vestibulum, dolor massa hendrerit ante, vel euismod nisl nunc sed felis. Fusce pharetra nunc non venenatis tempor. Phasellus ut tellus nec orci commodo porttitor at eleifend felis. Integer elementum auctor ultricies.",
	        "commentaires": [
	            {
	                "id": 100,
	                "user": 1,
	                "auteur": "valentinviennot",
	                "date": new Date("07/14/2016 14:17:00"),
	                "texte": "Phasellus sapien felis, rutrum quis luctus at, venenatis non justo. Ut sapien neque, accumsan non finibus vel, placerat et lacus. Donec euismod nibh vel placerat pharetra."
	            }
	        ],
	        "nb_fait": 3,
	        "fait": false,
	        "flag": 0
	    },
	    {
	        "id": 3,
	        "user": 2,
	        "date": new Date("07/17/2016"),
	        "auteur": "jeanmichel",
	        "matiere": "Maths",
	        "matiere_c": "matiere2",
	        "texte": "Suspendisse congue, http://google.fr api.groupesix.xyz ex non elementum vestibulum, dolor massa hendrerit ante, vel euismod nisl nunc sed felis. Fusce pharetra nunc non venenatis tempor. Phasellus ut tellus nec orci commodo porttitor at eleifend felis. Integer elementum auctor ultricies.",
	        "commentaires": [
	            {
	                "id": 100,
	                "user": 1,
	                "auteur": "valentinviennot",
	                "date": new Date("07/14/2016 14:17:00"),
	                "texte": "Phasellus sapien felis, rutrum quis luctus at, venenatis non justo. Ut sapien neque, accumsan non finibus vel, placerat et lacus. Donec euismod nibh vel placerat pharetra."
	            }
	        ],
	        "nb_fait": 3,
	        "fait": false,
	        "flag": 0
	    }
	];
	// DEBUG
	exports.ARCHIVES = [];
	//# sourceMappingURL=mock.js.map

/***/ },

/***/ 458:
/***/ function(module, exports, __webpack_require__) {

	/*
	   "l'Agenda Collaboratif"
	   Copyright (C)  2016  Valentin VIENNOT
	   Contact : vviennot@orange.fr

	   This program is free software: you can redistribute it and/or modify
	   it under the terms of the GNU General Public License as published by
	   the Free Software Foundation, either version 3 of the License, or
	   (at your option) any later version.
	   
	   You have to put a copy of this program's license into your project.

	   This program is distributed in the hope that it will be useful,
	   but WITHOUT ANY WARRANTY; without even the implied warranty of
	   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	   GNU General Public License for more details.
	   
	   FULL LICENSE FILE : https://github.com/misterw97/agendacollaboratif/edit/master/LICENSE
	*/
	/**
	 * Created by Valentin on 16/07/2016.
	 */
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
	var core_1 = __webpack_require__(5);
	var DateService = (function () {
	    function DateService() {
	        this.today = new Date();
	    }
	    DateService.prototype.getDay = function (date) {
	        var day = "ERREUR";
	        switch (date.getDay()) {
	            case 0:
	                day = "Dimanche";
	                break;
	            case 1:
	                day = "Lundi";
	                break;
	            case 2:
	                day = "Mardi";
	                break;
	            case 3:
	                day = "Mercredi";
	                break;
	            case 4:
	                day = "Jeudi";
	                break;
	            case 5:
	                day = "Vendredi";
	                break;
	            case 6:
	                day = "Samedi";
	                break;
	        }
	        return day;
	    };
	    DateService.prototype.getDayTiny = function (date) {
	        return this.getDay(date).substr(0, 3) + "."; // TODO
	    };
	    DateService.prototype.recentDateTime = function (date) {
	        if (date.toDateString() == this.today.toDateString()) {
	            return date.toLocaleTimeString().substr(0, 5);
	        }
	        else {
	            return date.toLocaleDateString();
	        }
	    };
	    DateService.prototype.jjmm = function (date) {
	        return date.toLocaleDateString().substr(0, 5);
	    };
	    DateService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], DateService);
	    return DateService;
	}());
	exports.DateService = DateService;
	//# sourceMappingURL=date.service.js.map

/***/ },

/***/ 459:
/***/ function(module, exports, __webpack_require__) {

	/*
	   "l'Agenda Collaboratif"
	   Copyright (C)  2016  Valentin VIENNOT
	   Contact : vviennot@orange.fr

	   This program is free software: you can redistribute it and/or modify
	   it under the terms of the GNU General Public License as published by
	   the Free Software Foundation, either version 3 of the License, or
	   (at your option) any later version.
	   
	   You have to put a copy of this program's license into your project.

	   This program is distributed in the hope that it will be useful,
	   but WITHOUT ANY WARRANTY; without even the implied warranty of
	   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	   GNU General Public License for more details.
	   
	   FULL LICENSE FILE : https://github.com/misterw97/agendacollaboratif/edit/master/LICENSE
	*/
	/**
	 * Created by Valentin on 16/07/2016.
	 */
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
	var core_1 = __webpack_require__(5);
	var ParseService = (function () {
	    function ParseService() {
	    }
	    ParseService.prototype.parse = function (value) {
	        return JSON.parse(window.localStorage.getItem(value), this.dateParser);
	    };
	    ParseService.prototype.dateParser = function (key, value) {
	        var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
	        var reMsAjax = /^\/Date\((d|-|.*)\)[\/|\\]$/;
	        if (typeof value === 'string') {
	            var a = reISO.exec(value);
	            if (a)
	                return new Date(value);
	            a = reMsAjax.exec(value);
	            if (a) {
	                var b = a[1].split(/[-+,.]/);
	                return new Date(b[0] ? +b[0] : 0 - +b[1]);
	            }
	        }
	        return value;
	    };
	    ;
	    ParseService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], ParseService);
	    return ParseService;
	}());
	exports.ParseService = ParseService;
	//# sourceMappingURL=parse.service.js.map

/***/ },

/***/ 460:
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(5);
	var Autolinker = __webpack_require__(461);
	var LinkyPipe = (function () {
	    function LinkyPipe() {
	    }
	    LinkyPipe.prototype.transform = function (value, options) {
	        return Autolinker.link(value, options);
	    };
	    LinkyPipe = __decorate([
	        core_1.Pipe({ name: 'linky' }), 
	        __metadata('design:paramtypes', [])
	    ], LinkyPipe);
	    return LinkyPipe;
	}());
	exports.LinkyPipe = LinkyPipe;
	//# sourceMappingURL=linky-pipe.js.map

/***/ },

/***/ 461:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * Autolinker.js
	 * 0.27.0
	 *
	 * Copyright(c) 2016 Gregory Jacobs <greg@greg-jacobs.com>
	 * MIT License
	 *
	 * https://github.com/gregjacobs/Autolinker.js
	 */
	;(function(root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    module.exports = factory();
	  } else {
	    root.Autolinker = factory();
	  }
	}(this, function() {
	/**
	 * @class Autolinker
	 * @extends Object
	 *
	 * Utility class used to process a given string of text, and wrap the matches in
	 * the appropriate anchor (&lt;a&gt;) tags to turn them into links.
	 *
	 * Any of the configuration options may be provided in an Object (map) provided
	 * to the Autolinker constructor, which will configure how the {@link #link link()}
	 * method will process the links.
	 *
	 * For example:
	 *
	 *     var autolinker = new Autolinker( {
	 *         newWindow : false,
	 *         truncate  : 30
	 *     } );
	 *
	 *     var html = autolinker.link( "Joe went to www.yahoo.com" );
	 *     // produces: 'Joe went to <a href="http://www.yahoo.com">yahoo.com</a>'
	 *
	 *
	 * The {@link #static-link static link()} method may also be used to inline
	 * options into a single call, which may be more convenient for one-off uses.
	 * For example:
	 *
	 *     var html = Autolinker.link( "Joe went to www.yahoo.com", {
	 *         newWindow : false,
	 *         truncate  : 30
	 *     } );
	 *     // produces: 'Joe went to <a href="http://www.yahoo.com">yahoo.com</a>'
	 *
	 *
	 * ## Custom Replacements of Links
	 *
	 * If the configuration options do not provide enough flexibility, a {@link #replaceFn}
	 * may be provided to fully customize the output of Autolinker. This function is
	 * called once for each URL/Email/Phone#/Twitter Handle/Hashtag match that is
	 * encountered.
	 *
	 * For example:
	 *
	 *     var input = "...";  // string with URLs, Email Addresses, Phone #s, Twitter Handles, and Hashtags
	 *
	 *     var linkedText = Autolinker.link( input, {
	 *         replaceFn : function( autolinker, match ) {
	 *             console.log( "href = ", match.getAnchorHref() );
	 *             console.log( "text = ", match.getAnchorText() );
	 *
	 *             switch( match.getType() ) {
	 *                 case 'url' :
	 *                     console.log( "url: ", match.getUrl() );
	 *
	 *                     if( match.getUrl().indexOf( 'mysite.com' ) === -1 ) {
	 *                         var tag = autolinker.getTagBuilder().build( match );  // returns an `Autolinker.HtmlTag` instance, which provides mutator methods for easy changes
	 *                         tag.setAttr( 'rel', 'nofollow' );
	 *                         tag.addClass( 'external-link' );
	 *
	 *                         return tag;
	 *
	 *                     } else {
	 *                         return true;  // let Autolinker perform its normal anchor tag replacement
	 *                     }
	 *
	 *                 case 'email' :
	 *                     var email = match.getEmail();
	 *                     console.log( "email: ", email );
	 *
	 *                     if( email === "my@own.address" ) {
	 *                         return false;  // don't auto-link this particular email address; leave as-is
	 *                     } else {
	 *                         return;  // no return value will have Autolinker perform its normal anchor tag replacement (same as returning `true`)
	 *                     }
	 *
	 *                 case 'phone' :
	 *                     var phoneNumber = match.getPhoneNumber();
	 *                     console.log( phoneNumber );
	 *
	 *                     return '<a href="http://newplace.to.link.phone.numbers.to/">' + phoneNumber + '</a>';
	 *
	 *                 case 'twitter' :
	 *                     var twitterHandle = match.getTwitterHandle();
	 *                     console.log( twitterHandle );
	 *
	 *                     return '<a href="http://newplace.to.link.twitter.handles.to/">' + twitterHandle + '</a>';
	 *
	 *                 case 'hashtag' :
	 *                     var hashtag = match.getHashtag();
	 *                     console.log( hashtag );
	 *
	 *                     return '<a href="http://newplace.to.link.hashtag.handles.to/">' + hashtag + '</a>';
	 *             }
	 *         }
	 *     } );
	 *
	 *
	 * The function may return the following values:
	 *
	 * - `true` (Boolean): Allow Autolinker to replace the match as it normally
	 *   would.
	 * - `false` (Boolean): Do not replace the current match at all - leave as-is.
	 * - Any String: If a string is returned from the function, the string will be
	 *   used directly as the replacement HTML for the match.
	 * - An {@link Autolinker.HtmlTag} instance, which can be used to build/modify
	 *   an HTML tag before writing out its HTML text.
	 *
	 * @constructor
	 * @param {Object} [cfg] The configuration options for the Autolinker instance,
	 *   specified in an Object (map).
	 */
	var Autolinker = function( cfg ) {
		cfg = cfg || {};

		this.version = Autolinker.version;

		this.urls = this.normalizeUrlsCfg( cfg.urls );
		this.email = typeof cfg.email === 'boolean' ? cfg.email : true;
		this.twitter = typeof cfg.twitter === 'boolean' ? cfg.twitter : true;
		this.phone = typeof cfg.phone === 'boolean' ? cfg.phone : true;
		this.hashtag = cfg.hashtag || false;
		this.newWindow = typeof cfg.newWindow === 'boolean' ? cfg.newWindow : true;
		this.stripPrefix = typeof cfg.stripPrefix === 'boolean' ? cfg.stripPrefix : true;

		// Validate the value of the `hashtag` cfg.
		var hashtag = this.hashtag;
		if( hashtag !== false && hashtag !== 'twitter' && hashtag !== 'facebook' && hashtag !== 'instagram' ) {
			throw new Error( "invalid `hashtag` cfg - see docs" );
		}

		this.truncate = this.normalizeTruncateCfg( cfg.truncate );
		this.className = cfg.className || '';
		this.replaceFn = cfg.replaceFn || null;

		this.htmlParser = null;
		this.matchers = null;
		this.tagBuilder = null;
	};



	/**
	 * Automatically links URLs, Email addresses, Phone Numbers, Twitter handles,
	 * and Hashtags found in the given chunk of HTML. Does not link URLs found
	 * within HTML tags.
	 *
	 * For instance, if given the text: `You should go to http://www.yahoo.com`,
	 * then the result will be `You should go to &lt;a href="http://www.yahoo.com"&gt;http://www.yahoo.com&lt;/a&gt;`
	 *
	 * Example:
	 *
	 *     var linkedText = Autolinker.link( "Go to google.com", { newWindow: false } );
	 *     // Produces: "Go to <a href="http://google.com">google.com</a>"
	 *
	 * @static
	 * @param {String} textOrHtml The HTML or text to find matches within (depending
	 *   on if the {@link #urls}, {@link #email}, {@link #phone}, {@link #twitter},
	 *   and {@link #hashtag} options are enabled).
	 * @param {Object} [options] Any of the configuration options for the Autolinker
	 *   class, specified in an Object (map). See the class description for an
	 *   example call.
	 * @return {String} The HTML text, with matches automatically linked.
	 */
	Autolinker.link = function( textOrHtml, options ) {
		var autolinker = new Autolinker( options );
		return autolinker.link( textOrHtml );
	};


	/**
	 * @static
	 * @property {String} version (readonly)
	 *
	 * The Autolinker version number in the form major.minor.patch
	 *
	 * Ex: 0.25.1
	 */
	Autolinker.version = '0.27.0';


	Autolinker.prototype = {
		constructor : Autolinker,  // fix constructor property

		/**
		 * @cfg {Boolean/Object} [urls=true]
		 *
		 * `true` if URLs should be automatically linked, `false` if they should not
		 * be.
		 *
		 * This option also accepts an Object form with 3 properties, to allow for
		 * more customization of what exactly gets linked. All default to `true`:
		 *
		 * @param {Boolean} schemeMatches `true` to match URLs found prefixed with a
		 *   scheme, i.e. `http://google.com`, or `other+scheme://google.com`,
		 *   `false` to prevent these types of matches.
		 * @param {Boolean} wwwMatches `true` to match urls found prefixed with
		 *   `'www.'`, i.e. `www.google.com`. `false` to prevent these types of
		 *   matches. Note that if the URL had a prefixed scheme, and
		 *   `schemeMatches` is true, it will still be linked.
		 * @param {Boolean} tldMatches `true` to match URLs with known top level
		 *   domains (.com, .net, etc.) that are not prefixed with a scheme or
		 *   `'www.'`. This option attempts to match anything that looks like a URL
		 *   in the given text. Ex: `google.com`, `asdf.org/?page=1`, etc. `false`
		 *   to prevent these types of matches.
		 */

		/**
		 * @cfg {Boolean} [email=true]
		 *
		 * `true` if email addresses should be automatically linked, `false` if they
		 * should not be.
		 */

		/**
		 * @cfg {Boolean} [twitter=true]
		 *
		 * `true` if Twitter handles ("@example") should be automatically linked,
		 * `false` if they should not be.
		 */

		/**
		 * @cfg {Boolean} [phone=true]
		 *
		 * `true` if Phone numbers ("(555)555-5555") should be automatically linked,
		 * `false` if they should not be.
		 */

		/**
		 * @cfg {Boolean/String} [hashtag=false]
		 *
		 * A string for the service name to have hashtags (ex: "#myHashtag")
		 * auto-linked to. The currently-supported values are:
		 *
		 * - 'twitter'
		 * - 'facebook'
		 * - 'instagram'
		 *
		 * Pass `false` to skip auto-linking of hashtags.
		 */

		/**
		 * @cfg {Boolean} [newWindow=true]
		 *
		 * `true` if the links should open in a new window, `false` otherwise.
		 */

		/**
		 * @cfg {Boolean} [stripPrefix=true]
		 *
		 * `true` if 'http://' or 'https://' and/or the 'www.' should be stripped
		 * from the beginning of URL links' text, `false` otherwise.
		 */

		/**
		 * @cfg {Number/Object} [truncate=0]
		 *
		 * ## Number Form
		 *
		 * A number for how many characters matched text should be truncated to
		 * inside the text of a link. If the matched text is over this number of
		 * characters, it will be truncated to this length by adding a two period
		 * ellipsis ('..') to the end of the string.
		 *
		 * For example: A url like 'http://www.yahoo.com/some/long/path/to/a/file'
		 * truncated to 25 characters might look something like this:
		 * 'yahoo.com/some/long/pat..'
		 *
		 * Example Usage:
		 *
		 *     truncate: 25
		 *
		 *
		 *  Defaults to `0` for "no truncation."
		 *
		 *
		 * ## Object Form
		 *
		 * An Object may also be provided with two properties: `length` (Number) and
		 * `location` (String). `location` may be one of the following: 'end'
		 * (default), 'middle', or 'smart'.
		 *
		 * Example Usage:
		 *
		 *     truncate: { length: 25, location: 'middle' }
		 *
		 * @cfg {Number} [truncate.length=0] How many characters to allow before
		 *   truncation will occur. Defaults to `0` for "no truncation."
		 * @cfg {"end"/"middle"/"smart"} [truncate.location="end"]
		 *
		 * - 'end' (default): will truncate up to the number of characters, and then
		 *   add an ellipsis at the end. Ex: 'yahoo.com/some/long/pat..'
		 * - 'middle': will truncate and add the ellipsis in the middle. Ex:
		 *   'yahoo.com/s..th/to/a/file'
		 * - 'smart': for URLs where the algorithm attempts to strip out unnecessary
		 *   parts first (such as the 'www.', then URL scheme, hash, etc.),
		 *   attempting to make the URL human-readable before looking for a good
		 *   point to insert the ellipsis if it is still too long. Ex:
		 *   'yahoo.com/some..to/a/file'. For more details, see
		 *   {@link Autolinker.truncate.TruncateSmart}.
		 */

		/**
		 * @cfg {String} className
		 *
		 * A CSS class name to add to the generated links. This class will be added
		 * to all links, as well as this class plus match suffixes for styling
		 * url/email/phone/twitter/hashtag links differently.
		 *
		 * For example, if this config is provided as "myLink", then:
		 *
		 * - URL links will have the CSS classes: "myLink myLink-url"
		 * - Email links will have the CSS classes: "myLink myLink-email", and
		 * - Twitter links will have the CSS classes: "myLink myLink-twitter"
		 * - Phone links will have the CSS classes: "myLink myLink-phone"
		 * - Hashtag links will have the CSS classes: "myLink myLink-hashtag"
		 */

		/**
		 * @cfg {Function} replaceFn
		 *
		 * A function to individually process each match found in the input string.
		 *
		 * See the class's description for usage.
		 *
		 * This function is called with the following parameters:
		 *
		 * @cfg {Autolinker} replaceFn.autolinker The Autolinker instance, which may
		 *   be used to retrieve child objects from (such as the instance's
		 *   {@link #getTagBuilder tag builder}).
		 * @cfg {Autolinker.match.Match} replaceFn.match The Match instance which
		 *   can be used to retrieve information about the match that the `replaceFn`
		 *   is currently processing. See {@link Autolinker.match.Match} subclasses
		 *   for details.
		 */


		/**
		 * @property {String} version (readonly)
		 *
		 * The Autolinker version number in the form major.minor.patch
		 *
		 * Ex: 0.25.1
		 */

		/**
		 * @private
		 * @property {Autolinker.htmlParser.HtmlParser} htmlParser
		 *
		 * The HtmlParser instance used to skip over HTML tags, while finding text
		 * nodes to process. This is lazily instantiated in the {@link #getHtmlParser}
		 * method.
		 */

		/**
		 * @private
		 * @property {Autolinker.matcher.Matcher[]} matchers
		 *
		 * The {@link Autolinker.matcher.Matcher} instances for this Autolinker
		 * instance.
		 *
		 * This is lazily created in {@link #getMatchers}.
		 */

		/**
		 * @private
		 * @property {Autolinker.AnchorTagBuilder} tagBuilder
		 *
		 * The AnchorTagBuilder instance used to build match replacement anchor tags.
		 * Note: this is lazily instantiated in the {@link #getTagBuilder} method.
		 */


		/**
		 * Normalizes the {@link #urls} config into an Object with 3 properties:
		 * `schemeMatches`, `wwwMatches`, and `tldMatches`, all Booleans.
		 *
		 * See {@link #urls} config for details.
		 *
		 * @private
		 * @param {Boolean/Object} urls
		 * @return {Object}
		 */
		normalizeUrlsCfg : function( urls ) {
			if( urls == null ) urls = true;  // default to `true`

			if( typeof urls === 'boolean' ) {
				return { schemeMatches: urls, wwwMatches: urls, tldMatches: urls };

			} else {  // object form
				return {
					schemeMatches : typeof urls.schemeMatches === 'boolean' ? urls.schemeMatches : true,
					wwwMatches    : typeof urls.wwwMatches === 'boolean'    ? urls.wwwMatches    : true,
					tldMatches    : typeof urls.tldMatches === 'boolean'    ? urls.tldMatches    : true
				};
			}
		},


		/**
		 * Normalizes the {@link #truncate} config into an Object with 2 properties:
		 * `length` (Number), and `location` (String).
		 *
		 * See {@link #truncate} config for details.
		 *
		 * @private
		 * @param {Number/Object} truncate
		 * @return {Object}
		 */
		normalizeTruncateCfg : function( truncate ) {
			if( typeof truncate === 'number' ) {
				return { length: truncate, location: 'end' };

			} else {  // object, or undefined/null
				return Autolinker.Util.defaults( truncate || {}, {
					length   : Number.POSITIVE_INFINITY,
					location : 'end'
				} );
			}
		},


		/**
		 * Parses the input `textOrHtml` looking for URLs, email addresses, phone
		 * numbers, username handles, and hashtags (depending on the configuration
		 * of the Autolinker instance), and returns an array of {@link Autolinker.match.Match}
		 * objects describing those matches.
		 *
		 * This method is used by the {@link #link} method, but can also be used to
		 * simply do parsing of the input in order to discover what kinds of links
		 * there are and how many.
		 *
		 * @param {String} textOrHtml The HTML or text to find matches within
		 *   (depending on if the {@link #urls}, {@link #email}, {@link #phone},
		 *   {@link #twitter}, and {@link #hashtag} options are enabled).
		 * @return {Autolinker.match.Match[]} The array of Matches found in the
		 *   given input `textOrHtml`.
		 */
		parse : function( textOrHtml ) {
			var htmlParser = this.getHtmlParser(),
			    htmlNodes = htmlParser.parse( textOrHtml ),
			    anchorTagStackCount = 0,  // used to only process text around anchor tags, and any inner text/html they may have;
			    matches = [];

			// Find all matches within the `textOrHtml` (but not matches that are
			// already nested within <a> tags)
			for( var i = 0, len = htmlNodes.length; i < len; i++ ) {
				var node = htmlNodes[ i ],
				    nodeType = node.getType();

				if( nodeType === 'element' && node.getTagName() === 'a' ) {  // Process HTML anchor element nodes in the input `textOrHtml` to find out when we're within an <a> tag
					if( !node.isClosing() ) {  // it's the start <a> tag
						anchorTagStackCount++;
					} else {  // it's the end </a> tag
						anchorTagStackCount = Math.max( anchorTagStackCount - 1, 0 );  // attempt to handle extraneous </a> tags by making sure the stack count never goes below 0
					}

				} else if( nodeType === 'text' && anchorTagStackCount === 0 ) {  // Process text nodes that are not within an <a> tag
					var textNodeMatches = this.parseText( node.getText(), node.getOffset() );

					matches.push.apply( matches, textNodeMatches );
				}
			}


			// After we have found all matches, remove subsequent matches that
			// overlap with a previous match. This can happen for instance with URLs,
			// where the url 'google.com/#link' would match '#link' as a hashtag.
			matches = this.compactMatches( matches );

			// And finally, remove matches for match types that have been turned
			// off. We needed to have all match types turned on initially so that
			// things like hashtags could be filtered out if they were really just
			// part of a URL match (for instance, as a named anchor).
			matches = this.removeUnwantedMatches( matches );

			return matches;
		},


		/**
		 * After we have found all matches, we need to remove subsequent matches
		 * that overlap with a previous match. This can happen for instance with
		 * URLs, where the url 'google.com/#link' would match '#link' as a hashtag.
		 *
		 * @private
		 * @param {Autolinker.match.Match[]} matches
		 * @return {Autolinker.match.Match[]}
		 */
		compactMatches : function( matches ) {
			// First, the matches need to be sorted in order of offset
			matches.sort( function( a, b ) { return a.getOffset() - b.getOffset(); } );

			for( var i = 0; i < matches.length - 1; i++ ) {
				var match = matches[ i ],
				    endIdx = match.getOffset() + match.getMatchedText().length;

				// Remove subsequent matches that overlap with the current match
				while( i + 1 < matches.length && matches[ i + 1 ].getOffset() <= endIdx ) {
					matches.splice( i + 1, 1 );
				}
			}

			return matches;
		},


		/**
		 * Removes matches for matchers that were turned off in the options. For
		 * example, if {@link #hashtag hashtags} were not to be matched, we'll
		 * remove them from the `matches` array here.
		 *
		 * @private
		 * @param {Autolinker.match.Match[]} matches The array of matches to remove
		 *   the unwanted matches from. Note: this array is mutated for the
		 *   removals.
		 * @return {Autolinker.match.Match[]} The mutated input `matches` array.
		 */
		removeUnwantedMatches : function( matches ) {
			var remove = Autolinker.Util.remove;

			if( !this.hashtag ) remove( matches, function( match ) { return match.getType() === 'hashtag'; } );
			if( !this.email )   remove( matches, function( match ) { return match.getType() === 'email'; } );
			if( !this.phone )   remove( matches, function( match ) { return match.getType() === 'phone'; } );
			if( !this.twitter ) remove( matches, function( match ) { return match.getType() === 'twitter'; } );
			if( !this.urls.schemeMatches ) {
				remove( matches, function( m ) { return m.getType() === 'url' && m.getUrlMatchType() === 'scheme'; } );
			}
			if( !this.urls.wwwMatches ) {
				remove( matches, function( m ) { return m.getType() === 'url' && m.getUrlMatchType() === 'www'; } );
			}
			if( !this.urls.tldMatches ) {
				remove( matches, function( m ) { return m.getType() === 'url' && m.getUrlMatchType() === 'tld'; } );
			}

			return matches;
		},


		/**
		 * Parses the input `text` looking for URLs, email addresses, phone
		 * numbers, username handles, and hashtags (depending on the configuration
		 * of the Autolinker instance), and returns an array of {@link Autolinker.match.Match}
		 * objects describing those matches.
		 *
		 * This method processes a **non-HTML string**, and is used to parse and
		 * match within the text nodes of an HTML string. This method is used
		 * internally by {@link #parse}.
		 *
		 * @private
		 * @param {String} text The text to find matches within (depending on if the
		 *   {@link #urls}, {@link #email}, {@link #phone}, {@link #twitter}, and
		 *   {@link #hashtag} options are enabled). This must be a non-HTML string.
		 * @param {Number} [offset=0] The offset of the text node within the
		 *   original string. This is used when parsing with the {@link #parse}
		 *   method to generate correct offsets within the {@link Autolinker.match.Match}
		 *   instances, but may be omitted if calling this method publicly.
		 * @return {Autolinker.match.Match[]} The array of Matches found in the
		 *   given input `text`.
		 */
		parseText : function( text, offset ) {
			offset = offset || 0;
			var matchers = this.getMatchers(),
			    matches = [];

			for( var i = 0, numMatchers = matchers.length; i < numMatchers; i++ ) {
				var textMatches = matchers[ i ].parseMatches( text );

				// Correct the offset of each of the matches. They are originally
				// the offset of the match within the provided text node, but we
				// need to correct them to be relative to the original HTML input
				// string (i.e. the one provided to #parse).
				for( var j = 0, numTextMatches = textMatches.length; j < numTextMatches; j++ ) {
					textMatches[ j ].setOffset( offset + textMatches[ j ].getOffset() );
				}

				matches.push.apply( matches, textMatches );
			}
			return matches;
		},


		/**
		 * Automatically links URLs, Email addresses, Phone numbers, Twitter
		 * handles, and Hashtags found in the given chunk of HTML. Does not link
		 * URLs found within HTML tags.
		 *
		 * For instance, if given the text: `You should go to http://www.yahoo.com`,
		 * then the result will be `You should go to
		 * &lt;a href="http://www.yahoo.com"&gt;http://www.yahoo.com&lt;/a&gt;`
		 *
		 * This method finds the text around any HTML elements in the input
		 * `textOrHtml`, which will be the text that is processed. Any original HTML
		 * elements will be left as-is, as well as the text that is already wrapped
		 * in anchor (&lt;a&gt;) tags.
		 *
		 * @param {String} textOrHtml The HTML or text to autolink matches within
		 *   (depending on if the {@link #urls}, {@link #email}, {@link #phone},
		 *   {@link #twitter}, and {@link #hashtag} options are enabled).
		 * @return {String} The HTML, with matches automatically linked.
		 */
		link : function( textOrHtml ) {
			if( !textOrHtml ) { return ""; }  // handle `null` and `undefined`

			var matches = this.parse( textOrHtml ),
				newHtml = [],
				lastIndex = 0;

			for( var i = 0, len = matches.length; i < len; i++ ) {
				var match = matches[ i ];

				newHtml.push( textOrHtml.substring( lastIndex, match.getOffset() ) );
				newHtml.push( this.createMatchReturnVal( match ) );

				lastIndex = match.getOffset() + match.getMatchedText().length;
			}
			newHtml.push( textOrHtml.substring( lastIndex ) );  // handle the text after the last match

			return newHtml.join( '' );
		},


		/**
		 * Creates the return string value for a given match in the input string.
		 *
		 * This method handles the {@link #replaceFn}, if one was provided.
		 *
		 * @private
		 * @param {Autolinker.match.Match} match The Match object that represents
		 *   the match.
		 * @return {String} The string that the `match` should be replaced with.
		 *   This is usually the anchor tag string, but may be the `matchStr` itself
		 *   if the match is not to be replaced.
		 */
		createMatchReturnVal : function( match ) {
			// Handle a custom `replaceFn` being provided
			var replaceFnResult;
			if( this.replaceFn ) {
				replaceFnResult = this.replaceFn.call( this, this, match );  // Autolinker instance is the context, and the first arg
			}

			if( typeof replaceFnResult === 'string' ) {
				return replaceFnResult;  // `replaceFn` returned a string, use that

			} else if( replaceFnResult === false ) {
				return match.getMatchedText();  // no replacement for the match

			} else if( replaceFnResult instanceof Autolinker.HtmlTag ) {
				return replaceFnResult.toAnchorString();

			} else {  // replaceFnResult === true, or no/unknown return value from function
				// Perform Autolinker's default anchor tag generation
				var anchorTag = match.buildTag();  // returns an Autolinker.HtmlTag instance

				return anchorTag.toAnchorString();
			}
		},


		/**
		 * Lazily instantiates and returns the {@link #htmlParser} instance for this
		 * Autolinker instance.
		 *
		 * @protected
		 * @return {Autolinker.htmlParser.HtmlParser}
		 */
		getHtmlParser : function() {
			var htmlParser = this.htmlParser;

			if( !htmlParser ) {
				htmlParser = this.htmlParser = new Autolinker.htmlParser.HtmlParser();
			}

			return htmlParser;
		},


		/**
		 * Lazily instantiates and returns the {@link Autolinker.matcher.Matcher}
		 * instances for this Autolinker instance.
		 *
		 * @protected
		 * @return {Autolinker.matcher.Matcher[]}
		 */
		getMatchers : function() {
			if( !this.matchers ) {
				var matchersNs = Autolinker.matcher,
				    tagBuilder = this.getTagBuilder();

				var matchers = [
					new matchersNs.Hashtag( { tagBuilder: tagBuilder, serviceName: this.hashtag } ),
					new matchersNs.Email( { tagBuilder: tagBuilder } ),
					new matchersNs.Phone( { tagBuilder: tagBuilder } ),
					new matchersNs.Twitter( { tagBuilder: tagBuilder } ),
					new matchersNs.Url( { tagBuilder: tagBuilder, stripPrefix: this.stripPrefix } )
				];

				return ( this.matchers = matchers );

			} else {
				return this.matchers;
			}
		},


		/**
		 * Returns the {@link #tagBuilder} instance for this Autolinker instance, lazily instantiating it
		 * if it does not yet exist.
		 *
		 * This method may be used in a {@link #replaceFn} to generate the {@link Autolinker.HtmlTag HtmlTag} instance that
		 * Autolinker would normally generate, and then allow for modifications before returning it. For example:
		 *
		 *     var html = Autolinker.link( "Test google.com", {
		 *         replaceFn : function( autolinker, match ) {
		 *             var tag = autolinker.getTagBuilder().build( match );  // returns an {@link Autolinker.HtmlTag} instance
		 *             tag.setAttr( 'rel', 'nofollow' );
		 *
		 *             return tag;
		 *         }
		 *     } );
		 *
		 *     // generated html:
		 *     //   Test <a href="http://google.com" target="_blank" rel="nofollow">google.com</a>
		 *
		 * @return {Autolinker.AnchorTagBuilder}
		 */
		getTagBuilder : function() {
			var tagBuilder = this.tagBuilder;

			if( !tagBuilder ) {
				tagBuilder = this.tagBuilder = new Autolinker.AnchorTagBuilder( {
					newWindow   : this.newWindow,
					truncate    : this.truncate,
					className   : this.className
				} );
			}

			return tagBuilder;
		}

	};


	// Autolinker Namespaces

	Autolinker.match = {};
	Autolinker.matcher = {};
	Autolinker.htmlParser = {};
	Autolinker.truncate = {};

	/*global Autolinker */
	/*jshint eqnull:true, boss:true */
	/**
	 * @class Autolinker.Util
	 * @singleton
	 *
	 * A few utility methods for Autolinker.
	 */
	Autolinker.Util = {

		/**
		 * @property {Function} abstractMethod
		 *
		 * A function object which represents an abstract method.
		 */
		abstractMethod : function() { throw "abstract"; },


		/**
		 * @private
		 * @property {RegExp} trimRegex
		 *
		 * The regular expression used to trim the leading and trailing whitespace
		 * from a string.
		 */
		trimRegex : /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,


		/**
		 * Assigns (shallow copies) the properties of `src` onto `dest`.
		 *
		 * @param {Object} dest The destination object.
		 * @param {Object} src The source object.
		 * @return {Object} The destination object (`dest`)
		 */
		assign : function( dest, src ) {
			for( var prop in src ) {
				if( src.hasOwnProperty( prop ) ) {
					dest[ prop ] = src[ prop ];
				}
			}

			return dest;
		},


		/**
		 * Assigns (shallow copies) the properties of `src` onto `dest`, if the
		 * corresponding property on `dest` === `undefined`.
		 *
		 * @param {Object} dest The destination object.
		 * @param {Object} src The source object.
		 * @return {Object} The destination object (`dest`)
		 */
		defaults : function( dest, src ) {
			for( var prop in src ) {
				if( src.hasOwnProperty( prop ) && dest[ prop ] === undefined ) {
					dest[ prop ] = src[ prop ];
				}
			}

			return dest;
		},


		/**
		 * Extends `superclass` to create a new subclass, adding the `protoProps` to the new subclass's prototype.
		 *
		 * @param {Function} superclass The constructor function for the superclass.
		 * @param {Object} protoProps The methods/properties to add to the subclass's prototype. This may contain the
		 *   special property `constructor`, which will be used as the new subclass's constructor function.
		 * @return {Function} The new subclass function.
		 */
		extend : function( superclass, protoProps ) {
			var superclassProto = superclass.prototype;

			var F = function() {};
			F.prototype = superclassProto;

			var subclass;
			if( protoProps.hasOwnProperty( 'constructor' ) ) {
				subclass = protoProps.constructor;
			} else {
				subclass = function() { superclassProto.constructor.apply( this, arguments ); };
			}

			var subclassProto = subclass.prototype = new F();  // set up prototype chain
			subclassProto.constructor = subclass;  // fix constructor property
			subclassProto.superclass = superclassProto;

			delete protoProps.constructor;  // don't re-assign constructor property to the prototype, since a new function may have been created (`subclass`), which is now already there
			Autolinker.Util.assign( subclassProto, protoProps );

			return subclass;
		},


		/**
		 * Truncates the `str` at `len - ellipsisChars.length`, and adds the `ellipsisChars` to the
		 * end of the string (by default, two periods: '..'). If the `str` length does not exceed
		 * `len`, the string will be returned unchanged.
		 *
		 * @param {String} str The string to truncate and add an ellipsis to.
		 * @param {Number} truncateLen The length to truncate the string at.
		 * @param {String} [ellipsisChars=..] The ellipsis character(s) to add to the end of `str`
		 *   when truncated. Defaults to '..'
		 */
		ellipsis : function( str, truncateLen, ellipsisChars ) {
			if( str.length > truncateLen ) {
				ellipsisChars = ( ellipsisChars == null ) ? '..' : ellipsisChars;
				str = str.substring( 0, truncateLen - ellipsisChars.length ) + ellipsisChars;
			}
			return str;
		},


		/**
		 * Supports `Array.prototype.indexOf()` functionality for old IE (IE8 and below).
		 *
		 * @param {Array} arr The array to find an element of.
		 * @param {*} element The element to find in the array, and return the index of.
		 * @return {Number} The index of the `element`, or -1 if it was not found.
		 */
		indexOf : function( arr, element ) {
			if( Array.prototype.indexOf ) {
				return arr.indexOf( element );

			} else {
				for( var i = 0, len = arr.length; i < len; i++ ) {
					if( arr[ i ] === element ) return i;
				}
				return -1;
			}
		},


		/**
		 * Removes array elements based on a filtering function. Mutates the input
		 * array.
		 *
		 * Using this instead of the ES5 Array.prototype.filter() function, to allow
		 * Autolinker compatibility with IE8, and also to prevent creating many new
		 * arrays in memory for filtering.
		 *
		 * @param {Array} arr The array to remove elements from. This array is
		 *   mutated.
		 * @param {Function} fn A function which should return `true` to
		 *   remove an element.
		 * @return {Array} The mutated input `arr`.
		 */
		remove : function( arr, fn ) {
			for( var i = arr.length - 1; i >= 0; i-- ) {
				if( fn( arr[ i ] ) === true ) {
					arr.splice( i, 1 );
				}
			}
		},


		/**
		 * Performs the functionality of what modern browsers do when `String.prototype.split()` is called
		 * with a regular expression that contains capturing parenthesis.
		 *
		 * For example:
		 *
		 *     // Modern browsers:
		 *     "a,b,c".split( /(,)/ );  // --> [ 'a', ',', 'b', ',', 'c' ]
		 *
		 *     // Old IE (including IE8):
		 *     "a,b,c".split( /(,)/ );  // --> [ 'a', 'b', 'c' ]
		 *
		 * This method emulates the functionality of modern browsers for the old IE case.
		 *
		 * @param {String} str The string to split.
		 * @param {RegExp} splitRegex The regular expression to split the input `str` on. The splitting
		 *   character(s) will be spliced into the array, as in the "modern browsers" example in the
		 *   description of this method.
		 *   Note #1: the supplied regular expression **must** have the 'g' flag specified.
		 *   Note #2: for simplicity's sake, the regular expression does not need
		 *   to contain capturing parenthesis - it will be assumed that any match has them.
		 * @return {String[]} The split array of strings, with the splitting character(s) included.
		 */
		splitAndCapture : function( str, splitRegex ) {
			if( !splitRegex.global ) throw new Error( "`splitRegex` must have the 'g' flag set" );

			var result = [],
			    lastIdx = 0,
			    match;

			while( match = splitRegex.exec( str ) ) {
				result.push( str.substring( lastIdx, match.index ) );
				result.push( match[ 0 ] );  // push the splitting char(s)

				lastIdx = match.index + match[ 0 ].length;
			}
			result.push( str.substring( lastIdx ) );

			return result;
		},


		/**
		 * Trims the leading and trailing whitespace from a string.
		 *
		 * @param {String} str The string to trim.
		 * @return {String}
		 */
		trim : function( str ) {
			return str.replace( this.trimRegex, '' );
		}

	};
	/*global Autolinker */
	/*jshint boss:true */
	/**
	 * @class Autolinker.HtmlTag
	 * @extends Object
	 *
	 * Represents an HTML tag, which can be used to easily build/modify HTML tags programmatically.
	 *
	 * Autolinker uses this abstraction to create HTML tags, and then write them out as strings. You may also use
	 * this class in your code, especially within a {@link Autolinker#replaceFn replaceFn}.
	 *
	 * ## Examples
	 *
	 * Example instantiation:
	 *
	 *     var tag = new Autolinker.HtmlTag( {
	 *         tagName : 'a',
	 *         attrs   : { 'href': 'http://google.com', 'class': 'external-link' },
	 *         innerHtml : 'Google'
	 *     } );
	 *
	 *     tag.toAnchorString();  // <a href="http://google.com" class="external-link">Google</a>
	 *
	 *     // Individual accessor methods
	 *     tag.getTagName();                 // 'a'
	 *     tag.getAttr( 'href' );            // 'http://google.com'
	 *     tag.hasClass( 'external-link' );  // true
	 *
	 *
	 * Using mutator methods (which may be used in combination with instantiation config properties):
	 *
	 *     var tag = new Autolinker.HtmlTag();
	 *     tag.setTagName( 'a' );
	 *     tag.setAttr( 'href', 'http://google.com' );
	 *     tag.addClass( 'external-link' );
	 *     tag.setInnerHtml( 'Google' );
	 *
	 *     tag.getTagName();                 // 'a'
	 *     tag.getAttr( 'href' );            // 'http://google.com'
	 *     tag.hasClass( 'external-link' );  // true
	 *
	 *     tag.toAnchorString();  // <a href="http://google.com" class="external-link">Google</a>
	 *
	 *
	 * ## Example use within a {@link Autolinker#replaceFn replaceFn}
	 *
	 *     var html = Autolinker.link( "Test google.com", {
	 *         replaceFn : function( autolinker, match ) {
	 *             var tag = match.buildTag();  // returns an {@link Autolinker.HtmlTag} instance, configured with the Match's href and anchor text
	 *             tag.setAttr( 'rel', 'nofollow' );
	 *
	 *             return tag;
	 *         }
	 *     } );
	 *
	 *     // generated html:
	 *     //   Test <a href="http://google.com" target="_blank" rel="nofollow">google.com</a>
	 *
	 *
	 * ## Example use with a new tag for the replacement
	 *
	 *     var html = Autolinker.link( "Test google.com", {
	 *         replaceFn : function( autolinker, match ) {
	 *             var tag = new Autolinker.HtmlTag( {
	 *                 tagName : 'button',
	 *                 attrs   : { 'title': 'Load URL: ' + match.getAnchorHref() },
	 *                 innerHtml : 'Load URL: ' + match.getAnchorText()
	 *             } );
	 *
	 *             return tag;
	 *         }
	 *     } );
	 *
	 *     // generated html:
	 *     //   Test <button title="Load URL: http://google.com">Load URL: google.com</button>
	 */
	Autolinker.HtmlTag = Autolinker.Util.extend( Object, {

		/**
		 * @cfg {String} tagName
		 *
		 * The tag name. Ex: 'a', 'button', etc.
		 *
		 * Not required at instantiation time, but should be set using {@link #setTagName} before {@link #toAnchorString}
		 * is executed.
		 */

		/**
		 * @cfg {Object.<String, String>} attrs
		 *
		 * An key/value Object (map) of attributes to create the tag with. The keys are the attribute names, and the
		 * values are the attribute values.
		 */

		/**
		 * @cfg {String} innerHtml
		 *
		 * The inner HTML for the tag.
		 *
		 * Note the camel case name on `innerHtml`. Acronyms are camelCased in this utility (such as not to run into the acronym
		 * naming inconsistency that the DOM developers created with `XMLHttpRequest`). You may alternatively use {@link #innerHTML}
		 * if you prefer, but this one is recommended.
		 */

		/**
		 * @cfg {String} innerHTML
		 *
		 * Alias of {@link #innerHtml}, accepted for consistency with the browser DOM api, but prefer the camelCased version
		 * for acronym names.
		 */


		/**
		 * @protected
		 * @property {RegExp} whitespaceRegex
		 *
		 * Regular expression used to match whitespace in a string of CSS classes.
		 */
		whitespaceRegex : /\s+/,


		/**
		 * @constructor
		 * @param {Object} [cfg] The configuration properties for this class, in an Object (map)
		 */
		constructor : function( cfg ) {
			Autolinker.Util.assign( this, cfg );

			this.innerHtml = this.innerHtml || this.innerHTML;  // accept either the camelCased form or the fully capitalized acronym
		},


		/**
		 * Sets the tag name that will be used to generate the tag with.
		 *
		 * @param {String} tagName
		 * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
		 */
		setTagName : function( tagName ) {
			this.tagName = tagName;
			return this;
		},


		/**
		 * Retrieves the tag name.
		 *
		 * @return {String}
		 */
		getTagName : function() {
			return this.tagName || "";
		},


		/**
		 * Sets an attribute on the HtmlTag.
		 *
		 * @param {String} attrName The attribute name to set.
		 * @param {String} attrValue The attribute value to set.
		 * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
		 */
		setAttr : function( attrName, attrValue ) {
			var tagAttrs = this.getAttrs();
			tagAttrs[ attrName ] = attrValue;

			return this;
		},


		/**
		 * Retrieves an attribute from the HtmlTag. If the attribute does not exist, returns `undefined`.
		 *
		 * @param {String} attrName The attribute name to retrieve.
		 * @return {String} The attribute's value, or `undefined` if it does not exist on the HtmlTag.
		 */
		getAttr : function( attrName ) {
			return this.getAttrs()[ attrName ];
		},


		/**
		 * Sets one or more attributes on the HtmlTag.
		 *
		 * @param {Object.<String, String>} attrs A key/value Object (map) of the attributes to set.
		 * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
		 */
		setAttrs : function( attrs ) {
			var tagAttrs = this.getAttrs();
			Autolinker.Util.assign( tagAttrs, attrs );

			return this;
		},


		/**
		 * Retrieves the attributes Object (map) for the HtmlTag.
		 *
		 * @return {Object.<String, String>} A key/value object of the attributes for the HtmlTag.
		 */
		getAttrs : function() {
			return this.attrs || ( this.attrs = {} );
		},


		/**
		 * Sets the provided `cssClass`, overwriting any current CSS classes on the HtmlTag.
		 *
		 * @param {String} cssClass One or more space-separated CSS classes to set (overwrite).
		 * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
		 */
		setClass : function( cssClass ) {
			return this.setAttr( 'class', cssClass );
		},


		/**
		 * Convenience method to add one or more CSS classes to the HtmlTag. Will not add duplicate CSS classes.
		 *
		 * @param {String} cssClass One or more space-separated CSS classes to add.
		 * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
		 */
		addClass : function( cssClass ) {
			var classAttr = this.getClass(),
			    whitespaceRegex = this.whitespaceRegex,
			    indexOf = Autolinker.Util.indexOf,  // to support IE8 and below
			    classes = ( !classAttr ) ? [] : classAttr.split( whitespaceRegex ),
			    newClasses = cssClass.split( whitespaceRegex ),
			    newClass;

			while( newClass = newClasses.shift() ) {
				if( indexOf( classes, newClass ) === -1 ) {
					classes.push( newClass );
				}
			}

			this.getAttrs()[ 'class' ] = classes.join( " " );
			return this;
		},


		/**
		 * Convenience method to remove one or more CSS classes from the HtmlTag.
		 *
		 * @param {String} cssClass One or more space-separated CSS classes to remove.
		 * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
		 */
		removeClass : function( cssClass ) {
			var classAttr = this.getClass(),
			    whitespaceRegex = this.whitespaceRegex,
			    indexOf = Autolinker.Util.indexOf,  // to support IE8 and below
			    classes = ( !classAttr ) ? [] : classAttr.split( whitespaceRegex ),
			    removeClasses = cssClass.split( whitespaceRegex ),
			    removeClass;

			while( classes.length && ( removeClass = removeClasses.shift() ) ) {
				var idx = indexOf( classes, removeClass );
				if( idx !== -1 ) {
					classes.splice( idx, 1 );
				}
			}

			this.getAttrs()[ 'class' ] = classes.join( " " );
			return this;
		},


		/**
		 * Convenience method to retrieve the CSS class(es) for the HtmlTag, which will each be separated by spaces when
		 * there are multiple.
		 *
		 * @return {String}
		 */
		getClass : function() {
			return this.getAttrs()[ 'class' ] || "";
		},


		/**
		 * Convenience method to check if the tag has a CSS class or not.
		 *
		 * @param {String} cssClass The CSS class to check for.
		 * @return {Boolean} `true` if the HtmlTag has the CSS class, `false` otherwise.
		 */
		hasClass : function( cssClass ) {
			return ( ' ' + this.getClass() + ' ' ).indexOf( ' ' + cssClass + ' ' ) !== -1;
		},


		/**
		 * Sets the inner HTML for the tag.
		 *
		 * @param {String} html The inner HTML to set.
		 * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
		 */
		setInnerHtml : function( html ) {
			this.innerHtml = html;

			return this;
		},


		/**
		 * Retrieves the inner HTML for the tag.
		 *
		 * @return {String}
		 */
		getInnerHtml : function() {
			return this.innerHtml || "";
		},


		/**
		 * Override of superclass method used to generate the HTML string for the tag.
		 *
		 * @return {String}
		 */
		toAnchorString : function() {
			var tagName = this.getTagName(),
			    attrsStr = this.buildAttrsStr();

			attrsStr = ( attrsStr ) ? ' ' + attrsStr : '';  // prepend a space if there are actually attributes

			return [ '<', tagName, attrsStr, '>', this.getInnerHtml(), '</', tagName, '>' ].join( "" );
		},


		/**
		 * Support method for {@link #toAnchorString}, returns the string space-separated key="value" pairs, used to populate
		 * the stringified HtmlTag.
		 *
		 * @protected
		 * @return {String} Example return: `attr1="value1" attr2="value2"`
		 */
		buildAttrsStr : function() {
			if( !this.attrs ) return "";  // no `attrs` Object (map) has been set, return empty string

			var attrs = this.getAttrs(),
			    attrsArr = [];

			for( var prop in attrs ) {
				if( attrs.hasOwnProperty( prop ) ) {
					attrsArr.push( prop + '="' + attrs[ prop ] + '"' );
				}
			}
			return attrsArr.join( " " );
		}

	} );

	/*global Autolinker */
	/**
	 * @class Autolinker.RegexLib
	 * @singleton
	 *
	 * Builds and stores a library of the common regular expressions used by the
	 * Autolinker utility.
	 *
	 * Other regular expressions may exist ad-hoc, but these are generally the
	 * regular expressions that are shared between source files.
	 */
	Autolinker.RegexLib = (function() {

		/**
		 * The string form of a regular expression that would match all of the
		 * alphabetic ("letter") chars in the unicode character set when placed in a
		 * RegExp character class (`[]`). This includes all international alphabetic
		 * characters.
		 *
		 * These would be the characters matched by unicode regex engines `\p{L}`
		 * escape ("all letters").
		 *
		 * Taken from the XRegExp library: http://xregexp.com/
		 * Specifically: http://xregexp.com/v/3.0.0/unicode-categories.js
		 *
		 * @private
		 * @type {String}
		 */
		var alphaCharsStr = 'A-Za-z\\xAA\\xB5\\xBA\\xC0-\\xD6\\xD8-\\xF6\\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC';

		/**
		 * The string form of a regular expression that would match all of the
		 * decimal number chars in the unicode character set when placed in a RegExp
		 * character class (`[]`).
		 *
		 * These would be the characters matched by unicode regex engines `\p{Nd}`
		 * escape ("all decimal numbers")
		 *
		 * Taken from the XRegExp library: http://xregexp.com/
		 * Specifically: http://xregexp.com/v/3.0.0/unicode-categories.js
		 *
		 * @private
		 * @type {String}
		 */
		var decimalNumbersStr = '0-9\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19';


		// See documentation below
		var alphaNumericCharsStr = alphaCharsStr + decimalNumbersStr;


		// See documentation below
		var domainNameRegex = new RegExp( '[' + alphaNumericCharsStr + '.\\-]*[' + alphaNumericCharsStr + '\\-]' );


		// See documentation below
		var tldRegex = /(?:travelersinsurance|sandvikcoromant|kerryproperties|cancerresearch|weatherchannel|kerrylogistics|spreadbetting|international|wolterskluwer|lifeinsurance|construction|pamperedchef|scholarships|versicherung|bridgestone|creditunion|kerryhotels|investments|productions|blackfriday|enterprises|lamborghini|photography|motorcycles|williamhill|playstation|contractors|barclaycard|accountants|redumbrella|engineering|management|telefonica|protection|consulting|tatamotors|creditcard|vlaanderen|schaeffler|associates|properties|foundation|republican|bnpparibas|boehringer|eurovision|extraspace|industries|immobilien|university|technology|volkswagen|healthcare|restaurant|cuisinella|vistaprint|apartments|accountant|travelers|homedepot|institute|vacations|furniture|fresenius|insurance|christmas|bloomberg|solutions|barcelona|firestone|financial|kuokgroup|fairwinds|community|passagens|goldpoint|equipment|lifestyle|yodobashi|aquarelle|marketing|analytics|education|amsterdam|statefarm|melbourne|allfinanz|directory|microsoft|stockholm|montblanc|accenture|lancaster|landrover|everbank|istanbul|graphics|grainger|ipiranga|softbank|attorney|pharmacy|saarland|catering|airforce|yokohama|mortgage|frontier|mutuelle|stcgroup|memorial|pictures|football|symantec|cipriani|ventures|telecity|cityeats|verisign|flsmidth|boutique|cleaning|firmdale|clinique|clothing|redstone|infiniti|deloitte|feedback|services|broadway|plumbing|commbank|training|barclays|exchange|computer|brussels|software|delivery|barefoot|builders|business|bargains|engineer|holdings|download|security|helsinki|lighting|movistar|discount|hdfcbank|supplies|marriott|property|diamonds|capetown|partners|democrat|jpmorgan|bradesco|budapest|rexroth|zuerich|shriram|academy|science|support|youtube|singles|surgery|alibaba|statoil|dentist|schwarz|android|cruises|cricket|digital|markets|starhub|systems|courses|coupons|netbank|country|domains|corsica|network|neustar|realtor|lincoln|limited|schmidt|yamaxun|cooking|contact|auction|spiegel|liaison|leclerc|latrobe|lasalle|abogado|compare|lanxess|exposed|express|company|cologne|college|avianca|lacaixa|fashion|recipes|ferrero|komatsu|storage|wanggou|clubmed|sandvik|fishing|fitness|bauhaus|kitchen|flights|florist|flowers|watches|weather|temasek|samsung|bentley|forsale|channel|theater|frogans|theatre|okinawa|website|tickets|jewelry|gallery|tiffany|iselect|shiksha|brother|organic|wedding|genting|toshiba|origins|philips|hyundai|hotmail|hoteles|hosting|rentals|windows|cartier|bugatti|holiday|careers|whoswho|hitachi|panerai|caravan|reviews|guitars|capital|trading|hamburg|hangout|finance|stream|family|abbott|health|review|travel|report|hermes|hiphop|gratis|career|toyota|hockey|dating|repair|google|social|soccer|reisen|global|otsuka|giving|unicom|casino|photos|center|broker|rocher|orange|bostik|garden|insure|ryukyu|bharti|safety|physio|sakura|oracle|online|jaguar|gallup|piaget|tienda|futbol|pictet|joburg|webcam|berlin|office|juegos|kaufen|chanel|chrome|xihuan|church|tennis|circle|kinder|flickr|bayern|claims|clinic|viajes|nowruz|xperia|norton|yachts|studio|coffee|camera|sanofi|nissan|author|expert|events|comsec|lawyer|tattoo|viking|estate|villas|condos|realty|yandex|energy|emerck|virgin|vision|durban|living|school|coupon|london|taobao|natura|taipei|nagoya|luxury|walter|aramco|sydney|madrid|credit|maison|makeup|schule|market|anquan|direct|design|swatch|suzuki|alsace|vuelos|dental|alipay|voyage|shouji|voting|airtel|mutual|degree|supply|agency|museum|mobily|dealer|monash|select|mormon|active|moscow|racing|datsun|quebec|nissay|rodeo|email|gifts|works|photo|chloe|edeka|cheap|earth|vista|tushu|koeln|glass|shoes|globo|tunes|gmail|nokia|space|kyoto|black|ricoh|seven|lamer|sener|epson|cisco|praxi|trust|citic|crown|shell|lease|green|legal|lexus|ninja|tatar|gripe|nikon|group|video|wales|autos|gucci|party|nexus|guide|linde|adult|parts|amica|lixil|boats|azure|loans|locus|cymru|lotte|lotto|stada|click|poker|quest|dabur|lupin|nadex|paris|faith|dance|canon|place|gives|trade|skype|rocks|mango|cloud|boots|smile|final|swiss|homes|honda|media|horse|cards|deals|watch|bosch|house|pizza|miami|osaka|tours|total|xerox|coach|sucks|style|delta|toray|iinet|tools|money|codes|beats|tokyo|salon|archi|movie|baidu|study|actor|yahoo|store|apple|world|forex|today|bible|tmall|tirol|irish|tires|forum|reise|vegas|vodka|sharp|omega|weber|jetzt|audio|promo|build|bingo|chase|gallo|drive|dubai|rehab|press|solar|sale|beer|bbva|bank|band|auto|sapo|sarl|saxo|audi|asia|arte|arpa|army|yoga|ally|zara|scor|scot|sexy|seat|zero|seek|aero|adac|zone|aarp|maif|meet|meme|menu|surf|mini|mobi|mtpc|porn|desi|star|ltda|name|talk|navy|love|loan|live|link|news|limo|like|spot|life|nico|lidl|lgbt|land|taxi|team|tech|kred|kpmg|sony|song|kiwi|kddi|jprs|jobs|sohu|java|itau|tips|info|immo|icbc|hsbc|town|host|page|toys|here|help|pars|haus|guru|guge|tube|goog|golf|gold|sncf|gmbh|gift|ggee|gent|gbiz|game|vana|pics|fund|ford|ping|pink|fish|film|fast|farm|play|fans|fail|plus|skin|pohl|fage|moda|post|erni|dvag|prod|doha|prof|docs|viva|diet|luxe|site|dell|sina|dclk|show|qpon|date|vote|cyou|voto|read|coop|cool|wang|club|city|chat|cern|cash|reit|rent|casa|cars|care|camp|rest|call|cafe|weir|wien|rich|wiki|buzz|wine|book|bond|room|work|rsvp|shia|ruhr|blue|bing|shaw|bike|safe|xbox|best|pwc|mtn|lds|aig|boo|fyi|nra|nrw|ntt|car|gal|obi|zip|aeg|vin|how|one|ong|onl|dad|ooo|bet|esq|org|htc|bar|uol|ibm|ovh|gdn|ice|icu|uno|gea|ifm|bot|top|wtf|lol|day|pet|eus|wtc|ubs|tvs|aco|ing|ltd|ink|tab|abb|afl|cat|int|pid|pin|bid|cba|gle|com|cbn|ads|man|wed|ceb|gmo|sky|ist|gmx|tui|mba|fan|ski|iwc|app|pro|med|ceo|jcb|jcp|goo|dev|men|aaa|meo|pub|jlc|bom|jll|gop|jmp|mil|got|gov|win|jot|mma|joy|trv|red|cfa|cfd|bio|moe|moi|mom|ren|biz|aws|xin|bbc|dnp|buy|kfh|mov|thd|xyz|fit|kia|rio|rip|kim|dog|vet|nyc|bcg|mtr|bcn|bms|bmw|run|bzh|rwe|tel|stc|axa|kpn|fly|krd|cab|bnl|foo|crs|eat|tci|sap|srl|nec|sas|net|cal|sbs|sfr|sca|scb|csc|edu|new|xxx|hiv|fox|wme|ngo|nhk|vip|sex|frl|lat|yun|law|you|tax|soy|sew|om|ac|hu|se|sc|sg|sh|sb|sa|rw|ru|rs|ro|re|qa|py|si|pw|pt|ps|sj|sk|pr|pn|pm|pl|sl|sm|pk|sn|ph|so|pg|pf|pe|pa|zw|nz|nu|nr|np|no|nl|ni|ng|nf|sr|ne|st|nc|na|mz|my|mx|mw|mv|mu|mt|ms|mr|mq|mp|mo|su|mn|mm|ml|mk|mh|mg|me|sv|md|mc|sx|sy|ma|ly|lv|sz|lu|lt|ls|lr|lk|li|lc|lb|la|tc|kz|td|ky|kw|kr|kp|kn|km|ki|kh|tf|tg|th|kg|ke|jp|jo|jm|je|it|is|ir|tj|tk|tl|tm|iq|tn|to|io|in|im|il|ie|ad|sd|ht|hr|hn|hm|tr|hk|gy|gw|gu|gt|gs|gr|gq|tt|gp|gn|gm|gl|tv|gi|tw|tz|ua|gh|ug|uk|gg|gf|ge|gd|us|uy|uz|va|gb|ga|vc|ve|fr|fo|fm|fk|fj|vg|vi|fi|eu|et|es|er|eg|ee|ec|dz|do|dm|dk|vn|dj|de|cz|cy|cx|cw|vu|cv|cu|cr|co|cn|cm|cl|ck|ci|ch|cg|cf|cd|cc|ca|wf|bz|by|bw|bv|bt|bs|br|bo|bn|bm|bj|bi|ws|bh|bg|bf|be|bd|bb|ba|az|ax|aw|au|at|as|ye|ar|aq|ao|am|al|yt|ai|za|ag|af|ae|zm|id)\b/;


		return {

			/**
			 * The string form of a regular expression that would match all of the
			 * letters and decimal number chars in the unicode character set when placed
			 * in a RegExp character class (`[]`).
			 *
			 * These would be the characters matched by unicode regex engines `[\p{L}\p{Nd}]`
			 * escape ("all letters and decimal numbers")
			 *
			 * @property {String} alphaNumericCharsStr
			 */
			alphaNumericCharsStr : alphaNumericCharsStr,

			/**
			 * A regular expression to match domain names of a URL or email address.
			 * Ex: 'google', 'yahoo', 'some-other-company', etc.
			 *
			 * @property {RegExp} domainNameRegex
			 */
			domainNameRegex : domainNameRegex,

			/**
			 * A regular expression to match top level domains (TLDs) for a URL or
			 * email address. Ex: 'com', 'org', 'net', etc.
			 *
			 * @property {RegExp} tldRegex
			 */
			tldRegex : tldRegex

		};


	}() );
	/*global Autolinker */
	/*jshint sub:true */
	/**
	 * @protected
	 * @class Autolinker.AnchorTagBuilder
	 * @extends Object
	 *
	 * Builds anchor (&lt;a&gt;) tags for the Autolinker utility when a match is
	 * found.
	 *
	 * Normally this class is instantiated, configured, and used internally by an
	 * {@link Autolinker} instance, but may actually be retrieved in a {@link Autolinker#replaceFn replaceFn}
	 * to create {@link Autolinker.HtmlTag HtmlTag} instances which may be modified
	 * before returning from the {@link Autolinker#replaceFn replaceFn}. For
	 * example:
	 *
	 *     var html = Autolinker.link( "Test google.com", {
	 *         replaceFn : function( autolinker, match ) {
	 *             var tag = autolinker.getTagBuilder().build( match );  // returns an {@link Autolinker.HtmlTag} instance
	 *             tag.setAttr( 'rel', 'nofollow' );
	 *
	 *             return tag;
	 *         }
	 *     } );
	 *
	 *     // generated html:
	 *     //   Test <a href="http://google.com" target="_blank" rel="nofollow">google.com</a>
	 */
	Autolinker.AnchorTagBuilder = Autolinker.Util.extend( Object, {

		/**
		 * @cfg {Boolean} newWindow
		 * @inheritdoc Autolinker#newWindow
		 */

		/**
		 * @cfg {Object} truncate
		 * @inheritdoc Autolinker#truncate
		 */

		/**
		 * @cfg {String} className
		 * @inheritdoc Autolinker#className
		 */


		/**
		 * @constructor
		 * @param {Object} [cfg] The configuration options for the AnchorTagBuilder instance, specified in an Object (map).
		 */
		constructor : function( cfg ) {
			Autolinker.Util.assign( this, cfg );
		},


		/**
		 * Generates the actual anchor (&lt;a&gt;) tag to use in place of the
		 * matched text, via its `match` object.
		 *
		 * @param {Autolinker.match.Match} match The Match instance to generate an
		 *   anchor tag from.
		 * @return {Autolinker.HtmlTag} The HtmlTag instance for the anchor tag.
		 */
		build : function( match ) {
			return new Autolinker.HtmlTag( {
				tagName   : 'a',
				attrs     : this.createAttrs( match.getType(), match.getAnchorHref() ),
				innerHtml : this.processAnchorText( match.getAnchorText() )
			} );
		},


		/**
		 * Creates the Object (map) of the HTML attributes for the anchor (&lt;a&gt;)
		 *   tag being generated.
		 *
		 * @protected
		 * @param {"url"/"email"/"phone"/"twitter"/"hashtag"} matchType The type of
		 *   match that an anchor tag is being generated for.
		 * @param {String} anchorHref The href for the anchor tag.
		 * @return {Object} A key/value Object (map) of the anchor tag's attributes.
		 */
		createAttrs : function( matchType, anchorHref ) {
			var attrs = {
				'href' : anchorHref  // we'll always have the `href` attribute
			};

			var cssClass = this.createCssClass( matchType );
			if( cssClass ) {
				attrs[ 'class' ] = cssClass;
			}
			if( this.newWindow ) {
				attrs[ 'target' ] = "_blank";
				attrs[ 'rel' ] = "noopener noreferrer";
			}

			return attrs;
		},


		/**
		 * Creates the CSS class that will be used for a given anchor tag, based on
		 * the `matchType` and the {@link #className} config.
		 *
		 * @private
		 * @param {"url"/"email"/"phone"/"twitter"/"hashtag"} matchType The type of
		 *   match that an anchor tag is being generated for.
		 * @return {String} The CSS class string for the link. Example return:
		 *   "myLink myLink-url". If no {@link #className} was configured, returns
		 *   an empty string.
		 */
		createCssClass : function( matchType ) {
			var className = this.className;

			if( !className )
				return "";
			else
				return className + " " + className + "-" + matchType;  // ex: "myLink myLink-url", "myLink myLink-email", "myLink myLink-phone", "myLink myLink-twitter", or "myLink myLink-hashtag"
		},


		/**
		 * Processes the `anchorText` by truncating the text according to the
		 * {@link #truncate} config.
		 *
		 * @private
		 * @param {String} anchorText The anchor tag's text (i.e. what will be
		 *   displayed).
		 * @return {String} The processed `anchorText`.
		 */
		processAnchorText : function( anchorText ) {
			anchorText = this.doTruncate( anchorText );

			return anchorText;
		},


		/**
		 * Performs the truncation of the `anchorText` based on the {@link #truncate}
		 * option. If the `anchorText` is longer than the length specified by the
		 * {@link #truncate} option, the truncation is performed based on the
		 * `location` property. See {@link #truncate} for details.
		 *
		 * @private
		 * @param {String} anchorText The anchor tag's text (i.e. what will be
		 *   displayed).
		 * @return {String} The truncated anchor text.
		 */
		doTruncate : function( anchorText ) {
			var truncate = this.truncate;
			if( !truncate || !truncate.length ) return anchorText;

			var truncateLength = truncate.length,
				truncateLocation = truncate.location;

			if( truncateLocation === 'smart' ) {
				return Autolinker.truncate.TruncateSmart( anchorText, truncateLength, '..' );

			} else if( truncateLocation === 'middle' ) {
				return Autolinker.truncate.TruncateMiddle( anchorText, truncateLength, '..' );

			} else {
				return Autolinker.truncate.TruncateEnd( anchorText, truncateLength, '..' );
			}
		}

	} );

	/*global Autolinker */
	/**
	 * @class Autolinker.htmlParser.HtmlParser
	 * @extends Object
	 *
	 * An HTML parser implementation which simply walks an HTML string and returns an array of
	 * {@link Autolinker.htmlParser.HtmlNode HtmlNodes} that represent the basic HTML structure of the input string.
	 *
	 * Autolinker uses this to only link URLs/emails/Twitter handles within text nodes, effectively ignoring / "walking
	 * around" HTML tags.
	 */
	Autolinker.htmlParser.HtmlParser = Autolinker.Util.extend( Object, {

		/**
		 * @private
		 * @property {RegExp} htmlRegex
		 *
		 * The regular expression used to pull out HTML tags from a string. Handles namespaced HTML tags and
		 * attribute names, as specified by http://www.w3.org/TR/html-markup/syntax.html.
		 *
		 * Capturing groups:
		 *
		 * 1. The "!DOCTYPE" tag name, if a tag is a &lt;!DOCTYPE&gt; tag.
		 * 2. If it is an end tag, this group will have the '/'.
		 * 3. If it is a comment tag, this group will hold the comment text (i.e.
		 *    the text inside the `&lt;!--` and `--&gt;`.
		 * 4. The tag name for all tags (other than the &lt;!DOCTYPE&gt; tag)
		 */
		htmlRegex : (function() {
			var commentTagRegex = /!--([\s\S]+?)--/,
			    tagNameRegex = /[0-9a-zA-Z][0-9a-zA-Z:]*/,
			    attrNameRegex = /[^\s"'>\/=\x00-\x1F\x7F]+/,   // the unicode range accounts for excluding control chars, and the delete char
			    attrValueRegex = /(?:"[^"]*?"|'[^']*?'|[^'"=<>`\s]+)/, // double quoted, single quoted, or unquoted attribute values
			    nameEqualsValueRegex = attrNameRegex.source + '(?:\\s*=\\s*' + attrValueRegex.source + ')?';  // optional '=[value]'

			return new RegExp( [
				// for <!DOCTYPE> tag. Ex: <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">)
				'(?:',
					'<(!DOCTYPE)',  // *** Capturing Group 1 - If it's a doctype tag

						// Zero or more attributes following the tag name
						'(?:',
							'\\s+',  // one or more whitespace chars before an attribute

							// Either:
							// A. attr="value", or
							// B. "value" alone (To cover example doctype tag: <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">)
							'(?:', nameEqualsValueRegex, '|', attrValueRegex.source + ')',
						')*',
					'>',
				')',

				'|',

				// All other HTML tags (i.e. tags that are not <!DOCTYPE>)
				'(?:',
					'<(/)?',  // Beginning of a tag or comment. Either '<' for a start tag, or '</' for an end tag.
					          // *** Capturing Group 2: The slash or an empty string. Slash ('/') for end tag, empty string for start or self-closing tag.

						'(?:',
							commentTagRegex.source,  // *** Capturing Group 3 - A Comment Tag's Text

							'|',

							'(?:',

								// *** Capturing Group 4 - The tag name
								'(' + tagNameRegex.source + ')',

								// Zero or more attributes following the tag name
								'(?:',
									'(?:\\s+|\\b)',        // any number of whitespace chars before an attribute. NOTE: Using \s* here throws Chrome into an infinite loop for some reason, so using \s+|\b instead
									nameEqualsValueRegex,  // attr="value" (with optional ="value" part)
								')*',

								'\\s*/?',  // any trailing spaces and optional '/' before the closing '>'

							')',
						')',
					'>',
				')'
			].join( "" ), 'gi' );
		} )(),

		/**
		 * @private
		 * @property {RegExp} htmlCharacterEntitiesRegex
		 *
		 * The regular expression that matches common HTML character entities.
		 *
		 * Ignoring &amp; as it could be part of a query string -- handling it separately.
		 */
		htmlCharacterEntitiesRegex: /(&nbsp;|&#160;|&lt;|&#60;|&gt;|&#62;|&quot;|&#34;|&#39;)/gi,


		/**
		 * Parses an HTML string and returns a simple array of {@link Autolinker.htmlParser.HtmlNode HtmlNodes}
		 * to represent the HTML structure of the input string.
		 *
		 * @param {String} html The HTML to parse.
		 * @return {Autolinker.htmlParser.HtmlNode[]}
		 */
		parse : function( html ) {
			var htmlRegex = this.htmlRegex,
			    currentResult,
			    lastIndex = 0,
			    textAndEntityNodes,
			    nodes = [];  // will be the result of the method

			while( ( currentResult = htmlRegex.exec( html ) ) !== null ) {
				var tagText = currentResult[ 0 ],
				    commentText = currentResult[ 3 ], // if we've matched a comment
				    tagName = currentResult[ 1 ] || currentResult[ 4 ],  // The <!DOCTYPE> tag (ex: "!DOCTYPE"), or another tag (ex: "a" or "img")
				    isClosingTag = !!currentResult[ 2 ],
				    offset = currentResult.index,
				    inBetweenTagsText = html.substring( lastIndex, offset );

				// Push TextNodes and EntityNodes for any text found between tags
				if( inBetweenTagsText ) {
					textAndEntityNodes = this.parseTextAndEntityNodes( lastIndex, inBetweenTagsText );
					nodes.push.apply( nodes, textAndEntityNodes );
				}

				// Push the CommentNode or ElementNode
				if( commentText ) {
					nodes.push( this.createCommentNode( offset, tagText, commentText ) );
				} else {
					nodes.push( this.createElementNode( offset, tagText, tagName, isClosingTag ) );
				}

				lastIndex = offset + tagText.length;
			}

			// Process any remaining text after the last HTML element. Will process all of the text if there were no HTML elements.
			if( lastIndex < html.length ) {
				var text = html.substring( lastIndex );

				// Push TextNodes and EntityNodes for any text found between tags
				if( text ) {
					textAndEntityNodes = this.parseTextAndEntityNodes( lastIndex, text );
					nodes.push.apply( nodes, textAndEntityNodes );
				}
			}

			return nodes;
		},


		/**
		 * Parses text and HTML entity nodes from a given string. The input string
		 * should not have any HTML tags (elements) within it.
		 *
		 * @private
		 * @param {Number} offset The offset of the text node match within the
		 *   original HTML string.
		 * @param {String} text The string of text to parse. This is from an HTML
		 *   text node.
		 * @return {Autolinker.htmlParser.HtmlNode[]} An array of HtmlNodes to
		 *   represent the {@link Autolinker.htmlParser.TextNode TextNodes} and
		 *   {@link Autolinker.htmlParser.EntityNode EntityNodes} found.
		 */
		parseTextAndEntityNodes : function( offset, text ) {
			var nodes = [],
			    textAndEntityTokens = Autolinker.Util.splitAndCapture( text, this.htmlCharacterEntitiesRegex );  // split at HTML entities, but include the HTML entities in the results array

			// Every even numbered token is a TextNode, and every odd numbered token is an EntityNode
			// For example: an input `text` of "Test &quot;this&quot; today" would turn into the
			//   `textAndEntityTokens`: [ 'Test ', '&quot;', 'this', '&quot;', ' today' ]
			for( var i = 0, len = textAndEntityTokens.length; i < len; i += 2 ) {
				var textToken = textAndEntityTokens[ i ],
				    entityToken = textAndEntityTokens[ i + 1 ];

				if( textToken ) {
					nodes.push( this.createTextNode( offset, textToken ) );
					offset += textToken.length;
				}
				if( entityToken ) {
					nodes.push( this.createEntityNode( offset, entityToken ) );
					offset += entityToken.length;
				}
			}
			return nodes;
		},


		/**
		 * Factory method to create an {@link Autolinker.htmlParser.CommentNode CommentNode}.
		 *
		 * @private
		 * @param {Number} offset The offset of the match within the original HTML
		 *   string.
		 * @param {String} tagText The full text of the tag (comment) that was
		 *   matched, including its &lt;!-- and --&gt;.
		 * @param {String} commentText The full text of the comment that was matched.
		 */
		createCommentNode : function( offset, tagText, commentText ) {
			return new Autolinker.htmlParser.CommentNode( {
				offset : offset,
				text   : tagText,
				comment: Autolinker.Util.trim( commentText )
			} );
		},


		/**
		 * Factory method to create an {@link Autolinker.htmlParser.ElementNode ElementNode}.
		 *
		 * @private
		 * @param {Number} offset The offset of the match within the original HTML
		 *   string.
		 * @param {String} tagText The full text of the tag (element) that was
		 *   matched, including its attributes.
		 * @param {String} tagName The name of the tag. Ex: An &lt;img&gt; tag would
		 *   be passed to this method as "img".
		 * @param {Boolean} isClosingTag `true` if it's a closing tag, false
		 *   otherwise.
		 * @return {Autolinker.htmlParser.ElementNode}
		 */
		createElementNode : function( offset, tagText, tagName, isClosingTag ) {
			return new Autolinker.htmlParser.ElementNode( {
				offset  : offset,
				text    : tagText,
				tagName : tagName.toLowerCase(),
				closing : isClosingTag
			} );
		},


		/**
		 * Factory method to create a {@link Autolinker.htmlParser.EntityNode EntityNode}.
		 *
		 * @private
		 * @param {Number} offset The offset of the match within the original HTML
		 *   string.
		 * @param {String} text The text that was matched for the HTML entity (such
		 *   as '&amp;nbsp;').
		 * @return {Autolinker.htmlParser.EntityNode}
		 */
		createEntityNode : function( offset, text ) {
			return new Autolinker.htmlParser.EntityNode( { offset: offset, text: text } );
		},


		/**
		 * Factory method to create a {@link Autolinker.htmlParser.TextNode TextNode}.
		 *
		 * @private
		 * @param {Number} offset The offset of the match within the original HTML
		 *   string.
		 * @param {String} text The text that was matched.
		 * @return {Autolinker.htmlParser.TextNode}
		 */
		createTextNode : function( offset, text ) {
			return new Autolinker.htmlParser.TextNode( { offset: offset, text: text } );
		}

	} );
	/*global Autolinker */
	/**
	 * @abstract
	 * @class Autolinker.htmlParser.HtmlNode
	 *
	 * Represents an HTML node found in an input string. An HTML node is one of the
	 * following:
	 *
	 * 1. An {@link Autolinker.htmlParser.ElementNode ElementNode}, which represents
	 *    HTML tags.
	 * 2. A {@link Autolinker.htmlParser.CommentNode CommentNode}, which represents
	 *    HTML comments.
	 * 3. A {@link Autolinker.htmlParser.TextNode TextNode}, which represents text
	 *    outside or within HTML tags.
	 * 4. A {@link Autolinker.htmlParser.EntityNode EntityNode}, which represents
	 *    one of the known HTML entities that Autolinker looks for. This includes
	 *    common ones such as &amp;quot; and &amp;nbsp;
	 */
	Autolinker.htmlParser.HtmlNode = Autolinker.Util.extend( Object, {

		/**
		 * @cfg {Number} offset (required)
		 *
		 * The offset of the HTML node in the original text that was parsed.
		 */
		offset : undefined,

		/**
		 * @cfg {String} text (required)
		 *
		 * The text that was matched for the HtmlNode.
		 *
		 * - In the case of an {@link Autolinker.htmlParser.ElementNode ElementNode},
		 *   this will be the tag's text.
		 * - In the case of an {@link Autolinker.htmlParser.CommentNode CommentNode},
		 *   this will be the comment's text.
		 * - In the case of a {@link Autolinker.htmlParser.TextNode TextNode}, this
		 *   will be the text itself.
		 * - In the case of a {@link Autolinker.htmlParser.EntityNode EntityNode},
		 *   this will be the text of the HTML entity.
		 */
		text : undefined,


		/**
		 * @constructor
		 * @param {Object} cfg The configuration properties for the Match instance,
		 * specified in an Object (map).
		 */
		constructor : function( cfg ) {
			Autolinker.Util.assign( this, cfg );

			if( this.offset == null ) throw new Error( '`offset` cfg required' );
			if( this.text == null ) throw new Error( '`text` cfg required' );
		},


		/**
		 * Returns a string name for the type of node that this class represents.
		 *
		 * @abstract
		 * @return {String}
		 */
		getType : Autolinker.Util.abstractMethod,


		/**
		 * Retrieves the {@link #offset} of the HtmlNode. This is the offset of the
		 * HTML node in the original string that was parsed.
		 *
		 * @return {Number}
		 */
		getOffset : function() {
			return this.offset;
		},


		/**
		 * Retrieves the {@link #text} for the HtmlNode.
		 *
		 * @return {String}
		 */
		getText : function() {
			return this.text;
		}

	} );
	/*global Autolinker */
	/**
	 * @class Autolinker.htmlParser.CommentNode
	 * @extends Autolinker.htmlParser.HtmlNode
	 *
	 * Represents an HTML comment node that has been parsed by the
	 * {@link Autolinker.htmlParser.HtmlParser}.
	 *
	 * See this class's superclass ({@link Autolinker.htmlParser.HtmlNode}) for more
	 * details.
	 */
	Autolinker.htmlParser.CommentNode = Autolinker.Util.extend( Autolinker.htmlParser.HtmlNode, {

		/**
		 * @cfg {String} comment (required)
		 *
		 * The text inside the comment tag. This text is stripped of any leading or
		 * trailing whitespace.
		 */
		comment : '',


		/**
		 * Returns a string name for the type of node that this class represents.
		 *
		 * @return {String}
		 */
		getType : function() {
			return 'comment';
		},


		/**
		 * Returns the comment inside the comment tag.
		 *
		 * @return {String}
		 */
		getComment : function() {
			return this.comment;
		}

	} );
	/*global Autolinker */
	/**
	 * @class Autolinker.htmlParser.ElementNode
	 * @extends Autolinker.htmlParser.HtmlNode
	 *
	 * Represents an HTML element node that has been parsed by the {@link Autolinker.htmlParser.HtmlParser}.
	 *
	 * See this class's superclass ({@link Autolinker.htmlParser.HtmlNode}) for more
	 * details.
	 */
	Autolinker.htmlParser.ElementNode = Autolinker.Util.extend( Autolinker.htmlParser.HtmlNode, {

		/**
		 * @cfg {String} tagName (required)
		 *
		 * The name of the tag that was matched.
		 */
		tagName : '',

		/**
		 * @cfg {Boolean} closing (required)
		 *
		 * `true` if the element (tag) is a closing tag, `false` if its an opening
		 * tag.
		 */
		closing : false,


		/**
		 * Returns a string name for the type of node that this class represents.
		 *
		 * @return {String}
		 */
		getType : function() {
			return 'element';
		},


		/**
		 * Returns the HTML element's (tag's) name. Ex: for an &lt;img&gt; tag,
		 * returns "img".
		 *
		 * @return {String}
		 */
		getTagName : function() {
			return this.tagName;
		},


		/**
		 * Determines if the HTML element (tag) is a closing tag. Ex: &lt;div&gt;
		 * returns `false`, while &lt;/div&gt; returns `true`.
		 *
		 * @return {Boolean}
		 */
		isClosing : function() {
			return this.closing;
		}

	} );
	/*global Autolinker */
	/**
	 * @class Autolinker.htmlParser.EntityNode
	 * @extends Autolinker.htmlParser.HtmlNode
	 *
	 * Represents a known HTML entity node that has been parsed by the {@link Autolinker.htmlParser.HtmlParser}.
	 * Ex: '&amp;nbsp;', or '&amp#160;' (which will be retrievable from the {@link #getText}
	 * method.
	 *
	 * Note that this class will only be returned from the HtmlParser for the set of
	 * checked HTML entity nodes  defined by the {@link Autolinker.htmlParser.HtmlParser#htmlCharacterEntitiesRegex}.
	 *
	 * See this class's superclass ({@link Autolinker.htmlParser.HtmlNode}) for more
	 * details.
	 */
	Autolinker.htmlParser.EntityNode = Autolinker.Util.extend( Autolinker.htmlParser.HtmlNode, {

		/**
		 * Returns a string name for the type of node that this class represents.
		 *
		 * @return {String}
		 */
		getType : function() {
			return 'entity';
		}

	} );
	/*global Autolinker */
	/**
	 * @class Autolinker.htmlParser.TextNode
	 * @extends Autolinker.htmlParser.HtmlNode
	 *
	 * Represents a text node that has been parsed by the {@link Autolinker.htmlParser.HtmlParser}.
	 *
	 * See this class's superclass ({@link Autolinker.htmlParser.HtmlNode}) for more
	 * details.
	 */
	Autolinker.htmlParser.TextNode = Autolinker.Util.extend( Autolinker.htmlParser.HtmlNode, {

		/**
		 * Returns a string name for the type of node that this class represents.
		 *
		 * @return {String}
		 */
		getType : function() {
			return 'text';
		}

	} );
	/*global Autolinker */
	/**
	 * @abstract
	 * @class Autolinker.match.Match
	 *
	 * Represents a match found in an input string which should be Autolinked. A Match object is what is provided in a
	 * {@link Autolinker#replaceFn replaceFn}, and may be used to query for details about the match.
	 *
	 * For example:
	 *
	 *     var input = "...";  // string with URLs, Email Addresses, and Twitter Handles
	 *
	 *     var linkedText = Autolinker.link( input, {
	 *         replaceFn : function( autolinker, match ) {
	 *             console.log( "href = ", match.getAnchorHref() );
	 *             console.log( "text = ", match.getAnchorText() );
	 *
	 *             switch( match.getType() ) {
	 *                 case 'url' :
	 *                     console.log( "url: ", match.getUrl() );
	 *
	 *                 case 'email' :
	 *                     console.log( "email: ", match.getEmail() );
	 *
	 *                 case 'twitter' :
	 *                     console.log( "twitter: ", match.getTwitterHandle() );
	 *             }
	 *         }
	 *     } );
	 *
	 * See the {@link Autolinker} class for more details on using the {@link Autolinker#replaceFn replaceFn}.
	 */
	Autolinker.match.Match = Autolinker.Util.extend( Object, {

		/**
		 * @cfg {Autolinker.AnchorTagBuilder} tagBuilder (required)
		 *
		 * Reference to the AnchorTagBuilder instance to use to generate an anchor
		 * tag for the Match.
		 */

		/**
		 * @cfg {String} matchedText (required)
		 *
		 * The original text that was matched by the {@link Autolinker.matcher.Matcher}.
		 */

		/**
		 * @cfg {Number} offset (required)
		 *
		 * The offset of where the match was made in the input string.
		 */


		/**
		 * @constructor
		 * @param {Object} cfg The configuration properties for the Match
		 *   instance, specified in an Object (map).
		 */
		constructor : function( cfg ) {
			if( cfg.tagBuilder == null ) throw new Error( '`tagBuilder` cfg required' );
			if( cfg.matchedText == null ) throw new Error( '`matchedText` cfg required' );
			if( cfg.offset == null ) throw new Error( '`offset` cfg required' );

			this.tagBuilder = cfg.tagBuilder;
			this.matchedText = cfg.matchedText;
			this.offset = cfg.offset;
		},


		/**
		 * Returns a string name for the type of match that this class represents.
		 *
		 * @abstract
		 * @return {String}
		 */
		getType : Autolinker.Util.abstractMethod,


		/**
		 * Returns the original text that was matched.
		 *
		 * @return {String}
		 */
		getMatchedText : function() {
			return this.matchedText;
		},


		/**
		 * Sets the {@link #offset} of where the match was made in the input string.
		 *
		 * A {@link Autolinker.matcher.Matcher} will be fed only HTML text nodes,
		 * and will therefore set an original offset that is relative to the HTML
		 * text node itself. However, we want this offset to be relative to the full
		 * HTML input string, and thus if using {@link Autolinker#parse} (rather
		 * than calling a {@link Autolinker.matcher.Matcher} directly), then this
		 * offset is corrected after the Matcher itself has done its job.
		 *
		 * @param {Number} offset
		 */
		setOffset : function( offset ) {
			this.offset = offset;
		},


		/**
		 * Returns the offset of where the match was made in the input string. This
		 * is the 0-based index of the match.
		 *
		 * @return {Number}
		 */
		getOffset : function() {
			return this.offset;
		},


		/**
		 * Returns the anchor href that should be generated for the match.
		 *
		 * @abstract
		 * @return {String}
		 */
		getAnchorHref : Autolinker.Util.abstractMethod,


		/**
		 * Returns the anchor text that should be generated for the match.
		 *
		 * @abstract
		 * @return {String}
		 */
		getAnchorText : Autolinker.Util.abstractMethod,


		/**
		 * Builds and returns an {@link Autolinker.HtmlTag} instance based on the
		 * Match.
		 *
		 * This can be used to easily generate anchor tags from matches, and either
		 * return their HTML string, or modify them before doing so.
		 *
		 * Example Usage:
		 *
		 *     var tag = match.buildTag();
		 *     tag.addClass( 'cordova-link' );
		 *     tag.setAttr( 'target', '_system' );
		 *
		 *     tag.toAnchorString();  // <a href="http://google.com" class="cordova-link" target="_system">Google</a>
		 */
		buildTag : function() {
			return this.tagBuilder.build( this );
		}

	} );
	/*global Autolinker */
	/**
	 * @class Autolinker.match.Email
	 * @extends Autolinker.match.Match
	 *
	 * Represents a Email match found in an input string which should be Autolinked.
	 *
	 * See this class's superclass ({@link Autolinker.match.Match}) for more details.
	 */
	Autolinker.match.Email = Autolinker.Util.extend( Autolinker.match.Match, {

		/**
		 * @cfg {String} email (required)
		 *
		 * The email address that was matched.
		 */


		/**
		 * @constructor
		 * @param {Object} cfg The configuration properties for the Match
		 *   instance, specified in an Object (map).
		 */
		constructor : function( cfg ) {
			Autolinker.match.Match.prototype.constructor.call( this, cfg );

			if( !cfg.email ) throw new Error( '`email` cfg required' );

			this.email = cfg.email;
		},


		/**
		 * Returns a string name for the type of match that this class represents.
		 *
		 * @return {String}
		 */
		getType : function() {
			return 'email';
		},


		/**
		 * Returns the email address that was matched.
		 *
		 * @return {String}
		 */
		getEmail : function() {
			return this.email;
		},


		/**
		 * Returns the anchor href that should be generated for the match.
		 *
		 * @return {String}
		 */
		getAnchorHref : function() {
			return 'mailto:' + this.email;
		},


		/**
		 * Returns the anchor text that should be generated for the match.
		 *
		 * @return {String}
		 */
		getAnchorText : function() {
			return this.email;
		}

	} );
	/*global Autolinker */
	/**
	 * @class Autolinker.match.Hashtag
	 * @extends Autolinker.match.Match
	 *
	 * Represents a Hashtag match found in an input string which should be
	 * Autolinked.
	 *
	 * See this class's superclass ({@link Autolinker.match.Match}) for more
	 * details.
	 */
	Autolinker.match.Hashtag = Autolinker.Util.extend( Autolinker.match.Match, {

		/**
		 * @cfg {String} serviceName
		 *
		 * The service to point hashtag matches to. See {@link Autolinker#hashtag}
		 * for available values.
		 */

		/**
		 * @cfg {String} hashtag (required)
		 *
		 * The Hashtag that was matched, without the '#'.
		 */


		/**
		 * @constructor
		 * @param {Object} cfg The configuration properties for the Match
		 *   instance, specified in an Object (map).
		 */
		constructor : function( cfg ) {
			Autolinker.match.Match.prototype.constructor.call( this, cfg );

			// TODO: if( !serviceName ) throw new Error( '`serviceName` cfg required' );
			if( !cfg.hashtag ) throw new Error( '`hashtag` cfg required' );

			this.serviceName = cfg.serviceName;
			this.hashtag = cfg.hashtag;
		},


		/**
		 * Returns the type of match that this class represents.
		 *
		 * @return {String}
		 */
		getType : function() {
			return 'hashtag';
		},


		/**
		 * Returns the configured {@link #serviceName} to point the Hashtag to.
		 * Ex: 'facebook', 'twitter'.
		 *
		 * @return {String}
		 */
		getServiceName : function() {
			return this.serviceName;
		},


		/**
		 * Returns the matched hashtag, without the '#' character.
		 *
		 * @return {String}
		 */
		getHashtag : function() {
			return this.hashtag;
		},


		/**
		 * Returns the anchor href that should be generated for the match.
		 *
		 * @return {String}
		 */
		getAnchorHref : function() {
			var serviceName = this.serviceName,
			    hashtag = this.hashtag;

			switch( serviceName ) {
				case 'twitter' :
					return 'https://twitter.com/hashtag/' + hashtag;
				case 'facebook' :
					return 'https://www.facebook.com/hashtag/' + hashtag;
				case 'instagram' :
					return 'https://instagram.com/explore/tags/' + hashtag;

				default :  // Shouldn't happen because Autolinker's constructor should block any invalid values, but just in case.
					throw new Error( 'Unknown service name to point hashtag to: ', serviceName );
			}
		},


		/**
		 * Returns the anchor text that should be generated for the match.
		 *
		 * @return {String}
		 */
		getAnchorText : function() {
			return '#' + this.hashtag;
		}

	} );

	/*global Autolinker */
	/**
	 * @class Autolinker.match.Phone
	 * @extends Autolinker.match.Match
	 *
	 * Represents a Phone number match found in an input string which should be
	 * Autolinked.
	 *
	 * See this class's superclass ({@link Autolinker.match.Match}) for more
	 * details.
	 */
	Autolinker.match.Phone = Autolinker.Util.extend( Autolinker.match.Match, {

		/**
		 * @protected
		 * @property {String} number (required)
		 *
		 * The phone number that was matched, without any delimiter characters.
		 *
		 * Note: This is a string to allow for prefixed 0's.
		 */

		/**
		 * @protected
		 * @property  {Boolean} plusSign (required)
		 *
		 * `true` if the matched phone number started with a '+' sign. We'll include
		 * it in the `tel:` URL if so, as this is needed for international numbers.
		 *
		 * Ex: '+1 (123) 456 7879'
		 */


		/**
		 * @constructor
		 * @param {Object} cfg The configuration properties for the Match
		 *   instance, specified in an Object (map).
		 */
		constructor : function( cfg ) {
			Autolinker.match.Match.prototype.constructor.call( this, cfg );

			if( !cfg.number ) throw new Error( '`number` cfg required' );
			if( cfg.plusSign == null ) throw new Error( '`plusSign` cfg required' );

			this.number = cfg.number;
			this.plusSign = cfg.plusSign;
		},


		/**
		 * Returns a string name for the type of match that this class represents.
		 *
		 * @return {String}
		 */
		getType : function() {
			return 'phone';
		},


		/**
		 * Returns the phone number that was matched as a string, without any
		 * delimiter characters.
		 *
		 * Note: This is a string to allow for prefixed 0's.
		 *
		 * @return {String}
		 */
		getNumber: function() {
			return this.number;
		},


		/**
		 * Returns the anchor href that should be generated for the match.
		 *
		 * @return {String}
		 */
		getAnchorHref : function() {
			return 'tel:' + ( this.plusSign ? '+' : '' ) + this.number;
		},


		/**
		 * Returns the anchor text that should be generated for the match.
		 *
		 * @return {String}
		 */
		getAnchorText : function() {
			return this.matchedText;
		}

	} );

	/*global Autolinker */
	/**
	 * @class Autolinker.match.Twitter
	 * @extends Autolinker.match.Match
	 *
	 * Represents a Twitter match found in an input string which should be Autolinked.
	 *
	 * See this class's superclass ({@link Autolinker.match.Match}) for more details.
	 */
	Autolinker.match.Twitter = Autolinker.Util.extend( Autolinker.match.Match, {

		/**
		 * @cfg {String} twitterHandle (required)
		 *
		 * The Twitter handle that was matched, without the '@' character.
		 */


		/**
		 * @constructor
		 * @param {Object} cfg The configuration properties for the Match
		 *   instance, specified in an Object (map).
		 */
		constructor : function( cfg) {
			Autolinker.match.Match.prototype.constructor.call( this, cfg );

			if( !cfg.twitterHandle ) throw new Error( '`twitterHandle` cfg required' );

			this.twitterHandle = cfg.twitterHandle;
		},


		/**
		 * Returns the type of match that this class represents.
		 *
		 * @return {String}
		 */
		getType : function() {
			return 'twitter';
		},


		/**
		 * Returns the twitter handle, without the '@' character.
		 *
		 * @return {String}
		 */
		getTwitterHandle : function() {
			return this.twitterHandle;
		},


		/**
		 * Returns the anchor href that should be generated for the match.
		 *
		 * @return {String}
		 */
		getAnchorHref : function() {
			return 'https://twitter.com/' + this.twitterHandle;
		},


		/**
		 * Returns the anchor text that should be generated for the match.
		 *
		 * @return {String}
		 */
		getAnchorText : function() {
			return '@' + this.twitterHandle;
		}

	} );
	/*global Autolinker */
	/**
	 * @class Autolinker.match.Url
	 * @extends Autolinker.match.Match
	 *
	 * Represents a Url match found in an input string which should be Autolinked.
	 *
	 * See this class's superclass ({@link Autolinker.match.Match}) for more details.
	 */
	Autolinker.match.Url = Autolinker.Util.extend( Autolinker.match.Match, {

		/**
		 * @cfg {String} url (required)
		 *
		 * The url that was matched.
		 */

		/**
		 * @cfg {"scheme"/"www"/"tld"} urlMatchType (required)
		 *
		 * The type of URL match that this class represents. This helps to determine
		 * if the match was made in the original text with a prefixed scheme (ex:
		 * 'http://www.google.com'), a prefixed 'www' (ex: 'www.google.com'), or
		 * was matched by a known top-level domain (ex: 'google.com').
		 */

		/**
		 * @cfg {Boolean} protocolUrlMatch (required)
		 *
		 * `true` if the URL is a match which already has a protocol (i.e.
		 * 'http://'), `false` if the match was from a 'www' or known TLD match.
		 */

		/**
		 * @cfg {Boolean} protocolRelativeMatch (required)
		 *
		 * `true` if the URL is a protocol-relative match. A protocol-relative match
		 * is a URL that starts with '//', and will be either http:// or https://
		 * based on the protocol that the site is loaded under.
		 */

		/**
		 * @cfg {Boolean} stripPrefix (required)
		 * @inheritdoc Autolinker#cfg-stripPrefix
		 */


		/**
		 * @constructor
		 * @param {Object} cfg The configuration properties for the Match
		 *   instance, specified in an Object (map).
		 */
		constructor : function( cfg ) {
			Autolinker.match.Match.prototype.constructor.call( this, cfg );

			if( cfg.urlMatchType !== 'scheme' && cfg.urlMatchType !== 'www' && cfg.urlMatchType !== 'tld' ) throw new Error( '`urlMatchType` cfg must be one of: "scheme", "www", or "tld"' );
			if( !cfg.url ) throw new Error( '`url` cfg required' );
			if( cfg.protocolUrlMatch == null ) throw new Error( '`protocolUrlMatch` cfg required' );
			if( cfg.protocolRelativeMatch == null ) throw new Error( '`protocolRelativeMatch` cfg required' );
			if( cfg.stripPrefix == null ) throw new Error( '`stripPrefix` cfg required' );

			this.urlMatchType = cfg.urlMatchType;
			this.url = cfg.url;
			this.protocolUrlMatch = cfg.protocolUrlMatch;
			this.protocolRelativeMatch = cfg.protocolRelativeMatch;
			this.stripPrefix = cfg.stripPrefix;
		},


		/**
		 * @private
		 * @property {RegExp} urlPrefixRegex
		 *
		 * A regular expression used to remove the 'http://' or 'https://' and/or the 'www.' from URLs.
		 */
		urlPrefixRegex: /^(https?:\/\/)?(www\.)?/i,

		/**
		 * @private
		 * @property {RegExp} protocolRelativeRegex
		 *
		 * The regular expression used to remove the protocol-relative '//' from the {@link #url} string, for purposes
		 * of {@link #getAnchorText}. A protocol-relative URL is, for example, "//yahoo.com"
		 */
		protocolRelativeRegex : /^\/\//,

		/**
		 * @private
		 * @property {Boolean} protocolPrepended
		 *
		 * Will be set to `true` if the 'http://' protocol has been prepended to the {@link #url} (because the
		 * {@link #url} did not have a protocol)
		 */
		protocolPrepended : false,


		/**
		 * Returns a string name for the type of match that this class represents.
		 *
		 * @return {String}
		 */
		getType : function() {
			return 'url';
		},


		/**
		 * Returns a string name for the type of URL match that this class
		 * represents.
		 *
		 * This helps to determine if the match was made in the original text with a
		 * prefixed scheme (ex: 'http://www.google.com'), a prefixed 'www' (ex:
		 * 'www.google.com'), or was matched by a known top-level domain (ex:
		 * 'google.com').
		 *
		 * @return {"scheme"/"www"/"tld"}
		 */
		getUrlMatchType : function() {
			return this.urlMatchType;
		},


		/**
		 * Returns the url that was matched, assuming the protocol to be 'http://' if the original
		 * match was missing a protocol.
		 *
		 * @return {String}
		 */
		getUrl : function() {
			var url = this.url;

			// if the url string doesn't begin with a protocol, assume 'http://'
			if( !this.protocolRelativeMatch && !this.protocolUrlMatch && !this.protocolPrepended ) {
				url = this.url = 'http://' + url;

				this.protocolPrepended = true;
			}

			return url;
		},


		/**
		 * Returns the anchor href that should be generated for the match.
		 *
		 * @return {String}
		 */
		getAnchorHref : function() {
			var url = this.getUrl();

			return url.replace( /&amp;/g, '&' );  // any &amp;'s in the URL should be converted back to '&' if they were displayed as &amp; in the source html
		},


		/**
		 * Returns the anchor text that should be generated for the match.
		 *
		 * @return {String}
		 */
		getAnchorText : function() {
			var anchorText = this.getMatchedText();

			if( this.protocolRelativeMatch ) {
				// Strip off any protocol-relative '//' from the anchor text
				anchorText = this.stripProtocolRelativePrefix( anchorText );
			}
			if( this.stripPrefix ) {
				anchorText = this.stripUrlPrefix( anchorText );
			}
			anchorText = this.removeTrailingSlash( anchorText );  // remove trailing slash, if there is one

			return anchorText;
		},


		// ---------------------------------------

		// Utility Functionality

		/**
		 * Strips the URL prefix (such as "http://" or "https://") from the given text.
		 *
		 * @private
		 * @param {String} text The text of the anchor that is being generated, for which to strip off the
		 *   url prefix (such as stripping off "http://")
		 * @return {String} The `anchorText`, with the prefix stripped.
		 */
		stripUrlPrefix : function( text ) {
			return text.replace( this.urlPrefixRegex, '' );
		},


		/**
		 * Strips any protocol-relative '//' from the anchor text.
		 *
		 * @private
		 * @param {String} text The text of the anchor that is being generated, for which to strip off the
		 *   protocol-relative prefix (such as stripping off "//")
		 * @return {String} The `anchorText`, with the protocol-relative prefix stripped.
		 */
		stripProtocolRelativePrefix : function( text ) {
			return text.replace( this.protocolRelativeRegex, '' );
		},


		/**
		 * Removes any trailing slash from the given `anchorText`, in preparation for the text to be displayed.
		 *
		 * @private
		 * @param {String} anchorText The text of the anchor that is being generated, for which to remove any trailing
		 *   slash ('/') that may exist.
		 * @return {String} The `anchorText`, with the trailing slash removed.
		 */
		removeTrailingSlash : function( anchorText ) {
			if( anchorText.charAt( anchorText.length - 1 ) === '/' ) {
				anchorText = anchorText.slice( 0, -1 );
			}
			return anchorText;
		}

	} );
	/*global Autolinker */
	/**
	 * @abstract
	 * @class Autolinker.matcher.Matcher
	 *
	 * An abstract class and interface for individual matchers to find matches in
	 * an input string with linkified versions of them.
	 *
	 * Note that Matchers do not take HTML into account - they must be fed the text
	 * nodes of any HTML string, which is handled by {@link Autolinker#parse}.
	 */
	Autolinker.matcher.Matcher = Autolinker.Util.extend( Object, {

		/**
		 * @cfg {Autolinker.AnchorTagBuilder} tagBuilder (required)
		 *
		 * Reference to the AnchorTagBuilder instance to use to generate HTML tags
		 * for {@link Autolinker.match.Match Matches}.
		 */


		/**
		 * @constructor
		 * @param {Object} cfg The configuration properties for the Matcher
		 *   instance, specified in an Object (map).
		 */
		constructor : function( cfg ) {
			if( !cfg.tagBuilder ) throw new Error( '`tagBuilder` cfg required' );

			this.tagBuilder = cfg.tagBuilder;
		},


		/**
		 * Parses the input `text` and returns the array of {@link Autolinker.match.Match Matches}
		 * for the matcher.
		 *
		 * @abstract
		 * @param {String} text The text to scan and replace matches in.
		 * @return {Autolinker.match.Match[]}
		 */
		parseMatches : Autolinker.Util.abstractMethod

	} );
	/*global Autolinker */
	/**
	 * @class Autolinker.matcher.Email
	 * @extends Autolinker.matcher.Matcher
	 *
	 * Matcher to find email matches in an input string.
	 *
	 * See this class's superclass ({@link Autolinker.matcher.Matcher}) for more details.
	 */
	Autolinker.matcher.Email = Autolinker.Util.extend( Autolinker.matcher.Matcher, {

		/**
		 * The regular expression to match email addresses. Example match:
		 *
		 *     person@place.com
		 *
		 * @private
		 * @property {RegExp} matcherRegex
		 */
		matcherRegex : (function() {
			var alphaNumericChars = Autolinker.RegexLib.alphaNumericCharsStr,
			    emailRegex = new RegExp( '[' + alphaNumericChars + '\\-_\';:&=+$.,]+@' ),  // something@ for email addresses (a.k.a. local-part)
				domainNameRegex = Autolinker.RegexLib.domainNameRegex,
				tldRegex = Autolinker.RegexLib.tldRegex;  // match our known top level domains (TLDs)

			return new RegExp( [
				emailRegex.source,
				domainNameRegex.source,
				'\\.', tldRegex.source   // '.com', '.net', etc
			].join( "" ), 'gi' );
		} )(),


		/**
		 * @inheritdoc
		 */
		parseMatches : function( text ) {
			var matcherRegex = this.matcherRegex,
			    tagBuilder = this.tagBuilder,
			    matches = [],
			    match;

			while( ( match = matcherRegex.exec( text ) ) !== null ) {
				var matchedText = match[ 0 ];

				matches.push( new Autolinker.match.Email( {
					tagBuilder  : tagBuilder,
					matchedText : matchedText,
					offset      : match.index,
					email       : matchedText
				} ) );
			}

			return matches;
		}

	} );
	/*global Autolinker */
	/**
	 * @class Autolinker.matcher.Hashtag
	 * @extends Autolinker.matcher.Matcher
	 *
	 * Matcher to find Hashtag matches in an input string.
	 */
	Autolinker.matcher.Hashtag = Autolinker.Util.extend( Autolinker.matcher.Matcher, {

		/**
		 * @cfg {String} serviceName
		 *
		 * The service to point hashtag matches to. See {@link Autolinker#hashtag}
		 * for available values.
		 */


		/**
		 * The regular expression to match Hashtags. Example match:
		 *
		 *     #asdf
		 *
		 * @private
		 * @property {RegExp} matcherRegex
		 */
		matcherRegex : new RegExp( '#[_' + Autolinker.RegexLib.alphaNumericCharsStr + ']{1,139}', 'g' ),

		/**
		 * The regular expression to use to check the character before a username match to
		 * make sure we didn't accidentally match an email address.
		 *
		 * For example, the string "asdf@asdf.com" should not match "@asdf" as a username.
		 *
		 * @private
		 * @property {RegExp} nonWordCharRegex
		 */
		nonWordCharRegex : new RegExp( '[^' + Autolinker.RegexLib.alphaNumericCharsStr + ']' ),


		/**
		 * @constructor
		 * @param {Object} cfg The configuration properties for the Match instance,
		 *   specified in an Object (map).
		 */
		constructor : function( cfg ) {
			Autolinker.matcher.Matcher.prototype.constructor.call( this, cfg );

			this.serviceName = cfg.serviceName;
		},


		/**
		 * @inheritdoc
		 */
		parseMatches : function( text ) {
			var matcherRegex = this.matcherRegex,
			    nonWordCharRegex = this.nonWordCharRegex,
			    serviceName = this.serviceName,
			    tagBuilder = this.tagBuilder,
			    matches = [],
			    match;

			while( ( match = matcherRegex.exec( text ) ) !== null ) {
				var offset = match.index,
				    prevChar = text.charAt( offset - 1 );

				// If we found the match at the beginning of the string, or we found the match
				// and there is a whitespace char in front of it (meaning it is not a '#' char
				// in the middle of a word), then it is a hashtag match.
				if( offset === 0 || nonWordCharRegex.test( prevChar ) ) {
					var matchedText = match[ 0 ],
					    hashtag = match[ 0 ].slice( 1 );  // strip off the '#' character at the beginning

					matches.push( new Autolinker.match.Hashtag( {
						tagBuilder  : tagBuilder,
						matchedText : matchedText,
						offset      : offset,
						serviceName : serviceName,
						hashtag     : hashtag
					} ) );
				}
			}

			return matches;
		}

	} );
	/*global Autolinker */
	/**
	 * @class Autolinker.matcher.Phone
	 * @extends Autolinker.matcher.Matcher
	 *
	 * Matcher to find Phone number matches in an input string.
	 *
	 * See this class's superclass ({@link Autolinker.matcher.Matcher}) for more
	 * details.
	 */
	Autolinker.matcher.Phone = Autolinker.Util.extend( Autolinker.matcher.Matcher, {

		/**
		 * The regular expression to match Phone numbers. Example match:
		 *
		 *     (123) 456-7890
		 *
		 * This regular expression has the following capturing groups:
		 *
		 * 1. The prefixed '+' sign, if there is one.
		 *
		 * @private
		 * @property {RegExp} matcherRegex
		 */
		matcherRegex : /(?:(\+)?\d{1,3}[-\040.])?\(?\d{3}\)?[-\040.]?\d{3}[-\040.]\d{4}/g,  // ex: (123) 456-7890, 123 456 7890, 123-456-7890, etc.

		/**
		 * @inheritdoc
		 */
		parseMatches : function( text ) {
			var matcherRegex = this.matcherRegex,
			    tagBuilder = this.tagBuilder,
			    matches = [],
			    match;

			while( ( match = matcherRegex.exec( text ) ) !== null ) {
				// Remove non-numeric values from phone number string
				var matchedText = match[ 0 ],
				    cleanNumber = matchedText.replace( /\D/g, '' ),  // strip out non-digit characters
				    plusSign = !!match[ 1 ];  // match[ 1 ] is the prefixed plus sign, if there is one

				matches.push( new Autolinker.match.Phone( {
					tagBuilder  : tagBuilder,
					matchedText : matchedText,
					offset      : match.index,
					number      : cleanNumber,
					plusSign    : plusSign
				} ) );
			}

			return matches;
		}

	} );
	/*global Autolinker */
	/**
	 * @class Autolinker.matcher.Twitter
	 * @extends Autolinker.matcher.Matcher
	 *
	 * Matcher to find/replace username matches in an input string.
	 */
	Autolinker.matcher.Twitter = Autolinker.Util.extend( Autolinker.matcher.Matcher, {

		/**
		 * The regular expression to match username handles. Example match:
		 *
		 *     @asdf
		 *
		 * @private
		 * @property {RegExp} matcherRegex
		 */
		matcherRegex : new RegExp( '@[_' + Autolinker.RegexLib.alphaNumericCharsStr + ']{1,20}', 'g' ),

		/**
		 * The regular expression to use to check the character before a username match to
		 * make sure we didn't accidentally match an email address.
		 *
		 * For example, the string "asdf@asdf.com" should not match "@asdf" as a username.
		 *
		 * @private
		 * @property {RegExp} nonWordCharRegex
		 */
		nonWordCharRegex : new RegExp( '[^' + Autolinker.RegexLib.alphaNumericCharsStr + ']' ),


		/**
		 * @inheritdoc
		 */
		parseMatches : function( text ) {
			var matcherRegex = this.matcherRegex,
			    nonWordCharRegex = this.nonWordCharRegex,
			    tagBuilder = this.tagBuilder,
			    matches = [],
			    match;

			while( ( match = matcherRegex.exec( text ) ) !== null ) {
				var offset = match.index,
				    prevChar = text.charAt( offset - 1 );

				// If we found the match at the beginning of the string, or we found the match
				// and there is a whitespace char in front of it (meaning it is not an email
				// address), then it is a username match.
				if( offset === 0 || nonWordCharRegex.test( prevChar ) ) {
					var matchedText = match[ 0 ],
					    twitterHandle = match[ 0 ].slice( 1 );  // strip off the '@' character at the beginning

					matches.push( new Autolinker.match.Twitter( {
						tagBuilder    : tagBuilder,
						matchedText   : matchedText,
						offset        : offset,
						twitterHandle : twitterHandle
					} ) );
				}
			}

			return matches;
		}

	} );
	/*global Autolinker */
	/**
	 * @class Autolinker.matcher.Url
	 * @extends Autolinker.matcher.Matcher
	 *
	 * Matcher to find URL matches in an input string.
	 *
	 * See this class's superclass ({@link Autolinker.matcher.Matcher}) for more details.
	 */
	Autolinker.matcher.Url = Autolinker.Util.extend( Autolinker.matcher.Matcher, {

		/**
		 * @cfg {Boolean} stripPrefix (required)
		 * @inheritdoc Autolinker#stripPrefix
		 */


		/**
		 * @private
		 * @property {RegExp} matcherRegex
		 *
		 * The regular expression to match URLs with an optional scheme, port
		 * number, path, query string, and hash anchor.
		 *
		 * Example matches:
		 *
		 *     http://google.com
		 *     www.google.com
		 *     google.com/path/to/file?q1=1&q2=2#myAnchor
		 *
		 *
		 * This regular expression will have the following capturing groups:
		 *
		 * 1.  Group that matches a scheme-prefixed URL (i.e. 'http://google.com').
		 *     This is used to match scheme URLs with just a single word, such as
		 *     'http://localhost', where we won't double check that the domain name
		 *     has at least one dot ('.') in it.
		 * 2.  Group that matches a 'www.' prefixed URL. This is only matched if the
		 *     'www.' text was not prefixed by a scheme (i.e.: not prefixed by
		 *     'http://', 'ftp:', etc.)
		 * 3.  A protocol-relative ('//') match for the case of a 'www.' prefixed
		 *     URL. Will be an empty string if it is not a protocol-relative match.
		 *     We need to know the character before the '//' in order to determine
		 *     if it is a valid match or the // was in a string we don't want to
		 *     auto-link.
		 * 4.  Group that matches a known TLD (top level domain), when a scheme
		 *     or 'www.'-prefixed domain is not matched.
		 * 5.  A protocol-relative ('//') match for the case of a known TLD prefixed
		 *     URL. Will be an empty string if it is not a protocol-relative match.
		 *     See #3 for more info.
		 */
		matcherRegex : (function() {
			var schemeRegex = /(?:[A-Za-z][-.+A-Za-z0-9]*:(?![A-Za-z][-.+A-Za-z0-9]*:\/\/)(?!\d+\/?)(?:\/\/)?)/,  // match protocol, allow in format "http://" or "mailto:". However, do not match the first part of something like 'link:http://www.google.com' (i.e. don't match "link:"). Also, make sure we don't interpret 'google.com:8000' as if 'google.com' was a protocol here (i.e. ignore a trailing port number in this regex)
			    wwwRegex = /(?:www\.)/,                  // starting with 'www.'
			    domainNameRegex = Autolinker.RegexLib.domainNameRegex,
			    tldRegex = Autolinker.RegexLib.tldRegex,  // match our known top level domains (TLDs)
			    alphaNumericCharsStr = Autolinker.RegexLib.alphaNumericCharsStr,

			    // Allow optional path, query string, and hash anchor, not ending in the following characters: "?!:,.;"
			    // http://blog.codinghorror.com/the-problem-with-urls/
			    urlSuffixRegex = new RegExp( '[' + alphaNumericCharsStr + '\\-+&@#/%=~_()|\'$*\\[\\]?!:,.;]*[' + alphaNumericCharsStr + '\\-+&@#/%=~_()|\'$*\\[\\]]' );

			return new RegExp( [
				'(?:', // parens to cover match for scheme (optional), and domain
					'(',  // *** Capturing group $1, for a scheme-prefixed url (ex: http://google.com)
						schemeRegex.source,
						domainNameRegex.source,
					')',

					'|',

					'(',  // *** Capturing group $2, for a 'www.' prefixed url (ex: www.google.com)
						'(//)?',  // *** Capturing group $3 for an optional protocol-relative URL. Must be at the beginning of the string or start with a non-word character (handled later)
						wwwRegex.source,
						domainNameRegex.source,
					')',

					'|',

					'(',  // *** Capturing group $4, for known a TLD url (ex: google.com)
						'(//)?',  // *** Capturing group $5 for an optional protocol-relative URL. Must be at the beginning of the string or start with a non-word character (handled later)
						domainNameRegex.source + '\\.',
						tldRegex.source,
					')',
				')',

				'(?:' + urlSuffixRegex.source + ')?'  // match for path, query string, and/or hash anchor - optional
			].join( "" ), 'gi' );
		} )(),


		/**
		 * A regular expression to use to check the character before a protocol-relative
		 * URL match. We don't want to match a protocol-relative URL if it is part
		 * of another word.
		 *
		 * For example, we want to match something like "Go to: //google.com",
		 * but we don't want to match something like "abc//google.com"
		 *
		 * This regular expression is used to test the character before the '//'.
		 *
		 * @private
		 * @type {RegExp} wordCharRegExp
		 */
		wordCharRegExp : /\w/,


		/**
		 * The regular expression to match opening parenthesis in a URL match.
		 *
		 * This is to determine if we have unbalanced parenthesis in the URL, and to
		 * drop the final parenthesis that was matched if so.
		 *
		 * Ex: The text "(check out: wikipedia.com/something_(disambiguation))"
		 * should only autolink the inner "wikipedia.com/something_(disambiguation)"
		 * part, so if we find that we have unbalanced parenthesis, we will drop the
		 * last one for the match.
		 *
		 * @private
		 * @property {RegExp}
		 */
		openParensRe : /\(/g,

		/**
		 * The regular expression to match closing parenthesis in a URL match. See
		 * {@link #openParensRe} for more information.
		 *
		 * @private
		 * @property {RegExp}
		 */
		closeParensRe : /\)/g,


		/**
		 * @constructor
		 * @param {Object} cfg The configuration properties for the Match instance,
		 *   specified in an Object (map).
		 */
		constructor : function( cfg ) {
			Autolinker.matcher.Matcher.prototype.constructor.call( this, cfg );

			this.stripPrefix = cfg.stripPrefix;

			if( this.stripPrefix == null ) throw new Error( '`stripPrefix` cfg required' );
		},


		/**
		 * @inheritdoc
		 */
		parseMatches : function( text ) {
			var matcherRegex = this.matcherRegex,
			    stripPrefix = this.stripPrefix,
			    tagBuilder = this.tagBuilder,
			    matches = [],
			    match;

			while( ( match = matcherRegex.exec( text ) ) !== null ) {
				var matchStr = match[ 0 ],
				    schemeUrlMatch = match[ 1 ],
				    wwwUrlMatch = match[ 2 ],
				    wwwProtocolRelativeMatch = match[ 3 ],
				    //tldUrlMatch = match[ 4 ],  -- not needed at the moment
				    tldProtocolRelativeMatch = match[ 5 ],
				    offset = match.index,
				    protocolRelativeMatch = wwwProtocolRelativeMatch || tldProtocolRelativeMatch,
					prevChar = text.charAt( offset - 1 );

				if( !Autolinker.matcher.UrlMatchValidator.isValid( matchStr, schemeUrlMatch ) ) {
					continue;
				}

				// If the match is preceded by an '@' character, then it is either
				// an email address or a username. Skip these types of matches.
				if( offset > 0 && prevChar === '@' ) {
					continue;
				}

				// If it's a protocol-relative '//' match, but the character before the '//'
				// was a word character (i.e. a letter/number), then we found the '//' in the
				// middle of another word (such as "asdf//asdf.com"). In this case, skip the
				// match.
				if( offset > 0 && protocolRelativeMatch && this.wordCharRegExp.test( prevChar ) ) {
					continue;
				}

				// Handle a closing parenthesis at the end of the match, and exclude
				// it if there is not a matching open parenthesis in the match
				// itself.
				if( this.matchHasUnbalancedClosingParen( matchStr ) ) {
					matchStr = matchStr.substr( 0, matchStr.length - 1 );  // remove the trailing ")"
				} else {
					// Handle an invalid character after the TLD
					var pos = this.matchHasInvalidCharAfterTld( matchStr, schemeUrlMatch );
					if( pos > -1 ) {
						matchStr = matchStr.substr( 0, pos ); // remove the trailing invalid chars
					}
				}

				var urlMatchType = schemeUrlMatch ? 'scheme' : ( wwwUrlMatch ? 'www' : 'tld' ),
				    protocolUrlMatch = !!schemeUrlMatch;

				matches.push( new Autolinker.match.Url( {
					tagBuilder            : tagBuilder,
					matchedText           : matchStr,
					offset                : offset,
					urlMatchType          : urlMatchType,
					url                   : matchStr,
					protocolUrlMatch      : protocolUrlMatch,
					protocolRelativeMatch : !!protocolRelativeMatch,
					stripPrefix           : stripPrefix
				} ) );
			}

			return matches;
		},


		/**
		 * Determines if a match found has an unmatched closing parenthesis. If so,
		 * this parenthesis will be removed from the match itself, and appended
		 * after the generated anchor tag.
		 *
		 * A match may have an extra closing parenthesis at the end of the match
		 * because the regular expression must include parenthesis for URLs such as
		 * "wikipedia.com/something_(disambiguation)", which should be auto-linked.
		 *
		 * However, an extra parenthesis *will* be included when the URL itself is
		 * wrapped in parenthesis, such as in the case of "(wikipedia.com/something_(disambiguation))".
		 * In this case, the last closing parenthesis should *not* be part of the
		 * URL itself, and this method will return `true`.
		 *
		 * @private
		 * @param {String} matchStr The full match string from the {@link #matcherRegex}.
		 * @return {Boolean} `true` if there is an unbalanced closing parenthesis at
		 *   the end of the `matchStr`, `false` otherwise.
		 */
		matchHasUnbalancedClosingParen : function( matchStr ) {
			var lastChar = matchStr.charAt( matchStr.length - 1 );

			if( lastChar === ')' ) {
				var openParensMatch = matchStr.match( this.openParensRe ),
				    closeParensMatch = matchStr.match( this.closeParensRe ),
				    numOpenParens = ( openParensMatch && openParensMatch.length ) || 0,
				    numCloseParens = ( closeParensMatch && closeParensMatch.length ) || 0;

				if( numOpenParens < numCloseParens ) {
					return true;
				}
			}

			return false;
		},


		/**
		 * Determine if there's an invalid character after the TLD in a URL. Valid
		 * characters after TLD are ':/?#'. Exclude scheme matched URLs from this
		 * check.
		 *
		 * @private
		 * @param {String} urlMatch The matched URL, if there was one. Will be an
		 *   empty string if the match is not a URL match.
		 * @param {String} schemeUrlMatch The match URL string for a scheme
		 *   match. Ex: 'http://yahoo.com'. This is used to match something like
		 *   'http://localhost', where we won't double check that the domain name
		 *   has at least one '.' in it.
		 * @return {Number} the position where the invalid character was found. If
		 *   no such character was found, returns -1
		 */
		matchHasInvalidCharAfterTld : function( urlMatch, schemeUrlMatch ) {
			if( !urlMatch ) {
				return -1;
			}

			var offset = 0;
			if ( schemeUrlMatch ) {
				offset = urlMatch.indexOf(':');
				urlMatch = urlMatch.slice(offset);
			}

			var re = /^((.?\/\/)?[A-Za-z0-9\u00C0-\u017F\.\-]*[A-Za-z0-9\u00C0-\u017F\-]\.[A-Za-z]+)/;
			var res = re.exec( urlMatch );
			if ( res === null ) {
				return -1;
			}

			offset += res[1].length;
			urlMatch = urlMatch.slice(res[1].length);
			if (/^[^.A-Za-z:\/?#]/.test(urlMatch)) {
				return offset;
			}

			return -1;
		}

	} );
	/*global Autolinker */
	/*jshint scripturl:true */
	/**
	 * @private
	 * @class Autolinker.matcher.UrlMatchValidator
	 * @singleton
	 *
	 * Used by Autolinker to filter out false URL positives from the
	 * {@link Autolinker.matcher.Url UrlMatcher}.
	 *
	 * Due to the limitations of regular expressions (including the missing feature
	 * of look-behinds in JS regular expressions), we cannot always determine the
	 * validity of a given match. This class applies a bit of additional logic to
	 * filter out any false positives that have been matched by the
	 * {@link Autolinker.matcher.Url UrlMatcher}.
	 */
	Autolinker.matcher.UrlMatchValidator = {

		/**
		 * Regex to test for a full protocol, with the two trailing slashes. Ex: 'http://'
		 *
		 * @private
		 * @property {RegExp} hasFullProtocolRegex
		 */
		hasFullProtocolRegex : /^[A-Za-z][-.+A-Za-z0-9]*:\/\//,

		/**
		 * Regex to find the URI scheme, such as 'mailto:'.
		 *
		 * This is used to filter out 'javascript:' and 'vbscript:' schemes.
		 *
		 * @private
		 * @property {RegExp} uriSchemeRegex
		 */
		uriSchemeRegex : /^[A-Za-z][-.+A-Za-z0-9]*:/,

		/**
		 * Regex to determine if at least one word char exists after the protocol (i.e. after the ':')
		 *
		 * @private
		 * @property {RegExp} hasWordCharAfterProtocolRegex
		 */
		hasWordCharAfterProtocolRegex : /:[^\s]*?[A-Za-z\u00C0-\u017F]/,


		/**
		 * Determines if a given URL match found by the {@link Autolinker.matcher.Url UrlMatcher}
		 * is valid. Will return `false` for:
		 *
		 * 1) URL matches which do not have at least have one period ('.') in the
		 *    domain name (effectively skipping over matches like "abc:def").
		 *    However, URL matches with a protocol will be allowed (ex: 'http://localhost')
		 * 2) URL matches which do not have at least one word character in the
		 *    domain name (effectively skipping over matches like "git:1.0").
		 * 3) A protocol-relative url match (a URL beginning with '//') whose
		 *    previous character is a word character (effectively skipping over
		 *    strings like "abc//google.com")
		 *
		 * Otherwise, returns `true`.
		 *
		 * @param {String} urlMatch The matched URL, if there was one. Will be an
		 *   empty string if the match is not a URL match.
		 * @param {String} protocolUrlMatch The match URL string for a protocol
		 *   match. Ex: 'http://yahoo.com'. This is used to match something like
		 *   'http://localhost', where we won't double check that the domain name
		 *   has at least one '.' in it.
		 * @return {Boolean} `true` if the match given is valid and should be
		 *   processed, or `false` if the match is invalid and/or should just not be
		 *   processed.
		 */
		isValid : function( urlMatch, protocolUrlMatch ) {
			if(
				( protocolUrlMatch && !this.isValidUriScheme( protocolUrlMatch ) ) ||
				this.urlMatchDoesNotHaveProtocolOrDot( urlMatch, protocolUrlMatch ) ||    // At least one period ('.') must exist in the URL match for us to consider it an actual URL, *unless* it was a full protocol match (like 'http://localhost')
				this.urlMatchDoesNotHaveAtLeastOneWordChar( urlMatch, protocolUrlMatch )  // At least one letter character must exist in the domain name after a protocol match. Ex: skip over something like "git:1.0"
			) {
				return false;
			}

			return true;
		},


		/**
		 * Determines if the URI scheme is a valid scheme to be autolinked. Returns
		 * `false` if the scheme is 'javascript:' or 'vbscript:'
		 *
		 * @private
		 * @param {String} uriSchemeMatch The match URL string for a full URI scheme
		 *   match. Ex: 'http://yahoo.com' or 'mailto:a@a.com'.
		 * @return {Boolean} `true` if the scheme is a valid one, `false` otherwise.
		 */
		isValidUriScheme : function( uriSchemeMatch ) {
			var uriScheme = uriSchemeMatch.match( this.uriSchemeRegex )[ 0 ].toLowerCase();

			return ( uriScheme !== 'javascript:' && uriScheme !== 'vbscript:' );
		},


		/**
		 * Determines if a URL match does not have either:
		 *
		 * a) a full protocol (i.e. 'http://'), or
		 * b) at least one dot ('.') in the domain name (for a non-full-protocol
		 *    match).
		 *
		 * Either situation is considered an invalid URL (ex: 'git:d' does not have
		 * either the '://' part, or at least one dot in the domain name. If the
		 * match was 'git:abc.com', we would consider this valid.)
		 *
		 * @private
		 * @param {String} urlMatch The matched URL, if there was one. Will be an
		 *   empty string if the match is not a URL match.
		 * @param {String} protocolUrlMatch The match URL string for a protocol
		 *   match. Ex: 'http://yahoo.com'. This is used to match something like
		 *   'http://localhost', where we won't double check that the domain name
		 *   has at least one '.' in it.
		 * @return {Boolean} `true` if the URL match does not have a full protocol,
		 *   or at least one dot ('.') in a non-full-protocol match.
		 */
		urlMatchDoesNotHaveProtocolOrDot : function( urlMatch, protocolUrlMatch ) {
			return ( !!urlMatch && ( !protocolUrlMatch || !this.hasFullProtocolRegex.test( protocolUrlMatch ) ) && urlMatch.indexOf( '.' ) === -1 );
		},


		/**
		 * Determines if a URL match does not have at least one word character after
		 * the protocol (i.e. in the domain name).
		 *
		 * At least one letter character must exist in the domain name after a
		 * protocol match. Ex: skip over something like "git:1.0"
		 *
		 * @private
		 * @param {String} urlMatch The matched URL, if there was one. Will be an
		 *   empty string if the match is not a URL match.
		 * @param {String} protocolUrlMatch The match URL string for a protocol
		 *   match. Ex: 'http://yahoo.com'. This is used to know whether or not we
		 *   have a protocol in the URL string, in order to check for a word
		 *   character after the protocol separator (':').
		 * @return {Boolean} `true` if the URL match does not have at least one word
		 *   character in it after the protocol, `false` otherwise.
		 */
		urlMatchDoesNotHaveAtLeastOneWordChar : function( urlMatch, protocolUrlMatch ) {
			if( urlMatch && protocolUrlMatch ) {
				return !this.hasWordCharAfterProtocolRegex.test( urlMatch );
			} else {
				return false;
			}
		}

	};
	/*global Autolinker */
	/**
	 * A truncation feature where the ellipsis will be placed at the end of the URL.
	 *
	 * @param {String} anchorText
	 * @param {Number} truncateLen The maximum length of the truncated output URL string.
	 * @param {String} ellipsisChars The characters to place within the url, e.g. "..".
	 * @return {String} The truncated URL.
	 */
	Autolinker.truncate.TruncateEnd = function(anchorText, truncateLen, ellipsisChars){
		return Autolinker.Util.ellipsis( anchorText, truncateLen, ellipsisChars );
	};

	/*global Autolinker */
	/**
	 * Date: 2015-10-05
	 * Author: Kasper Søfren <soefritz@gmail.com> (https://github.com/kafoso)
	 *
	 * A truncation feature, where the ellipsis will be placed in the dead-center of the URL.
	 *
	 * @param {String} url             A URL.
	 * @param {Number} truncateLen     The maximum length of the truncated output URL string.
	 * @param {String} ellipsisChars   The characters to place within the url, e.g. "..".
	 * @return {String} The truncated URL.
	 */
	Autolinker.truncate.TruncateMiddle = function(url, truncateLen, ellipsisChars){
	  if (url.length <= truncateLen) {
	    return url;
	  }
	  var availableLength = truncateLen - ellipsisChars.length;
	  var end = "";
	  if (availableLength > 0) {
	    end = url.substr((-1)*Math.floor(availableLength/2));
	  }
	  return (url.substr(0, Math.ceil(availableLength/2)) + ellipsisChars + end).substr(0, truncateLen);
	};

	/*global Autolinker */
	/**
	 * Date: 2015-10-05
	 * Author: Kasper Søfren <soefritz@gmail.com> (https://github.com/kafoso)
	 *
	 * A truncation feature, where the ellipsis will be placed at a section within
	 * the URL making it still somewhat human readable.
	 *
	 * @param {String} url						 A URL.
	 * @param {Number} truncateLen		 The maximum length of the truncated output URL string.
	 * @param {String} ellipsisChars	 The characters to place within the url, e.g. "..".
	 * @return {String} The truncated URL.
	 */
	Autolinker.truncate.TruncateSmart = function(url, truncateLen, ellipsisChars){
		var parse_url = function(url){ // Functionality inspired by PHP function of same name
			var urlObj = {};
			var urlSub = url;
			var match = urlSub.match(/^([a-z]+):\/\//i);
			if (match) {
				urlObj.scheme = match[1];
				urlSub = urlSub.substr(match[0].length);
			}
			match = urlSub.match(/^(.*?)(?=(\?|#|\/|$))/i);
			if (match) {
				urlObj.host = match[1];
				urlSub = urlSub.substr(match[0].length);
			}
			match = urlSub.match(/^\/(.*?)(?=(\?|#|$))/i);
			if (match) {
				urlObj.path = match[1];
				urlSub = urlSub.substr(match[0].length);
			}
			match = urlSub.match(/^\?(.*?)(?=(#|$))/i);
			if (match) {
				urlObj.query = match[1];
				urlSub = urlSub.substr(match[0].length);
			}
			match = urlSub.match(/^#(.*?)$/i);
			if (match) {
				urlObj.fragment = match[1];
				//urlSub = urlSub.substr(match[0].length);  -- not used. Uncomment if adding another block.
			}
			return urlObj;
		};

		var buildUrl = function(urlObj){
			var url = "";
			if (urlObj.scheme && urlObj.host) {
				url += urlObj.scheme + "://";
			}
			if (urlObj.host) {
				url += urlObj.host;
			}
			if (urlObj.path) {
				url += "/" + urlObj.path;
			}
			if (urlObj.query) {
				url += "?" + urlObj.query;
			}
			if (urlObj.fragment) {
				url += "#" + urlObj.fragment;
			}
			return url;
		};

		var buildSegment = function(segment, remainingAvailableLength){
			var remainingAvailableLengthHalf = remainingAvailableLength/ 2,
					startOffset = Math.ceil(remainingAvailableLengthHalf),
					endOffset = (-1)*Math.floor(remainingAvailableLengthHalf),
					end = "";
			if (endOffset < 0) {
				end = segment.substr(endOffset);
			}
			return segment.substr(0, startOffset) + ellipsisChars + end;
		};
		if (url.length <= truncateLen) {
			return url;
		}
		var availableLength = truncateLen - ellipsisChars.length;
		var urlObj = parse_url(url);
		// Clean up the URL
		if (urlObj.query) {
			var matchQuery = urlObj.query.match(/^(.*?)(?=(\?|\#))(.*?)$/i);
			if (matchQuery) {
				// Malformed URL; two or more "?". Removed any content behind the 2nd.
				urlObj.query = urlObj.query.substr(0, matchQuery[1].length);
				url = buildUrl(urlObj);
			}
		}
		if (url.length <= truncateLen) {
			return url;
		}
		if (urlObj.host) {
			urlObj.host = urlObj.host.replace(/^www\./, "");
			url = buildUrl(urlObj);
		}
		if (url.length <= truncateLen) {
			return url;
		}
		// Process and build the URL
		var str = "";
		if (urlObj.host) {
			str += urlObj.host;
		}
		if (str.length >= availableLength) {
			if (urlObj.host.length == truncateLen) {
				return (urlObj.host.substr(0, (truncateLen - ellipsisChars.length)) + ellipsisChars).substr(0, truncateLen);
			}
			return buildSegment(str, availableLength).substr(0, truncateLen);
		}
		var pathAndQuery = "";
		if (urlObj.path) {
			pathAndQuery += "/" + urlObj.path;
		}
		if (urlObj.query) {
			pathAndQuery += "?" + urlObj.query;
		}
		if (pathAndQuery) {
			if ((str+pathAndQuery).length >= availableLength) {
				if ((str+pathAndQuery).length == truncateLen) {
					return (str + pathAndQuery).substr(0, truncateLen);
				}
				var remainingAvailableLength = availableLength - str.length;
				return (str + buildSegment(pathAndQuery, remainingAvailableLength)).substr(0, truncateLen);
			} else {
				str += pathAndQuery;
			}
		}
		if (urlObj.fragment) {
			var fragment = "#"+urlObj.fragment;
			if ((str+fragment).length >= availableLength) {
				if ((str+fragment).length == truncateLen) {
					return (str + fragment).substr(0, truncateLen);
				}
				var remainingAvailableLength2 = availableLength - str.length;
				return (str + buildSegment(fragment, remainingAvailableLength2)).substr(0, truncateLen);
			} else {
				str += fragment;
			}
		}
		if (urlObj.scheme && urlObj.host) {
			var scheme = urlObj.scheme + "://";
			if ((str+scheme).length < availableLength) {
				return (scheme + str).substr(0, truncateLen);
			}
		}
		if (str.length <= truncateLen) {
			return str;
		}
		var end = "";
		if (availableLength > 0) {
			end = str.substr((-1)*Math.floor(availableLength/2));
		}
		return (str.substr(0, Math.ceil(availableLength/2)) + ellipsisChars + end).substr(0, truncateLen);
	};

	return Autolinker;
	}));


/***/ },

/***/ 462:
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(5);
	var splitbuttonitem_1 = __webpack_require__(463);
	var domhandler_1 = __webpack_require__(382);
	var router_1 = __webpack_require__(329);
	var SplitButton = (function () {
	    function SplitButton(el, domHandler, renderer, router) {
	        this.el = el;
	        this.domHandler = domHandler;
	        this.renderer = renderer;
	        this.router = router;
	        this.iconPos = 'left';
	        this.onClick = new core_1.EventEmitter();
	        this.menuVisible = false;
	    }
	    SplitButton.prototype.ngOnInit = function () {
	        var _this = this;
	        this.documentClickListener = this.renderer.listenGlobal('body', 'click', function () {
	            _this.menuVisible = false;
	        });
	    };
	    SplitButton.prototype.onDefaultButtonClick = function (event) {
	        this.onClick.emit(event);
	    };
	    SplitButton.prototype.onDropdownClick = function (event, menu, container) {
	        this.menuVisible = !this.menuVisible;
	        this.domHandler.relativePosition(menu, container);
	        this.domHandler.fadeIn(menu, 25);
	        event.stopPropagation();
	    };
	    SplitButton.prototype.onItemClick = function (event, item) {
	        if (!item.url && !item.routerLink) {
	            event.preventDefault();
	        }
	        this.hoveredItem = null;
	        item.onClick.emit(event);
	        if (item.routerLink) {
	            this.router.navigate(item.routerLink);
	        }
	    };
	    SplitButton.prototype.ngOnDestroy = function () {
	        this.documentClickListener();
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], SplitButton.prototype, "icon", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], SplitButton.prototype, "iconPos", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], SplitButton.prototype, "label", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], SplitButton.prototype, "onClick", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], SplitButton.prototype, "style", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], SplitButton.prototype, "styleClass", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], SplitButton.prototype, "menuStyle", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], SplitButton.prototype, "menuStyleClass", void 0);
	    __decorate([
	        core_1.ContentChildren(splitbuttonitem_1.SplitButtonItem), 
	        __metadata('design:type', core_1.QueryList)
	    ], SplitButton.prototype, "items", void 0);
	    SplitButton = __decorate([
	        core_1.Component({
	            selector: 'p-splitButton',
	            template: "\n        <div #container [ngClass]=\"'ui-splitbutton ui-buttonset ui-widget'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <button #defaultbtn type=\"button\" class=\"ui-button ui-widget ui-state-default ui-corner-left\"\n                [ngClass]=\"{'ui-button-text-only':(!icon&&label),'ui-button-icon-only':(icon&&!label),\n                'ui-button-text-icon-left':(icon&&label&&iconPos=='left'),'ui-button-text-icon-right':(icon&&label&&iconPos=='right'),\n                'ui-state-hover':hoverDefaultBtn,'ui-state-focus':focusDefaultBtn,'ui-state-active':activeDefaultBtn}\"\n                (mouseenter)=\"hoverDefaultBtn=true\" (mouseleave)=\"hoverDefaultBtn=false\"  (focus)=\"focusDefaultBtn=true\" (blur)=\"focusDefaultBtn=false\"\n                (mousedown)=\"activeDefaultBtn=true\" (mouseup)=\"activeDefaultBtn=false\" (click)=\"onDefaultButtonClick($event)\">\n                <span [ngClass]=\"'ui-button-icon-left ui-c fa fa-fw'\" [class]=\"icon\"></span>\n                <span class=\"ui-button-text ui-c\">{{label}}</span>\n            </button>\n            <button class=\"ui-splitbutton-menubutton ui-button ui-widget ui-state-default ui-button-icon-only ui-corner-right\" type=\"button\"\n                [ngClass]=\"{'ui-state-hover':hoverDropdown,'ui-state-focus':focusDropdown,'ui-state-active':activeDropdown}\"\n                (mouseenter)=\"hoverDropdown=true\" (mouseleave)=\"hoverDropdown=false\" (focus)=\"focusDropdown=true\" (blur)=\"focusDropdown=false\"\n                (mousedown)=\"activeDropdown=true\" (mouseup)=\"activeDropdown=false\" (click)=\"onDropdownClick($event,menu,container)\">\n                <span class=\"ui-button-icon-left ui-c fa fa-fw fa-caret-down\"></span>\n                <span class=\"ui-button-text ui-c\">ui-button</span>\n            </button>\n            <div #menu [ngClass]=\"'ui-menu ui-menu-dynamic ui-widget ui-widget-content ui-corner-all ui-helper-clearfix ui-shadow'\" [style.display]=\"menuVisible ? 'block' : 'none'\"\n                    [ngStyle]=\"menuStyle\" [class]=\"menuStyleClass\">\n                <ul class=\"ui-menu-list ui-helper-reset\">\n                    <li class=\"ui-menuitem ui-widget ui-corner-all\" role=\"menuitem\" *ngFor=\"let item of items\"\n                        (mouseenter)=\"hoveredItem=item\" (mouseleave)=\"hoveredItem=null\">\n                        <a [href]=\"item.url||'#'\" class=\"ui-menuitem-link ui-corner-all\" (click)=\"onItemClick($event,item)\" [ngClass]=\"{'ui-state-hover':(hoveredItem==item)}\">\n                            <span [ngClass]=\"'ui-menuitem-icon fa fa-fw'\" [class]=\"item.icon\" *ngIf=\"item.icon\"></span>\n                            <span class=\"ui-menuitem-text\">{{item.label}}</span>\n                        </a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    ",
	            providers: [domhandler_1.DomHandler],
	            directives: [router_1.ROUTER_DIRECTIVES]
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler, core_1.Renderer, router_1.Router])
	    ], SplitButton);
	    return SplitButton;
	}());
	exports.SplitButton = SplitButton;
	//# sourceMappingURL=splitbutton.js.map

/***/ },

/***/ 463:
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(5);
	var SplitButtonItem = (function () {
	    function SplitButtonItem() {
	        this.onClick = new core_1.EventEmitter();
	    }
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], SplitButtonItem.prototype, "icon", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], SplitButtonItem.prototype, "label", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], SplitButtonItem.prototype, "url", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], SplitButtonItem.prototype, "routerLink", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], SplitButtonItem.prototype, "onClick", void 0);
	    SplitButtonItem = __decorate([
	        core_1.Component({
	            selector: 'p-splitButtonItem',
	            template: "\n        \n    "
	        }), 
	        __metadata('design:paramtypes', [])
	    ], SplitButtonItem);
	    return SplitButtonItem;
	}());
	exports.SplitButtonItem = SplitButtonItem;
	//# sourceMappingURL=splitbuttonitem.js.map

/***/ },

/***/ 464:
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(5);
	var Panel = (function () {
	    function Panel() {
	        this.collapsed = false;
	        this.onBeforeToggle = new core_1.EventEmitter();
	        this.onAfterToggle = new core_1.EventEmitter();
	    }
	    Panel.prototype.toggle = function (event) {
	        this.onBeforeToggle.emit({ originalEvent: event, collapsed: this.collapsed });
	        if (this.toggleable) {
	            if (this.collapsed)
	                this.expand(event);
	            else
	                this.collapse(event);
	        }
	        this.onAfterToggle.emit({ originalEvent: event, collapsed: this.collapsed });
	        event.preventDefault();
	    };
	    Panel.prototype.expand = function (event) {
	        this.collapsed = false;
	    };
	    Panel.prototype.collapse = function (event) {
	        this.collapsed = true;
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], Panel.prototype, "toggleable", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Panel.prototype, "header", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], Panel.prototype, "collapsed", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], Panel.prototype, "style", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Panel.prototype, "styleClass", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], Panel.prototype, "onBeforeToggle", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], Panel.prototype, "onAfterToggle", void 0);
	    Panel = __decorate([
	        core_1.Component({
	            selector: 'p-panel',
	            template: "\n        <div [ngClass]=\"'ui-panel ui-widget ui-widget-content ui-corner-all'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-panel-titlebar ui-widget-header ui-helper-clearfix ui-corner-all\">\n                <span class=\"ui-panel-title\" *ngIf=\"header\">{{header}}</span>\n                <ng-content select=\"header\"></ng-content>\n                <a *ngIf=\"toggleable\" class=\"ui-panel-titlebar-icon ui-panel-titlebar-toggler ui-corner-all ui-state-default\" href=\"#\"\n                    [ngClass]=\"{'ui-state-hover':hoverToggler}\" (mouseenter)=\"hoverToggler=true\" (mouseleave)=\"hoverToggler=false\" (click)=\"toggle($event)\">\n                    <span class=\"fa fa-fw\" [ngClass]=\"{'fa-minus': !collapsed,'fa-plus':collapsed}\"></span>\n                </a>\n            </div>\n            <div class=\"ui-panel-content ui-widget-content\" [style.display]=\"collapsed ? 'none' : 'block'\">\n                <ng-content></ng-content>\n            </div>\n        </div>\n    "
	        }), 
	        __metadata('design:paramtypes', [])
	    ], Panel);
	    return Panel;
	}());
	exports.Panel = Panel;
	//# sourceMappingURL=panel.js.map

/***/ },

/***/ 465:
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(5);
	var Accordion = (function () {
	    function Accordion(el) {
	        this.el = el;
	        this.onClose = new core_1.EventEmitter();
	        this.onOpen = new core_1.EventEmitter();
	        this.tabs = [];
	    }
	    Accordion.prototype.addTab = function (tab) {
	        this.tabs.push(tab);
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], Accordion.prototype, "multiple", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], Accordion.prototype, "onClose", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], Accordion.prototype, "onOpen", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], Accordion.prototype, "style", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Accordion.prototype, "styleClass", void 0);
	    Accordion = __decorate([
	        core_1.Component({
	            selector: 'p-accordion',
	            template: "\n        <div [ngClass]=\"'ui-accordion ui-widget ui-helper-reset'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <ng-content></ng-content>\n        </div>\n    ",
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef])
	    ], Accordion);
	    return Accordion;
	}());
	exports.Accordion = Accordion;
	//# sourceMappingURL=accordion.js.map

/***/ },

/***/ 466:
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(5);
	var accordion_1 = __webpack_require__(465);
	var common_1 = __webpack_require__(467);
	var AccordionTab = (function () {
	    function AccordionTab(accordion) {
	        this.accordion = accordion;
	        this.accordion.addTab(this);
	    }
	    AccordionTab.prototype.toggle = function (event) {
	        if (this.disabled) {
	            event.preventDefault();
	            return;
	        }
	        var index = this.findTabIndex();
	        if (this.selected) {
	            this.selected = !this.selected;
	            this.accordion.onClose.emit({ originalEvent: event, index: index });
	        }
	        else {
	            if (!this.accordion.multiple) {
	                for (var i = 0; i < this.accordion.tabs.length; i++) {
	                    this.accordion.tabs[i].selected = false;
	                }
	            }
	            this.selected = true;
	            this.accordion.onOpen.emit({ originalEvent: event, index: index });
	        }
	        event.preventDefault();
	    };
	    AccordionTab.prototype.findTabIndex = function () {
	        var index = -1;
	        for (var i = 0; i < this.accordion.tabs.length; i++) {
	            if (this.accordion.tabs[i] == this) {
	                index = i;
	                break;
	            }
	        }
	        return index;
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], AccordionTab.prototype, "header", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], AccordionTab.prototype, "selected", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], AccordionTab.prototype, "disabled", void 0);
	    __decorate([
	        core_1.ContentChild(common_1.Header), 
	        __metadata('design:type', Object)
	    ], AccordionTab.prototype, "headerFacet", void 0);
	    AccordionTab = __decorate([
	        core_1.Component({
	            selector: 'p-accordionTab',
	            template: "\n        <div class=\"ui-accordion-header ui-helper-reset ui-state-default\" [ngClass]=\"{'ui-state-active': selected,'ui-state-hover':hover&&!disabled,'ui-state-disabled':disabled}\"\n            (click)=\"toggle($event)\" (mouseenter)=\"hover = true\" (mouseleave)=\"hover=false\">\n            <span class=\"fa fa-fw\" [ngClass]=\"{'fa-caret-down': selected, 'fa-caret-right': !selected}\"></span>\n            <a href=\"#\" *ngIf=\"!headerFacet\">{{header}}</a>\n            <a href=\"#\" *ngIf=\"headerFacet\">\n                <ng-content select=\"header\"></ng-content>\n            </a>\n        </div>\n        <div class=\"ui-accordion-content ui-helper-reset ui-widget-content\" [style.display]=\"selected ? 'block' : 'none'\">\n            <ng-content></ng-content>\n        </div>\n    "
	        }), 
	        __metadata('design:paramtypes', [accordion_1.Accordion])
	    ], AccordionTab);
	    return AccordionTab;
	}());
	exports.AccordionTab = AccordionTab;
	//# sourceMappingURL=accordiontab.js.map

/***/ },

/***/ 467:
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(5);
	var core_2 = __webpack_require__(5);
	var Header = (function () {
	    function Header() {
	    }
	    Header = __decorate([
	        core_2.Component({
	            selector: 'header',
	            template: '<ng-content></ng-content>'
	        }), 
	        __metadata('design:paramtypes', [])
	    ], Header);
	    return Header;
	}());
	exports.Header = Header;
	var Footer = (function () {
	    function Footer() {
	    }
	    Footer = __decorate([
	        core_2.Component({
	            selector: 'footer',
	            template: '<ng-content></ng-content>'
	        }), 
	        __metadata('design:paramtypes', [])
	    ], Footer);
	    return Footer;
	}());
	exports.Footer = Footer;
	var TemplateWrapper = (function () {
	    function TemplateWrapper(viewContainer) {
	        this.viewContainer = viewContainer;
	    }
	    TemplateWrapper.prototype.ngOnInit = function () {
	        var view = this.viewContainer.createEmbeddedView(this.templateRef, {
	            '\$implicit': this.item
	        });
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], TemplateWrapper.prototype, "item", void 0);
	    __decorate([
	        core_1.Input('pTemplateWrapper'), 
	        __metadata('design:type', core_1.TemplateRef)
	    ], TemplateWrapper.prototype, "templateRef", void 0);
	    TemplateWrapper = __decorate([
	        core_1.Directive({
	            selector: '[pTemplateWrapper]'
	        }), 
	        __metadata('design:paramtypes', [core_1.ViewContainerRef])
	    ], TemplateWrapper);
	    return TemplateWrapper;
	}());
	exports.TemplateWrapper = TemplateWrapper;
	//# sourceMappingURL=common.js.map

/***/ },

/***/ 468:
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(5);
	var forms_1 = __webpack_require__(387);
	var CHECKBOX_VALUE_ACCESSOR = new core_1.Provider(forms_1.NG_VALUE_ACCESSOR, {
	    useExisting: core_1.forwardRef(function () { return Checkbox; }),
	    multi: true
	});
	var Checkbox = (function () {
	    function Checkbox() {
	        this.onChange = new core_1.EventEmitter();
	        this.onModelChange = function () { };
	        this.onModelTouched = function () { };
	        this.focused = false;
	        this.checked = false;
	    }
	    Checkbox.prototype.onClick = function (event, checkbox, focus) {
	        event.preventDefault();
	        if (this.disabled) {
	            return;
	        }
	        this.checked = !this.checked;
	        if (!this.binary) {
	            if (this.checked)
	                this.addValue(this.value);
	            else
	                this.removeValue(this.value);
	            this.onModelChange(this.model);
	        }
	        else {
	            this.onModelChange(this.checked);
	        }
	        this.onChange.emit(this.checked);
	        if (focus) {
	            checkbox.focus();
	        }
	    };
	    Checkbox.prototype.isChecked = function () {
	        if (!this.binary)
	            return this.findValueIndex(this.value) !== -1;
	        else
	            return this.model;
	    };
	    Checkbox.prototype.removeValue = function (value) {
	        var index = this.findValueIndex(value);
	        if (index >= 0) {
	            this.model.splice(index, 1);
	        }
	    };
	    Checkbox.prototype.addValue = function (value) {
	        this.model.push(value);
	    };
	    Checkbox.prototype.onFocus = function (event) {
	        this.focused = true;
	    };
	    Checkbox.prototype.onBlur = function (event) {
	        this.focused = false;
	        this.onModelTouched();
	    };
	    Checkbox.prototype.findValueIndex = function (value) {
	        var index = -1;
	        if (this.model) {
	            for (var i = 0; i < this.model.length; i++) {
	                if (this.model[i] == value) {
	                    index = i;
	                    break;
	                }
	            }
	        }
	        return index;
	    };
	    Checkbox.prototype.writeValue = function (model) {
	        this.model = model;
	        this.checked = this.isChecked();
	    };
	    Checkbox.prototype.registerOnChange = function (fn) {
	        this.onModelChange = fn;
	    };
	    Checkbox.prototype.registerOnTouched = function (fn) {
	        this.onModelTouched = fn;
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], Checkbox.prototype, "value", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Checkbox.prototype, "name", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], Checkbox.prototype, "disabled", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Checkbox.prototype, "binary", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Checkbox.prototype, "label", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], Checkbox.prototype, "onChange", void 0);
	    Checkbox = __decorate([
	        core_1.Component({
	            selector: 'p-checkbox',
	            template: "\n        <div class=\"ui-chkbox ui-widget\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #cb type=\"checkbox\" name=\"{{name}}\" value=\"{{value}}\" [checked]=\"checked\" (focus)=\"onFocus($event)\" (blur)=\"onBlur($event)\"\n                [ngClass]=\"{'ui-state-focus':focused}\" (keydown.space)=\"onClick($event,cb,false)\">\n            </div>\n            <div class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\" (click)=\"onClick($event,cb,true)\"\n                        (mouseover)=\"hover=true\" (mouseout)=\"hover=false\" \n                        [ngClass]=\"{'ui-state-hover':hover&&!disabled,'ui-state-active':checked,'ui-state-disabled':disabled,'ui-state-focus':focused}\">\n                <span class=\"ui-chkbox-icon ui-c\" [ngClass]=\"{'fa fa-fw fa-check':checked}\"></span>\n            </div>\n        </div>\n        <label class=\"ui-chkbox-label\" (click)=\"onClick($event,cb,true)\" *ngIf=\"label\">{{label}}</label>\n    ",
	            providers: [CHECKBOX_VALUE_ACCESSOR]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], Checkbox);
	    return Checkbox;
	}());
	exports.Checkbox = Checkbox;
	//# sourceMappingURL=checkbox.js.map

/***/ },

/***/ 469:
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(5);
	var domhandler_1 = __webpack_require__(382);
	var Button = (function () {
	    function Button(el, domHandler) {
	        this.el = el;
	        this.domHandler = domHandler;
	        this.iconPos = 'left';
	    }
	    Button.prototype.ngAfterViewInit = function () {
	        this.domHandler.addMultipleClasses(this.el.nativeElement, this.getStyleClass());
	        if (this.icon) {
	            var iconElement = document.createElement("span");
	            var iconPosClass = (this.iconPos == 'right') ? 'ui-button-icon-right' : 'ui-button-icon-left';
	            iconElement.className = iconPosClass + ' ui-c fa fa-fw ' + this.icon;
	            this.el.nativeElement.appendChild(iconElement);
	        }
	        var labelElement = document.createElement("span");
	        labelElement.className = 'ui-button-text ui-c';
	        labelElement.appendChild(document.createTextNode(this.label || 'ui-button'));
	        this.el.nativeElement.appendChild(labelElement);
	        this.initialized = true;
	    };
	    Button.prototype.onMouseenter = function (e) {
	        this.hover = true;
	    };
	    Button.prototype.onMouseleave = function (e) {
	        this.hover = false;
	        this.active = false;
	    };
	    Button.prototype.onMouseDown = function (e) {
	        this.active = true;
	    };
	    Button.prototype.onMouseUp = function (e) {
	        this.active = false;
	    };
	    Button.prototype.onFocus = function (e) {
	        this.focus = true;
	    };
	    Button.prototype.onBlur = function (e) {
	        this.focus = false;
	    };
	    Button.prototype.isDisabled = function () {
	        return this.el.nativeElement.disabled;
	    };
	    Button.prototype.getStyleClass = function () {
	        var styleClass = 'ui-button ui-widget ui-state-default ui-corner-all';
	        if (this.icon) {
	            if (this.label != null && this.label != undefined) {
	                if (this.iconPos == 'left')
	                    styleClass = styleClass + ' ui-button-text-icon-left';
	                else
	                    styleClass = styleClass + ' ui-button-text-icon-right';
	            }
	            else {
	                styleClass = styleClass + ' ui-button-icon-only';
	            }
	        }
	        else {
	            styleClass = styleClass + ' ui-button-text-only';
	        }
	        return styleClass;
	    };
	    Object.defineProperty(Button.prototype, "label", {
	        get: function () {
	            return this._label;
	        },
	        set: function (val) {
	            this._label = val;
	            if (this.initialized) {
	                this.domHandler.findSingle(this.el.nativeElement, '.ui-button-text').textContent = this._label;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Button.prototype.ngOnDestroy = function () {
	        while (this.el.nativeElement.hasChildNodes()) {
	            this.el.nativeElement.removeChild(this.el.nativeElement.lastChild);
	        }
	        this.initialized = false;
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Button.prototype, "icon", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Button.prototype, "iconPos", void 0);
	    __decorate([
	        core_1.HostListener('mouseenter', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [Object]), 
	        __metadata('design:returntype', void 0)
	    ], Button.prototype, "onMouseenter", null);
	    __decorate([
	        core_1.HostListener('mouseleave', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [Object]), 
	        __metadata('design:returntype', void 0)
	    ], Button.prototype, "onMouseleave", null);
	    __decorate([
	        core_1.HostListener('mousedown', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [Object]), 
	        __metadata('design:returntype', void 0)
	    ], Button.prototype, "onMouseDown", null);
	    __decorate([
	        core_1.HostListener('mouseup', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [Object]), 
	        __metadata('design:returntype', void 0)
	    ], Button.prototype, "onMouseUp", null);
	    __decorate([
	        core_1.HostListener('focus', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [Object]), 
	        __metadata('design:returntype', void 0)
	    ], Button.prototype, "onFocus", null);
	    __decorate([
	        core_1.HostListener('blur', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [Object]), 
	        __metadata('design:returntype', void 0)
	    ], Button.prototype, "onBlur", null);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Button.prototype, "label", null);
	    Button = __decorate([
	        core_1.Directive({
	            selector: '[pButton]',
	            host: {
	                '[class.ui-state-hover]': 'hover&&!isDisabled()',
	                '[class.ui-state-focus]': 'focus',
	                '[class.ui-state-active]': 'active',
	                '[class.ui-state-disabled]': 'isDisabled()'
	            },
	            providers: [domhandler_1.DomHandler]
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler])
	    ], Button);
	    return Button;
	}());
	exports.Button = Button;
	//# sourceMappingURL=button.js.map

/***/ },

/***/ 470:
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(5);
	var domhandler_1 = __webpack_require__(382);
	var OverlayPanel = (function () {
	    function OverlayPanel(el, domHandler, renderer) {
	        this.el = el;
	        this.domHandler = domHandler;
	        this.renderer = renderer;
	        this.dismissable = true;
	        this.onBeforeShow = new core_1.EventEmitter();
	        this.onAfterShow = new core_1.EventEmitter();
	        this.onBeforeHide = new core_1.EventEmitter();
	        this.onAfterHide = new core_1.EventEmitter();
	        this.visible = false;
	    }
	    OverlayPanel.prototype.ngOnInit = function () {
	        var _this = this;
	        if (this.dismissable) {
	            this.documentClickListener = this.renderer.listenGlobal('body', 'click', function () {
	                if (!_this.selfClick && !_this.targetEvent) {
	                    _this.hide();
	                }
	                _this.selfClick = false;
	                _this.targetEvent = false;
	            });
	        }
	    };
	    OverlayPanel.prototype.ngAfterViewInit = function () {
	        this.container = this.el.nativeElement.children[0];
	        if (this.appendTo) {
	            if (this.appendTo === 'body')
	                document.body.appendChild(this.container);
	            else
	                this.appendTo.appendChild(this.container);
	        }
	    };
	    OverlayPanel.prototype.toggle = function (event, target) {
	        var currentTarget = (target || event.currentTarget || event.target);
	        if (!this.target || this.target == currentTarget) {
	            if (this.visible)
	                this.hide();
	            else
	                this.show(event, target);
	        }
	        else {
	            this.show(event, target);
	        }
	        if (this.dismissable) {
	            this.targetEvent = true;
	        }
	        this.target = currentTarget;
	    };
	    OverlayPanel.prototype.show = function (event, target) {
	        if (this.dismissable) {
	            this.targetEvent = true;
	        }
	        this.onBeforeShow.emit(null);
	        var elementTarget = target || event.currentTarget || event.target;
	        this.container.style.zIndex = ++domhandler_1.DomHandler.zindex;
	        if (this.visible) {
	            this.domHandler.absolutePosition(this.container, elementTarget);
	        }
	        else {
	            this.visible = true;
	            this.domHandler.absolutePosition(this.container, elementTarget);
	            this.domHandler.fadeIn(this.container, 250);
	        }
	        this.onAfterShow.emit(null);
	    };
	    OverlayPanel.prototype.hide = function () {
	        if (this.visible) {
	            this.onBeforeHide.emit(null);
	            this.visible = false;
	            this.onAfterHide.emit(null);
	        }
	    };
	    OverlayPanel.prototype.onPanelClick = function () {
	        if (this.dismissable) {
	            this.selfClick = true;
	        }
	    };
	    OverlayPanel.prototype.onCloseClick = function (event) {
	        this.hide();
	        if (this.dismissable) {
	            this.selfClick = true;
	        }
	        event.preventDefault();
	    };
	    OverlayPanel.prototype.ngOnDestroy = function () {
	        if (this.documentClickListener) {
	            this.documentClickListener();
	        }
	        if (this.appendTo) {
	            this.el.nativeElement.appendChild(this.container);
	        }
	        this.target = null;
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], OverlayPanel.prototype, "dismissable", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], OverlayPanel.prototype, "showCloseIcon", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], OverlayPanel.prototype, "style", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], OverlayPanel.prototype, "styleClass", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], OverlayPanel.prototype, "appendTo", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], OverlayPanel.prototype, "onBeforeShow", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], OverlayPanel.prototype, "onAfterShow", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], OverlayPanel.prototype, "onBeforeHide", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], OverlayPanel.prototype, "onAfterHide", void 0);
	    OverlayPanel = __decorate([
	        core_1.Component({
	            selector: 'p-overlayPanel',
	            template: "\n        <div [ngClass]=\"'ui-overlaypanel ui-widget ui-widget-content ui-corner-all ui-shadow'\" [ngStyle]=\"style\" [class]=\"styleClass\"\n            [style.display]=\"visible ? 'block' : 'none'\" (click)=\"onPanelClick()\">\n            <div class=\"ui-overlaypanel-content\">\n                <ng-content></ng-content>\n            </div>\n            <a href=\"#\" *ngIf=\"showCloseIcon\" class=\"ui-overlaypanel-close ui-state-default\" [ngClass]=\"{'ui-state-hover':hoverCloseIcon}\"\n                (mouseenter)=\"hoverCloseIcon=true\" (mouseleave)=\"hoverCloseIcon=false\" (click)=\"onCloseClick($event)\"><span class=\"fa fa-fw fa-close\"></span></a>\n        </div>\n    ",
	            providers: [domhandler_1.DomHandler]
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler, core_1.Renderer])
	    ], OverlayPanel);
	    return OverlayPanel;
	}());
	exports.OverlayPanel = OverlayPanel;
	//# sourceMappingURL=overlaypanel.js.map

/***/ },

/***/ 471:
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(5);
	var domhandler_1 = __webpack_require__(382);
	var Tooltip = (function () {
	    function Tooltip(el, domHandler) {
	        this.el = el;
	        this.domHandler = domHandler;
	        this.tooltipPosition = 'right';
	        this.tooltipEvent = 'hover';
	    }
	    Tooltip.prototype.onMouseEnter = function (e) {
	        if (this.tooltipEvent === 'hover') {
	            this.show();
	        }
	    };
	    Tooltip.prototype.onMouseLeave = function (e) {
	        if (this.tooltipEvent === 'hover') {
	            this.hide();
	        }
	    };
	    Tooltip.prototype.onFocus = function (e) {
	        if (this.tooltipEvent === 'focus') {
	            this.show();
	        }
	    };
	    Tooltip.prototype.onBlur = function (e) {
	        if (this.tooltipEvent === 'focus') {
	            this.hide();
	        }
	    };
	    Tooltip.prototype.show = function () {
	        this.create();
	        var rect = this.el.nativeElement.getBoundingClientRect();
	        var targetTop = rect.top + document.body.scrollTop;
	        var targetLeft = rect.left + document.body.scrollLeft;
	        var left;
	        var top;
	        this.container.style.display = 'block';
	        switch (this.tooltipPosition) {
	            case 'right':
	                left = targetLeft + this.domHandler.getOuterWidth(this.el.nativeElement);
	                top = targetTop + (this.domHandler.getOuterHeight(this.el.nativeElement) - this.domHandler.getOuterHeight(this.container)) / 2;
	                break;
	            case 'left':
	                left = targetLeft - this.domHandler.getOuterWidth(this.container);
	                top = targetTop + (this.domHandler.getOuterHeight(this.el.nativeElement) - this.domHandler.getOuterHeight(this.container)) / 2;
	                break;
	            case 'top':
	                left = targetLeft + (this.domHandler.getOuterWidth(this.el.nativeElement) - this.domHandler.getOuterWidth(this.container)) / 2;
	                top = targetTop - this.domHandler.getOuterHeight(this.container);
	                break;
	            case 'bottom':
	                left = targetLeft + (this.domHandler.getOuterWidth(this.el.nativeElement) - this.domHandler.getOuterWidth(this.container)) / 2;
	                top = targetTop + this.domHandler.getOuterHeight(this.el.nativeElement);
	                break;
	        }
	        this.container.style.left = left + 'px';
	        this.container.style.top = top + 'px';
	        this.domHandler.fadeIn(this.container, 250);
	        this.container.style.zIndex = ++domhandler_1.DomHandler.zindex;
	    };
	    Tooltip.prototype.hide = function () {
	        this.container.style.display = 'none';
	        document.body.removeChild(this.container);
	        this.container = null;
	    };
	    Tooltip.prototype.create = function () {
	        this.container = document.createElement('div');
	        this.container.className = 'ui-widget ui-tooltip ui-tooltip-' + this.tooltipPosition;
	        var tooltipArrow = document.createElement('div');
	        tooltipArrow.className = 'ui-tooltip-arrow';
	        this.container.appendChild(tooltipArrow);
	        var tooltipText = document.createElement('div');
	        tooltipText.className = 'ui-tooltip-text ui-shadow ui-corner-all';
	        tooltipText.innerHTML = this.text;
	        this.container.appendChild(tooltipText);
	        document.body.appendChild(this.container);
	    };
	    Tooltip.prototype.ngOnDestroy = function () {
	        if (this.container && this.container.parentElement) {
	            document.body.removeChild(this.container);
	        }
	        this.container = null;
	    };
	    __decorate([
	        core_1.Input('pTooltip'), 
	        __metadata('design:type', String)
	    ], Tooltip.prototype, "text", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Tooltip.prototype, "tooltipPosition", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Tooltip.prototype, "tooltipEvent", void 0);
	    __decorate([
	        core_1.HostListener('mouseenter', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [Object]), 
	        __metadata('design:returntype', void 0)
	    ], Tooltip.prototype, "onMouseEnter", null);
	    __decorate([
	        core_1.HostListener('mouseleave', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [Object]), 
	        __metadata('design:returntype', void 0)
	    ], Tooltip.prototype, "onMouseLeave", null);
	    __decorate([
	        core_1.HostListener('focus', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [Object]), 
	        __metadata('design:returntype', void 0)
	    ], Tooltip.prototype, "onFocus", null);
	    __decorate([
	        core_1.HostListener('blur', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [Object]), 
	        __metadata('design:returntype', void 0)
	    ], Tooltip.prototype, "onBlur", null);
	    Tooltip = __decorate([
	        core_1.Directive({
	            selector: '[pTooltip]',
	            host: {},
	            providers: [domhandler_1.DomHandler]
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler])
	    ], Tooltip);
	    return Tooltip;
	}());
	exports.Tooltip = Tooltip;
	//# sourceMappingURL=tooltip.js.map

/***/ },

/***/ 472:
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(5);
	var InputTextarea = (function () {
	    function InputTextarea(el) {
	        this.el = el;
	    }
	    InputTextarea.prototype.ngOnInit = function () {
	        this.rowsDefault = this.rows;
	        this.colsDefault = this.cols;
	    };
	    InputTextarea.prototype.onMouseover = function (e) {
	        this.hover = true;
	    };
	    InputTextarea.prototype.onMouseout = function (e) {
	        this.hover = false;
	    };
	    InputTextarea.prototype.onFocus = function (e) {
	        this.focus = true;
	        if (this.autoResize) {
	            this.resize();
	        }
	    };
	    InputTextarea.prototype.onBlur = function (e) {
	        this.focus = false;
	        if (this.autoResize) {
	            this.resize();
	        }
	    };
	    InputTextarea.prototype.isDisabled = function () {
	        return this.el.nativeElement.disabled;
	    };
	    InputTextarea.prototype.onKeyup = function (e) {
	        if (this.autoResize) {
	            this.resize();
	        }
	    };
	    InputTextarea.prototype.resize = function () {
	        var linesCount = 0, lines = this.el.nativeElement.value.split('\n');
	        for (var i = lines.length - 1; i >= 0; --i) {
	            linesCount += Math.floor((lines[i].length / this.colsDefault) + 1);
	        }
	        this.rows = (linesCount >= this.rowsDefault) ? (linesCount + 1) : this.rowsDefault;
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], InputTextarea.prototype, "autoResize", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], InputTextarea.prototype, "rows", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], InputTextarea.prototype, "cols", void 0);
	    __decorate([
	        core_1.HostListener('mouseover', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [Object]), 
	        __metadata('design:returntype', void 0)
	    ], InputTextarea.prototype, "onMouseover", null);
	    __decorate([
	        core_1.HostListener('mouseout', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [Object]), 
	        __metadata('design:returntype', void 0)
	    ], InputTextarea.prototype, "onMouseout", null);
	    __decorate([
	        core_1.HostListener('focus', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [Object]), 
	        __metadata('design:returntype', void 0)
	    ], InputTextarea.prototype, "onFocus", null);
	    __decorate([
	        core_1.HostListener('blur', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [Object]), 
	        __metadata('design:returntype', void 0)
	    ], InputTextarea.prototype, "onBlur", null);
	    __decorate([
	        core_1.HostListener('keyup', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [Object]), 
	        __metadata('design:returntype', void 0)
	    ], InputTextarea.prototype, "onKeyup", null);
	    InputTextarea = __decorate([
	        core_1.Directive({
	            selector: '[pInputTextarea]',
	            host: {
	                '[class.ui-inputtext]': 'true',
	                '[class.ui-corner-all]': 'true',
	                '[class.ui-state-default]': 'true',
	                '[class.ui-widget]': 'true',
	                '[class.ui-state-hover]': 'hover',
	                '[class.ui-state-focus]': 'focus',
	                '[class.ui-state-disabled]': 'isDisabled()',
	                '[attr.rows]': 'rows',
	                '[attr.cols]': 'cols'
	            }
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef])
	    ], InputTextarea);
	    return InputTextarea;
	}());
	exports.InputTextarea = InputTextarea;
	//# sourceMappingURL=inputtextarea.js.map

/***/ },

/***/ 473:
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(5);
	var forms_1 = __webpack_require__(387);
	var SELECTBUTTON_VALUE_ACCESSOR = new core_1.Provider(forms_1.NG_VALUE_ACCESSOR, {
	    useExisting: core_1.forwardRef(function () { return SelectButton; }),
	    multi: true
	});
	var SelectButton = (function () {
	    function SelectButton() {
	        this.onChange = new core_1.EventEmitter();
	        this.onModelChange = function () { };
	        this.onModelTouched = function () { };
	    }
	    SelectButton.prototype.writeValue = function (value) {
	        this.value = value;
	    };
	    SelectButton.prototype.registerOnChange = function (fn) {
	        this.onModelChange = fn;
	    };
	    SelectButton.prototype.registerOnTouched = function (fn) {
	        this.onModelTouched = fn;
	    };
	    SelectButton.prototype.onItemClick = function (event, option) {
	        if (this.multiple) {
	            var itemIndex = this.findItemIndex(option);
	            if (itemIndex != -1)
	                this.value.splice(itemIndex, 1);
	            else
	                this.value.push(option.value);
	        }
	        else {
	            this.value = option.value;
	        }
	        this.onModelChange(this.value);
	        this.onChange.emit({
	            originalEvent: event,
	            value: this.value
	        });
	    };
	    SelectButton.prototype.isSelected = function (option) {
	        if (this.multiple)
	            return this.findItemIndex(option) != -1;
	        else
	            return option.value == this.value;
	    };
	    SelectButton.prototype.findItemIndex = function (option) {
	        var index = -1;
	        if (this.value) {
	            for (var i = 0; i < this.value.length; i++) {
	                if (this.value[i] == option.value) {
	                    index = i;
	                    break;
	                }
	            }
	        }
	        return index;
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Array)
	    ], SelectButton.prototype, "options", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], SelectButton.prototype, "tabindex", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], SelectButton.prototype, "multiple", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], SelectButton.prototype, "style", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], SelectButton.prototype, "styleClass", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], SelectButton.prototype, "onChange", void 0);
	    SelectButton = __decorate([
	        core_1.Component({
	            selector: 'p-selectButton',
	            template: "\n        <div [ngClass]=\"'ui-selectbutton ui-buttonset ui-widget ui-corner-all ui-buttonset-' + options.length\" (mouseleave)=\"hoveredItem=null\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div *ngFor=\"let option of options;\" class=\"ui-button ui-widget ui-state-default ui-button-text-only\"\n                [ngClass]=\"{'ui-state-hover': hoveredItem == option,'ui-state-active':isSelected(option)}\"\n                (mouseenter)=\"hoveredItem=option\" (click)=\"onItemClick($event,option)\">\n                <span class=\"ui-button-text ui-c\">{{option.label}}</span>\n            </div>\n        </div>\n    ",
	            providers: [SELECTBUTTON_VALUE_ACCESSOR]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], SelectButton);
	    return SelectButton;
	}());
	exports.SelectButton = SelectButton;
	//# sourceMappingURL=selectbutton.js.map

/***/ },

/***/ 474:
/***/ function(module, exports, __webpack_require__) {

	/*
	   "l'Agenda Collaboratif"
	   Copyright (C)  2016  Valentin VIENNOT
	   Contact : vviennot@orange.fr

	   This program is free software: you can redistribute it and/or modify
	   it under the terms of the GNU General Public License as published by
	   the Free Software Foundation, either version 3 of the License, or
	   (at your option) any later version.
	   
	   You have to put a copy of this program's license into your project.

	   This program is distributed in the hope that it will be useful,
	   but WITHOUT ANY WARRANTY; without even the implied warranty of
	   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	   GNU General Public License for more details.
	   
	   FULL LICENSE FILE : https://github.com/misterw97/agendacollaboratif/edit/master/LICENSE
	*/
	/**
	 * Created by Valentin on 29/07/2016.
	 */
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
	var core_1 = __webpack_require__(5);
	var synchronize_service_1 = __webpack_require__(435);
	var breadcrumb_1 = __webpack_require__(475);
	var datagrid_1 = __webpack_require__(476);
	var panel_1 = __webpack_require__(464);
	var button_1 = __webpack_require__(469);
	var overlaypanel_1 = __webpack_require__(470);
	var GroupComponent = (function () {
	    function GroupComponent(_sync) {
	        this._sync = _sync;
	        // Nombre de couleurs pour les matières TODO
	        this.COULEURS = 10;
	        // Liste des couleurs
	        this.tab = Array;
	        this.path = [];
	        this.groups = [];
	    }
	    GroupComponent.prototype.ngOnInit = function () {
	        console.log("* GroupController *");
	        // groupe 0 (ROOT, ex : INSA)
	        this.group = this._sync.getGroup(0);
	        this.push(this.group);
	        // Initialisation des groupes et matières root
	        this.refresh();
	    };
	    GroupComponent.prototype.refresh = function () {
	        console.log("REFRESH");
	        this.groups = this._sync.getGroups(this.group.id);
	    };
	    GroupComponent.prototype.push = function (group) {
	        this.path.push({ label: group.nom });
	    };
	    GroupComponent.prototype.changeGroup = function (group) {
	        this.push(group);
	        this.group = group;
	        this.refresh();
	    };
	    GroupComponent.prototype.toParent = function () {
	        if (this.path.length > 1) {
	            this.path.splice(-1);
	            this.group = this._sync.getGroup(this.group.parent);
	            this.refresh();
	        }
	        else {
	        }
	    };
	    GroupComponent.prototype.selectGroup = function (event, group, overlaypanel) {
	        this.selectedGroup = group;
	        overlaypanel.toggle(event);
	    };
	    /**
	     *
	     * @param index ID du groupe ou de la matière à rejoindre
	     */
	    GroupComponent.prototype.join = function (group) {
	        // TODO Appel à l'api de jonction de groupe (et matière)
	        this.refresh();
	    };
	    /**
	     *
	     * @param index ID du groupe ou de la matière à quitter
	     */
	    GroupComponent.prototype.quit = function (group) {
	        // TODO Appel à l'api de jonction de groupe (et matière) (quitter)
	        this.refresh();
	    };
	    GroupComponent = __decorate([
	        core_1.Component({
	            selector: 'agd-group',
	            templateUrl: 'app/group/group.html',
	            directives: [
	                breadcrumb_1.Breadcrumb,
	                datagrid_1.DataGrid,
	                panel_1.Panel,
	                button_1.Button,
	                overlaypanel_1.OverlayPanel
	            ],
	            providers: [
	                synchronize_service_1.SyncService
	            ],
	            pipes: []
	        }), 
	        __metadata('design:paramtypes', [synchronize_service_1.SyncService])
	    ], GroupComponent);
	    return GroupComponent;
	}());
	exports.GroupComponent = GroupComponent;
	//# sourceMappingURL=group.component.js.map

/***/ },

/***/ 475:
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(5);
	var router_1 = __webpack_require__(329);
	var Breadcrumb = (function () {
	    function Breadcrumb(router) {
	        this.router = router;
	    }
	    Breadcrumb.prototype.itemClick = function (event, item) {
	        if (!item.url || item.routerLink) {
	            event.preventDefault();
	        }
	        if (item.command) {
	            if (!item.eventEmitter) {
	                item.eventEmitter = new core_1.EventEmitter();
	                item.eventEmitter.subscribe(item.command);
	            }
	            item.eventEmitter.emit(event);
	        }
	        if (item.routerLink) {
	            this.router.navigate(item.routerLink);
	        }
	    };
	    Breadcrumb.prototype.ngOnDestroy = function () {
	        if (this.model) {
	            for (var _i = 0, _a = this.model; _i < _a.length; _i++) {
	                var item = _a[_i];
	                if (item.eventEmitter) {
	                    item.eventEmitter.unsubscribe();
	                }
	            }
	        }
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Array)
	    ], Breadcrumb.prototype, "model", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], Breadcrumb.prototype, "style", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Breadcrumb.prototype, "styleClass", void 0);
	    Breadcrumb = __decorate([
	        core_1.Component({
	            selector: 'p-breadcrumb',
	            template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\" [ngClass]=\"'ui-breadcrumb ui-widget ui-widget-header ui-helper-clearfix ui-corner-all'\">\n            <ul>\n                <li class=\"fa fa-home\"></li>\n                <template ngFor let-item let-end=\"last\" [ngForOf]=\"model\">\n                    <li role=\"menuitem\">\n                        <a [href]=\"item.url||'#'\" class=\"ui-menuitem-link\" (click)=\"itemClick($event, item)\">\n                            <span class=\"ui-menuitem-text\">{{item.label}}</span>\n                        </a>\n                    </li>\n                    <li class=\"ui-breadcrumb-chevron fa fa-chevron-right\" *ngIf=\"!end\"></li>\n                </template>\n            </ul>\n        </div>\n    "
	        }), 
	        __metadata('design:paramtypes', [router_1.Router])
	    ], Breadcrumb);
	    return Breadcrumb;
	}());
	exports.Breadcrumb = Breadcrumb;
	//# sourceMappingURL=breadcrumb.js.map

/***/ },

/***/ 476:
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(5);
	var common_1 = __webpack_require__(467);
	var common_2 = __webpack_require__(467);
	var paginator_1 = __webpack_require__(477);
	var DataGrid = (function () {
	    function DataGrid(el, differs) {
	        this.el = el;
	        this.columns = 3;
	        this.pageLinks = 5;
	        this.onLazyLoad = new core_1.EventEmitter();
	        this.paginatorPosition = 'bottom';
	        this.first = 0;
	        this.page = 0;
	        this.differ = differs.find([]).create(null);
	    }
	    DataGrid.prototype.ngAfterViewInit = function () {
	        if (this.lazy) {
	            this.onLazyLoad.emit({
	                first: this.first,
	                rows: this.rows
	            });
	        }
	    };
	    DataGrid.prototype.ngDoCheck = function () {
	        var changes = this.differ.diff(this.value);
	        if (changes) {
	            if (this.paginator) {
	                this.updatePaginator();
	            }
	            this.updateDataToRender(this.value);
	        }
	    };
	    DataGrid.prototype.updatePaginator = function () {
	        //total records
	        this.totalRecords = this.lazy ? this.totalRecords : (this.value ? this.value.length : 0);
	        //first
	        if (this.totalRecords && this.first >= this.totalRecords) {
	            var numberOfPages = Math.ceil(this.totalRecords / this.rows);
	            this.first = Math.max((numberOfPages - 1) * this.rows, 0);
	        }
	    };
	    DataGrid.prototype.paginate = function (event) {
	        this.first = event.first;
	        this.rows = event.rows;
	        if (this.lazy) {
	            this.onLazyLoad.emit(this.createLazyLoadMetadata());
	        }
	        else {
	            this.updateDataToRender(this.value);
	        }
	    };
	    DataGrid.prototype.updateDataToRender = function (datasource) {
	        if (this.paginator && datasource) {
	            this.dataToRender = [];
	            var startIndex = this.lazy ? 0 : this.first;
	            for (var i = startIndex; i < (startIndex + this.rows); i++) {
	                if (i >= datasource.length) {
	                    break;
	                }
	                this.dataToRender.push(datasource[i]);
	            }
	        }
	        else {
	            this.dataToRender = datasource;
	        }
	    };
	    DataGrid.prototype.isEmpty = function () {
	        return !this.dataToRender || (this.dataToRender.length == 0);
	    };
	    DataGrid.prototype.createLazyLoadMetadata = function () {
	        return {
	            first: this.first,
	            rows: this.rows
	        };
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Array)
	    ], DataGrid.prototype, "value", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], DataGrid.prototype, "paginator", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], DataGrid.prototype, "rows", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], DataGrid.prototype, "columns", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], DataGrid.prototype, "totalRecords", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], DataGrid.prototype, "pageLinks", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Array)
	    ], DataGrid.prototype, "rowsPerPageOptions", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], DataGrid.prototype, "lazy", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], DataGrid.prototype, "onLazyLoad", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], DataGrid.prototype, "style", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], DataGrid.prototype, "styleClass", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], DataGrid.prototype, "paginatorPosition", void 0);
	    __decorate([
	        core_1.ContentChild(common_1.Header), 
	        __metadata('design:type', Object)
	    ], DataGrid.prototype, "header", void 0);
	    __decorate([
	        core_1.ContentChild(common_2.Footer), 
	        __metadata('design:type', Object)
	    ], DataGrid.prototype, "footer", void 0);
	    __decorate([
	        core_1.ContentChild(core_1.TemplateRef), 
	        __metadata('design:type', core_1.TemplateRef)
	    ], DataGrid.prototype, "itemTemplate", void 0);
	    DataGrid = __decorate([
	        core_1.Component({
	            selector: 'p-dataGrid',
	            template: "\n        <div [ngClass]=\"'ui-datagrid ui-widget'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-datagrid-header ui-widget-header ui-corner-top\" *ngIf=\"header\">\n                <ng-content select=\"header\"></ng-content>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" \n                (onPageChange)=\"paginate($event)\" styleClass=\"ui-paginator-bottom\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && paginatorPosition!='bottom' || paginatorPosition =='both'\"></p-paginator>\n            <div class=\"ui-datagrid-content ui-widget-content\" [ngClass]=\"'ui-datagrid-col-' + columns\">\n                <template ngFor [ngForOf]=\"dataToRender\" [ngForTemplate]=\"itemTemplate\"></template>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" \n                (onPageChange)=\"paginate($event)\" styleClass=\"ui-paginator-bottom\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && paginatorPosition!='top' || paginatorPosition =='both'\"></p-paginator>\n            <div class=\"ui-datagrid-footer ui-widget-header ui-corner-top\" *ngIf=\"footer\">\n                <ng-content select=\"footer\"></ng-content>\n            </div>\n        </div>\n    ",
	            directives: [paginator_1.Paginator]
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef, core_1.IterableDiffers])
	    ], DataGrid);
	    return DataGrid;
	}());
	exports.DataGrid = DataGrid;
	//# sourceMappingURL=datagrid.js.map

/***/ },

/***/ 477:
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(5);
	var Paginator = (function () {
	    function Paginator() {
	        this.rows = 0;
	        this.pageLinkSize = 5;
	        this.onPageChange = new core_1.EventEmitter();
	        this._totalRecords = 0;
	        this._first = 0;
	    }
	    Object.defineProperty(Paginator.prototype, "totalRecords", {
	        get: function () {
	            return this._totalRecords;
	        },
	        set: function (val) {
	            this._totalRecords = val;
	            this.updatePageLinks();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Paginator.prototype, "first", {
	        get: function () {
	            return this._first;
	        },
	        set: function (val) {
	            this._first = val;
	            this.updatePageLinks();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Paginator.prototype.isFirstPage = function () {
	        return this.getPage() === 0;
	    };
	    Paginator.prototype.isLastPage = function () {
	        return this.getPage() === this.getPageCount() - 1;
	    };
	    Paginator.prototype.getPageCount = function () {
	        return Math.ceil(this.totalRecords / this.rows) || 1;
	    };
	    Paginator.prototype.calculatePageLinkBoundaries = function () {
	        var numberOfPages = this.getPageCount(), visiblePages = Math.min(this.pageLinkSize, numberOfPages);
	        //calculate range, keep current in middle if necessary
	        var start = Math.max(0, Math.ceil(this.getPage() - ((visiblePages) / 2))), end = Math.min(numberOfPages - 1, start + visiblePages - 1);
	        //check when approaching to last page
	        var delta = this.pageLinkSize - (end - start + 1);
	        start = Math.max(0, start - delta);
	        return [start, end];
	    };
	    Paginator.prototype.updatePageLinks = function () {
	        this.pageLinks = [];
	        var boundaries = this.calculatePageLinkBoundaries(), start = boundaries[0], end = boundaries[1];
	        for (var i = start; i <= end; i++) {
	            this.pageLinks.push(i + 1);
	        }
	    };
	    Paginator.prototype.changePage = function (p) {
	        var pc = this.getPageCount();
	        if (p >= 0 && p < pc) {
	            this.first = this.rows * p;
	            var state = {
	                page: p,
	                first: this.first,
	                rows: this.rows,
	                pageCount: pc
	            };
	            this.updatePageLinks();
	            this.onPageChange.emit(state);
	        }
	    };
	    Paginator.prototype.getPage = function () {
	        return Math.floor(this.first / this.rows);
	    };
	    Paginator.prototype.changePageToFirst = function () {
	        this.changePage(0);
	    };
	    Paginator.prototype.changePageToPrev = function () {
	        this.changePage(this.getPage() - 1);
	    };
	    Paginator.prototype.changePageToNext = function () {
	        this.changePage(this.getPage() + 1);
	    };
	    Paginator.prototype.changePageToLast = function () {
	        this.changePage(this.getPageCount() - 1);
	    };
	    Paginator.prototype.onRppChange = function (event) {
	        this.rows = this.rowsPerPageOptions[event.target.selectedIndex];
	        this.changePageToFirst();
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], Paginator.prototype, "rows", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], Paginator.prototype, "pageLinkSize", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], Paginator.prototype, "onPageChange", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], Paginator.prototype, "style", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Paginator.prototype, "styleClass", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Array)
	    ], Paginator.prototype, "rowsPerPageOptions", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], Paginator.prototype, "totalRecords", null);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], Paginator.prototype, "first", null);
	    Paginator = __decorate([
	        core_1.Component({
	            selector: 'p-paginator',
	            template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\" [ngClass]=\"{'ui-paginator ui-widget-header ui-unselectable-text':true}\">\n            <span #firstlink class=\"ui-paginator-first ui-paginator-element ui-state-default ui-corner-all\" (mouseenter)=\"hoveredItem = $event.target\" (mouseleave)=\"hoveredItem = null\"\n                        (click)=\"changePageToFirst()\" [ngClass]=\"{'ui-state-disabled':isFirstPage(),'ui-state-hover':(firstlink === hoveredItem && !isFirstPage())}\">\n                <span class=\"fa fa-step-backward\"></span>\n            </span>\n            <span #prevlink class=\"ui-paginator-prev ui-paginator-element ui-state-default ui-corner-all\" (mouseenter)=\"hoveredItem = $event.target\" (mouseleave)=\"hoveredItem = null\"\n                    (click)=\"changePageToPrev()\" [ngClass]=\"{'ui-state-disabled':isFirstPage(),'ui-state-hover':(prevlink === hoveredItem && !isFirstPage())}\">\n                <span class=\"fa fa-backward\"></span>\n            </span>\n            <span class=\"ui-paginator-pages\">\n                <span #plink *ngFor=\"let pageLink of pageLinks\" class=\"ui-paginator-page ui-paginator-element ui-state-default ui-corner-all\"\n                    (mouseenter)=\"hoveredItem = $event.target\" (mouseleave)=\"hoveredItem = null\" (click)=\"changePage(pageLink - 1)\"\n                    [ngClass]=\"{'ui-state-hover':(plink === hoveredItem), 'ui-state-active': (pageLink-1 == getPage())}\">{{pageLink}}</span>\n            </span>\n            <span #nextlink class=\"ui-paginator-next ui-paginator-element ui-state-default ui-corner-all\" (mouseenter)=\"hoveredItem = $event.target\" (mouseleave)=\"hoveredItem = null\"\n                    (click)=\"changePageToNext()\" [ngClass]=\"{'ui-state-disabled':isLastPage(),'ui-state-hover':(nextlink === hoveredItem  && !isLastPage())}\">\n                <span class=\"fa fa-forward\"></span>\n            </span>\n            <span #lastlink class=\"ui-paginator-last ui-paginator-element ui-state-default ui-corner-all\" (mouseenter)=\"hoveredItem = $event.target\" (mouseleave)=\"hoveredItem = null\"\n                    (click)=\"changePageToLast()\" [ngClass]=\"{'ui-state-disabled':isLastPage(),'ui-state-hover':(lastlink === hoveredItem  && !isLastPage())}\">\n                <span class=\"fa fa-step-forward\"></span>\n            </span>\n            <select class=\"ui-paginator-rpp-options ui-widget ui-state-default\" *ngIf=\"rowsPerPageOptions\" (change)=\"onRppChange($event)\">\n                <option *ngFor=\"let opt of rowsPerPageOptions\" [value]=\"opt\" [selected]=\"rows == opt\">{{opt}}</option>\n            </select>\n        </div>\n    "
	        }), 
	        __metadata('design:paramtypes', [])
	    ], Paginator);
	    return Paginator;
	}());
	exports.Paginator = Paginator;
	//# sourceMappingURL=paginator.js.map

/***/ },

/***/ 478:
/***/ function(module, exports, __webpack_require__) {

	/*
	    "l'Agenda Collaboratif"
	    Copyright (C)  2016  Valentin VIENNOT
	    Contact : vviennot@orange.fr

	    This program is free software: you can redistribute it and/or modify
	    it under the terms of the GNU General Public License as published by
	    the Free Software Foundation, either version 3 of the License, or
	    (at your option) any later version.
	    
	    You have to put a copy of this program's license into your project.

	    This program is distributed in the hope that it will be useful,
	    but WITHOUT ANY WARRANTY; without even the implied warranty of
	    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	    GNU General Public License for more details.
	    
	    FULL LICENSE FILE : https://github.com/misterw97/agendacollaboratif/edit/master/LICENSE
	*/
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
	var core_1 = __webpack_require__(5);
	var common_1 = __webpack_require__(2);
	__webpack_require__(424);
	__webpack_require__(431);
	var user_service_1 = __webpack_require__(384);
	var panel_1 = __webpack_require__(464);
	var button_1 = __webpack_require__(469);
	var inputtext_1 = __webpack_require__(479);
	var tooltip_1 = __webpack_require__(471);
	var togglebutton_1 = __webpack_require__(480);
	var inputswitch_1 = __webpack_require__(481);
	var UserComponent = (function () {
	    // Constructeur (de services)
	    function UserComponent(_user) {
	        this._user = _user;
	        this.changed = false;
	        this.form = new common_1.Control();
	    }
	    // Initialisation
	    UserComponent.prototype.ngOnInit = function () {
	        var _this = this;
	        console.log("* UserController *");
	        this.user = this._user.getUser();
	        // DEBUG : Est appelé sans raison au chargement !
	        this.form.valueChanges
	            .debounceTime(600)
	            .distinctUntilChanged()
	            .subscribe(function (form) { return _this.changed = true; });
	    };
	    UserComponent.prototype.save = function () {
	        this.changed = false;
	    };
	    UserComponent = __decorate([
	        core_1.Component({
	            selector: 'agd-user',
	            templateUrl: 'app/user/user.html',
	            directives: [
	                panel_1.Panel,
	                button_1.Button,
	                inputtext_1.InputText,
	                tooltip_1.Tooltip,
	                togglebutton_1.ToggleButton,
	                inputswitch_1.InputSwitch
	            ],
	            providers: [],
	            pipes: []
	        }), 
	        __metadata('design:paramtypes', [user_service_1.UserService])
	    ], UserComponent);
	    return UserComponent;
	}());
	exports.UserComponent = UserComponent;
	//# sourceMappingURL=user.component.js.map

/***/ },

/***/ 479:
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(5);
	var InputText = (function () {
	    function InputText(el) {
	        this.el = el;
	    }
	    InputText.prototype.onMouseover = function (e) {
	        this.hover = true;
	    };
	    InputText.prototype.onMouseout = function (e) {
	        this.hover = false;
	    };
	    InputText.prototype.onFocus = function (e) {
	        this.focus = true;
	    };
	    InputText.prototype.onBlur = function (e) {
	        this.focus = false;
	    };
	    InputText.prototype.isDisabled = function () {
	        return this.el.nativeElement.disabled;
	    };
	    __decorate([
	        core_1.HostListener('mouseover', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [Object]), 
	        __metadata('design:returntype', void 0)
	    ], InputText.prototype, "onMouseover", null);
	    __decorate([
	        core_1.HostListener('mouseout', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [Object]), 
	        __metadata('design:returntype', void 0)
	    ], InputText.prototype, "onMouseout", null);
	    __decorate([
	        core_1.HostListener('focus', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [Object]), 
	        __metadata('design:returntype', void 0)
	    ], InputText.prototype, "onFocus", null);
	    __decorate([
	        core_1.HostListener('blur', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [Object]), 
	        __metadata('design:returntype', void 0)
	    ], InputText.prototype, "onBlur", null);
	    InputText = __decorate([
	        core_1.Directive({
	            selector: '[pInputText]',
	            host: {
	                '[class.ui-inputtext]': 'true',
	                '[class.ui-corner-all]': 'true',
	                '[class.ui-state-default]': 'true',
	                '[class.ui-widget]': 'true',
	                '[class.ui-state-hover]': 'hover',
	                '[class.ui-state-focus]': 'focus',
	                '[class.ui-state-disabled]': 'isDisabled()'
	            }
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef])
	    ], InputText);
	    return InputText;
	}());
	exports.InputText = InputText;
	//# sourceMappingURL=inputtext.js.map

/***/ },

/***/ 480:
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(5);
	var forms_1 = __webpack_require__(387);
	var TOGGLEBUTTON_VALUE_ACCESSOR = new core_1.Provider(forms_1.NG_VALUE_ACCESSOR, {
	    useExisting: core_1.forwardRef(function () { return ToggleButton; }),
	    multi: true
	});
	var ToggleButton = (function () {
	    function ToggleButton() {
	        this.onLabel = 'Yes';
	        this.offLabel = 'No';
	        this.onChange = new core_1.EventEmitter();
	        this.checked = false;
	        this.onModelChange = function () { };
	        this.onModelTouched = function () { };
	    }
	    ToggleButton.prototype.getIconClass = function () {
	        var baseClass = 'ui-button-icon-left fa fa-fw';
	        return baseClass + ' ' + (this.checked ? this.onIcon : this.offIcon);
	    };
	    ToggleButton.prototype.toggle = function (event) {
	        if (!this.disabled) {
	            this.checked = !this.checked;
	            this.onModelChange(this.checked);
	            this.onModelTouched();
	            this.onChange.emit({
	                originalEvent: event,
	                checked: this.checked
	            });
	        }
	    };
	    ToggleButton.prototype.writeValue = function (value) {
	        this.checked = value;
	    };
	    ToggleButton.prototype.registerOnChange = function (fn) {
	        this.onModelChange = fn;
	    };
	    ToggleButton.prototype.registerOnTouched = function (fn) {
	        this.onModelTouched = fn;
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], ToggleButton.prototype, "onLabel", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], ToggleButton.prototype, "offLabel", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], ToggleButton.prototype, "onIcon", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], ToggleButton.prototype, "offIcon", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], ToggleButton.prototype, "disabled", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], ToggleButton.prototype, "style", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], ToggleButton.prototype, "styleClass", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], ToggleButton.prototype, "onChange", void 0);
	    ToggleButton = __decorate([
	        core_1.Component({
	            selector: 'p-toggleButton',
	            template: "\n        <div [ngClass]=\"{'ui-button ui-togglebutton ui-widget ui-state-default ui-corner-all': true, 'ui-button-text-only': (!onIcon&&!offIcon), 'ui-button-text-icon-left': (onIcon&&offIcon),\n                'ui-state-active': checked, 'ui-state-hover': hover&&!disabled, 'ui-state-disabled': disabled}\" [ngStyle]=\"style\" [class]=\"styleClass\" \n                (click)=\"toggle($event)\" (mouseenter)=\"hover=true\" (mouseleave)=\"hover=false\">\n            <span *ngIf=\"onIcon||offIcon\" [class]=\"getIconClass()\"></span>\n            <span class=\"ui-button-text ui-unselectable-text\">{{checked ? onLabel : offLabel}}</span>\n        </div>\n    ",
	            providers: [TOGGLEBUTTON_VALUE_ACCESSOR]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], ToggleButton);
	    return ToggleButton;
	}());
	exports.ToggleButton = ToggleButton;
	//# sourceMappingURL=togglebutton.js.map

/***/ },

/***/ 481:
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(5);
	var forms_1 = __webpack_require__(387);
	var domhandler_1 = __webpack_require__(382);
	var INPUTSWITCH_VALUE_ACCESSOR = new core_1.Provider(forms_1.NG_VALUE_ACCESSOR, {
	    useExisting: core_1.forwardRef(function () { return InputSwitch; }),
	    multi: true
	});
	var InputSwitch = (function () {
	    function InputSwitch(el, domHandler) {
	        this.el = el;
	        this.domHandler = domHandler;
	        this.onLabel = 'On';
	        this.offLabel = 'Off';
	        this.onChange = new core_1.EventEmitter();
	        this.checked = false;
	        this.focused = false;
	        this.onModelChange = function () { };
	        this.onModelTouched = function () { };
	        this.initialized = false;
	    }
	    InputSwitch.prototype.ngAfterViewInit = function () {
	        this.container = this.el.nativeElement.children[0];
	        this.handle = this.domHandler.findSingle(this.el.nativeElement, 'div.ui-inputswitch-handle');
	        this.onContainer = this.domHandler.findSingle(this.container, 'div.ui-inputswitch-on');
	        this.offContainer = this.domHandler.findSingle(this.container, 'div.ui-inputswitch-off');
	        this.onLabelChild = this.domHandler.findSingle(this.onContainer, 'span.ui-inputswitch-onlabel');
	        this.offLabelChild = this.domHandler.findSingle(this.offContainer, 'span.ui-inputswitch-offlabel');
	        var onContainerWidth = this.domHandler.width(this.onContainer), offContainerWidth = this.domHandler.width(this.offContainer), spanPadding = this.domHandler.innerWidth(this.offLabelChild) - this.domHandler.width(this.offLabelChild), handleMargins = this.domHandler.getOuterWidth(this.handle) - this.domHandler.innerWidth(this.handle);
	        var containerWidth = (onContainerWidth > offContainerWidth) ? onContainerWidth : offContainerWidth, handleWidth = containerWidth;
	        this.handle.style.width = handleWidth + 'px';
	        handleWidth = this.domHandler.width(this.handle);
	        containerWidth = containerWidth + handleWidth + 6;
	        var labelWidth = containerWidth - handleWidth - spanPadding - handleMargins;
	        this.container.style.width = containerWidth + 'px';
	        this.onLabelChild.style.width = labelWidth + 'px';
	        this.offLabelChild.style.width = labelWidth + 'px';
	        //position
	        this.offContainer.style.width = (this.domHandler.width(this.container) - 5) + 'px';
	        this.offset = this.domHandler.width(this.container) - this.domHandler.getOuterWidth(this.handle);
	        //default value
	        if (this.checked) {
	            this.handle.style.left = this.offset + 'px';
	            this.onContainer.style.width = this.offset + 'px';
	            this.offLabelChild.style.marginRight = -this.offset + 'px';
	        }
	        else {
	            this.onContainer.style.width = 0 + 'px';
	            this.onLabelChild.style.marginLeft = -this.offset + 'px';
	        }
	        this.initialized = true;
	    };
	    InputSwitch.prototype.toggle = function (event, checkbox) {
	        if (!this.disabled) {
	            if (this.checked) {
	                this.checked = false;
	                this.uncheckUI();
	            }
	            else {
	                this.checked = true;
	                this.checkUI();
	            }
	            this.onModelChange(this.checked);
	            this.onChange.emit({
	                originalEvent: event,
	                checked: this.checked
	            });
	            checkbox.focus();
	        }
	    };
	    InputSwitch.prototype.checkUI = function () {
	        this.onContainer.style.width = this.offset + 'px';
	        this.onLabelChild.style.marginLeft = 0 + 'px';
	        this.offLabelChild.style.marginRight = -this.offset + 'px';
	        this.handle.style.left = this.offset + 'px';
	    };
	    InputSwitch.prototype.uncheckUI = function () {
	        this.onContainer.style.width = 0 + 'px';
	        this.onLabelChild.style.marginLeft = -this.offset + 'px';
	        this.offLabelChild.style.marginRight = 0 + 'px';
	        this.handle.style.left = 0 + 'px';
	    };
	    InputSwitch.prototype.onFocus = function (event) {
	        this.focused = true;
	    };
	    InputSwitch.prototype.onBlur = function (event) {
	        this.focused = false;
	        this.onModelTouched();
	    };
	    InputSwitch.prototype.writeValue = function (checked) {
	        this.checked = checked;
	        if (this.initialized) {
	            if (this.checked === true)
	                this.checkUI();
	            else
	                this.uncheckUI();
	        }
	    };
	    InputSwitch.prototype.registerOnChange = function (fn) {
	        this.onModelChange = fn;
	    };
	    InputSwitch.prototype.registerOnTouched = function (fn) {
	        this.onModelTouched = fn;
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], InputSwitch.prototype, "onLabel", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], InputSwitch.prototype, "offLabel", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], InputSwitch.prototype, "disabled", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], InputSwitch.prototype, "style", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], InputSwitch.prototype, "styleClass", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], InputSwitch.prototype, "onChange", void 0);
	    InputSwitch = __decorate([
	        core_1.Component({
	            selector: 'p-inputSwitch',
	            template: "\n        <div [ngClass]=\"{'ui-inputswitch ui-widget ui-widget-content ui-corner-all': true,\n            'ui-state-disabled': disabled}\" (click)=\"toggle($event, in)\"\n            [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-inputswitch-off\">\n                <span class=\"ui-inputswitch-offlabel\">{{offLabel}}</span>\n            </div>\n            <div class=\"ui-inputswitch-on\">\n                <span class=\"ui-inputswitch-onlabel\">{{onLabel}}</span>\n            </div>\n            <div [ngClass]=\"{'ui-inputswitch-handle ui-state-default':true, 'ui-state-focus':focused}\"></div>\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #in type=\"checkbox\" (focus)=\"onFocus($event)\" (blur)=\"onBlur($event)\" readonly=\"readonly\"/>\n            </div>\n        </div>\n    ",
	            providers: [INPUTSWITCH_VALUE_ACCESSOR, domhandler_1.DomHandler]
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef, domhandler_1.DomHandler])
	    ], InputSwitch);
	    return InputSwitch;
	}());
	exports.InputSwitch = InputSwitch;
	//# sourceMappingURL=inputswitch.js.map

/***/ }

});