"use strict";
require("rxjs/add/operator/map");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
var platform_browser_1 = require("@angular/platform-browser");
var app_module_ngfactory_1 = require("../aot/src/app/app.module.ngfactory");
var core_1 = require("@angular/core");
console.log('Running AOT compiled (go to /index-jit.html for JIT compiled)');
core_1.enableProdMode();
platform_browser_1.platformBrowser().bootstrapModuleFactory(app_module_ngfactory_1.AppModuleNgFactory);
//# sourceMappingURL=main.js.map