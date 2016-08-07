import { Http } from '@angular/http';
import { Groupe } from "../concepts/groupe";
import { UserService } from "./user.service";
export declare class SyncService {
    private http;
    private _user;
    constructor(http: Http, _user: UserService);
    /**
     * Envoi les requêtes vers le serveur et récupère les nouvelles données
     * @return Promise<string> Resolve si la synchro a été effective, Reject sinon
     */
    do(): Promise<string>;
    /**
     * Envoi des requêtes locales (DO, ADD, DEL) vers le serveur
     * En cas de succès les requêtes sont effacées du stockage navigateur
     * En cas d'échec elles y restent jusqu'à la prochaine synchro réussie
     * @return Resolve si pas d'action nécessaire ou si requêtes bien envoyées, Reject pour tout autre cas
     */
    sendPending(): Promise<string>;
    /**
     * Réupère les devoirs et tâches depuis le serveur seulement si la version locale est différente de celle du serveur
     * @return {Promise<string>} Resolve si des devoirs ont été récupérés correctement, Reject sinon
     */
    getDevoirs(): Promise<string>;
    /**
     * Gestion des erreurs HTTP
     * @param error
     * @returns {Promise<void>|Promise<T>}
     */
    private handleError(error);
    getArchives(): void;
    getGroups(index: number): Groupe[];
    getGroup(index: number): Groupe;
}
