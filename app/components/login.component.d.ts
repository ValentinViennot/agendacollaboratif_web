import { NotificationService } from "../services/notification.service";
import { SyncService } from "../services/sync.service";
import { ParseService } from "../services/parse.service";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
export declare class LoginComponent {
    private _notif;
    private _sync;
    private _parse;
    private router;
    regexp: string;
    fr: any;
    loginForm: FormGroup;
    pending: any;
    constructor(_notif: NotificationService, _sync: SyncService, _parse: ParseService, router: Router);
    ngOnInit(): void;
    login(): void;
    private token(response);
    ready(): boolean;
    clear(): void;
    isActions(): string;
}
