import { CanActivate, Router } from '@angular/router';
export declare class CanActivateIsLogged implements CanActivate {
    private router;
    constructor(router: Router);
    canActivate(): boolean;
}
