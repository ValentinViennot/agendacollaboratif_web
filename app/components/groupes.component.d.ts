import { NotificationService } from "../services/notification.service";
import { SyncService } from "../services/sync.service";
import { ParseService } from "../services/parse.service";
import { User } from "../concepts/user";
import { Groupe } from "../concepts/groupe";
import { OverlayPanel } from "../../components/overlaypanel/overlaypanel";
export declare class GroupesComponent {
    private _notif;
    private _sync;
    private _parse;
    user: User;
    private path;
    private pathGroups;
    private groups;
    private group;
    private selectedGroup;
    private newGroup;
    constructor(_notif: NotificationService, _sync: SyncService, _parse: ParseService);
    ngOnInit(): void;
    private init();
    /**
     * Récupération des groupes et matières du groupe en cours
     */
    private refresh();
    private push(group);
    private back(prev);
    toParent(): void;
    /**
     *
     * @param index dans pathGroups
     */
    toGroup(index: number): void;
    selectGroup(event: any, group: Groupe, overlaypanel: OverlayPanel): void;
    preCreateGroup(event: any, overlaypanel: OverlayPanel, type: number): void;
    createGroup(event: any, overlaypanel: OverlayPanel): void;
    /**
     * @param group à rejoindre
     */
    join(group: Groupe): void;
    /**
     *
     * @param group à quitter
     */
    quit(group: Groupe): void;
    clickColor(color: string, a: number, b: number): void;
    mouseOverColor(str: string): void;
}
