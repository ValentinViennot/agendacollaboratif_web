import { NotificationService } from "./services/notification.service";
import { UserService } from "./services/user.service";
export declare class AppComponent {
    private _notif;
    private _user;
    constructor(_notif: NotificationService, _user: UserService);
}
