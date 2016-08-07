import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { User } from "../concepts/user";
import { Section } from "./section";
import { Devoir } from "../concepts/devoir";
import { Commentaire } from "../concepts/commentaire";
import { SyncService } from "../services/synchronize.service";
import { DateService } from "../services/date.service";
import { ParseService } from "../services/parse.service";
import { NotificationService } from "../services/notification.service";
import { UserService } from "../services/user.service";
import { OverlayPanel } from "../../components/overlaypanel/overlaypanel";
import { SelectItem } from "../../components/common";
export declare class CdtComponent implements OnInit, OnDestroy {
    private _sync;
    private _date;
    private _parse;
    private _notif;
    private _route;
    private _user;
    type: string;
    user: User;
    devoirs: Devoir[];
    sections: Section[];
    selectedDevoir: Devoir;
    flags: string[];
    flags_count: number[];
    merge: Devoir[];
    input: string[];
    selectedComm: Devoir;
    searchForm: FormGroup;
    sub: any;
    filtre: string;
    filtre_texte: string;
    filtres: SelectItem[];
    selectedFiltres: string[];
    constructor(_sync: SyncService, _date: DateService, _parse: ParseService, _notif: NotificationService, _route: ActivatedRoute, _user: UserService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private refresh();
    /**
     * Synchronise les devoirs, si lea SYNC est effective : on remplace les devoirs du template par les nouveaux
     */
    private sync();
    /**
     * Récupère les devoirs du local Storage
     */
    getDevoirs(): Devoir[];
    /**
     * Recalcule les sections à partir du tableau de devoirs du component
     * ATTENTION : On suppose que les devoirs sont déjà triés par date et classés par matière
     * @return {Section[]}
     */
    private recalcSections();
    /**
     * Applique un filtre aux devoirs s'il y a eu lieu
     * Remarque :
     * @return Devoir[]
     */
    private filtrage(devoirs);
    filtr(filtre: string): void;
    clear_filtr(): void;
    done(devoir: Devoir): void;
    /**
     * Ajoute un devoir à la liste de "merge"
     * @param devoir
     */
    addToMerge(devoir: Devoir): void;
    clearMerge(): void;
    doMerge(): void;
    /**
     * Signale le devoir comme indésirable
     * @param devoir
     */
    signaler(devoir: Devoir): void;
    /**
     * Suppression d'un devoir
     * @param devoir à supprimer
     */
    supprimer(devoir: Devoir): void;
    /**
     * Supprime le commentaire
     * @param devoir devoir auquel appartient ce commentaire
     * @param commentaire à supprimer
     */
    supprimer_comm(devoir: Devoir, commentaire: Commentaire): void;
    sendComment(devoir: Devoir, input: string, index: number): void;
    selectDevoir(event: any, devoir: Devoir, overlaypanel: OverlayPanel): void;
    getFlags(): number[];
    setFlag(flag: number, overlaypanel: OverlayPanel): void;
    private pend(list, push);
}
