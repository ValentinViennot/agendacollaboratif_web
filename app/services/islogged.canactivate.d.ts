import { CanActivate, Router } from '@angular/router';
import { SyncService } from "./sync.service";
export declare class CanActivateIsLogged implements CanActivate {
    private router;
    private _sync;
    constructor(router: Router, _sync: SyncService);
    canActivate(): boolean;
}
