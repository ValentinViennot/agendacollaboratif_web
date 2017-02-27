import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import "rxjs/add/operator/map";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import {AppModule} from "./app/app.module";

platformBrowserDynamic().bootstrapModule(AppModule);
