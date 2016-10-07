import { NotificationService } from "../services/notification.service";
import { SyncService } from "../services/sync.service";
import { ParseService } from "../services/parse.service";
import { User } from "../concepts/user";
import { FormGroup } from "@angular/forms";
export declare class UserComponent {
    private _notif;
    private _sync;
    private _parse;
    user: User;
    fr: any;
    changed: boolean;
    userForm: FormGroup;
    hours: number[];
    constructor(_notif: NotificationService, _sync: SyncService, _parse: ParseService);
    ngOnInit(): void;
    private init(sync);
    save(): void;
}
