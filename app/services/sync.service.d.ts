import { Http } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import { Devoir } from "../concepts/devoir";
import { PJ } from "../concepts/PJ";
import { Groupe } from "../concepts/groupe";
import { Router } from "@angular/router";
export declare class SyncService {
    private http;
    private router;
    private urls;
    private headers;
    constructor(http: Http, router: Router);
    private handleError(error);
    login(token: string): void;
    private initUrls();
    logout(every: boolean): void;
    syncUser(): Promise<any>;
    saveUser(user: any): Promise<any>;
    /**
     * Envoi les listes d'attente au serveur
     * Ecrase le localStorage avec les devoirs si la version est plus récente
     * @param type Devoirs ou Archives (minuscules)
     * @return resolve avec 1 si la version a changé, 0 sinon et reject s'il y a eu une erreur
     */
    syncDevoirs(type: string): Promise<any>;
    /**
     * Récupère les devoirs depuis le serveur
     * @param type Devoirs ou Archives
     * @return {Promise<Devoir[]>} Devoirs
     */
    getDevoirs(type: string): Promise<Devoir[]>;
    /**
     * Ecrase le localStorage par les devoirs si la version locale est différente de la version serveur
     * @param type Archives ou Devoirs
     * @return {Promise<any>}
     */
    getDevoirsIf(type: string): Promise<any>;
    /**
     * Envoi toutes les listes d'attentes au serveur pour les traiter
     * @return Resolve si pas de file d'attente ou si réussite, reject sinon
     */
    sendPending(): Promise<any>;
    /**
     * Récupère la version des matières souscrites par l'utilisateur
     * @return {Promise<String>} Concaténation (DELIMITER #) des versions des matières de l'utilisateur
     */
    getVersion(): Promise<string>;
    supprFile(file: PJ): Promise<any>;
    getCourses(): Promise<Groupe[]>;
    setColor(id: number, color: string): Promise<any>;
    joinCourse(id: number): Promise<any>;
    quitCourse(id: number): Promise<any>;
    getGroups(id: number): Promise<Groupe[]>;
    newGroup(group: Groupe): Promise<any>;
    getToken(infos: any): Promise<string>;
}
