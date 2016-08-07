/**
 * Created by Valentin on 29/07/2016.
 */
import { OnInit } from '@angular/core';
import { Groupe } from "../concepts/groupe";
import { SyncService } from "../services/synchronize.service";
import { OverlayPanel } from "../../components/overlaypanel/overlaypanel";
export declare class GroupComponent implements OnInit {
    private _sync;
    private path;
    private groups;
    private group;
    private COULEURS;
    private tab;
    private selectedGroup;
    constructor(_sync: SyncService);
    ngOnInit(): void;
    private refresh();
    private push(group);
    changeGroup(group: Groupe): void;
    toParent(): void;
    selectGroup(event: any, group: Groupe, overlaypanel: OverlayPanel): void;
    /**
     *
     * @param index ID du groupe ou de la matière à rejoindre
     */
    join(group: Groupe): void;
    /**
     *
     * @param index ID du groupe ou de la matière à quitter
     */
    quit(group: Groupe): void;
}
