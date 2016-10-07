import { NotificationService } from "../services/notification.service";
import { Groupe } from "../concepts/groupe";
import { SyncService } from "../services/sync.service";
import { ParseService } from "../services/parse.service";
import { Router } from "@angular/router";
import { User } from "../concepts/user";
export declare class NouveauComponent {
    private _notif;
    private _sync;
    private _parse;
    private router;
    user: User;
    fr: any;
    date: string;
    matiere: string;
    texte: string;
    constructor(_notif: NotificationService, _sync: SyncService, _parse: ParseService, router: Router);
    ngOnInit(): void;
    ngOnDestroy(): void;
    save(): void;
    getCourseValue(course: Groupe): string;
}
