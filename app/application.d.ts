import { NotificationService } from "./services/notification.service";
import { SyncService } from "./services/sync.service";
export declare class AppComponent {
    private _notif;
    private _sync;
    constructor(_notif: NotificationService, _sync: SyncService);
    getToken(): string;
}
export declare class AppModule {
}
