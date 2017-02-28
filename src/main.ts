import "rxjs/add/operator/map";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import {platformBrowser} from "@angular/platform-browser";
import {AppModuleNgFactory} from "../aot/src/app/app.module.ngfactory";
import {enableProdMode} from "@angular/core";


console.log('Running AOT compiled (go to /index-jit.html for JIT compiled)');
enableProdMode();
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
