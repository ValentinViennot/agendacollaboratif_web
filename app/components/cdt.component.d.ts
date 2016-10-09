import { ActivatedRoute } from "@angular/router";
import { SyncService } from "../services/sync.service";
import { NotificationService } from "../services/notification.service";
import { ParseService } from "../services/parse.service";
import { User } from "../concepts/user";
import { Devoir } from "../concepts/devoir";
import { Section } from "../concepts/section";
import { FormGroup } from "@angular/forms";
import { SelectItem } from "../../components/common/api";
import { DateService } from "../services/date.service";
import { Commentaire } from "../concepts/commentaire";
import { OverlayPanel } from "../../components/overlaypanel/overlaypanel";
import { PJ } from "../concepts/PJ";
import { Invitation } from "../concepts/invitation";
export declare class CdtComponent {
    private _sync;
    private _notif;
    private route;
    private _date;
    private _parse;
    token: string;
    online: boolean;
    interval: any;
    type: string;
    user: User;
    devoirs: Devoir[];
    sections: Section[];
    merge: Devoir[];
    input: string[];
    selectedDevoir: Devoir;
    selectedComm: Devoir;
    fileComm: Commentaire;
    flags: string[];
    flags_count: number[];
    searchForm: FormGroup;
    filtre: string;
    filtre_texte: string;
    filtres: SelectItem[];
    selectedFiltres: string[];
    invitations: Invitation[];
    constructor(_sync: SyncService, _notif: NotificationService, route: ActivatedRoute, _date: DateService, _parse: ParseService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private init();
    /**
     * Synchronisation des données
     */
    private sync();
    private refresh();
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
    filtr(filtr: string): void;
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
    private unselectComm();
    private selectComm(devoir);
    selectDevoir(event: any, devoir: Devoir, overlaypanel: OverlayPanel): void;
    getFlags(): number[];
    setFlag(flag: number, overlaypanel: OverlayPanel): void;
    private pend(list, push);
    onUpload(event: any): void;
    fileDevoir(event: any, devoir: Devoir, overlaypanel: OverlayPanel): void;
    tofileComm(event: any, devoir: Devoir, comm: Commentaire, overlaypanel: OverlayPanel): void;
    supprFile(file: PJ): void;
    acceptInvitation(invit: Invitation): void;
    declineInvitation(invit: Invitation): void;
    private getInvitations();
}
