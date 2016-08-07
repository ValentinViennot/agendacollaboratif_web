import { User } from "../concepts/user";
export declare class UserService {
    private user;
    constructor();
    getUser(): User;
    /**
     * Renvoit le token de sécurité qui identifie l'utilisateur sur cet appareil
     * @return {string}
     */
    getToken(): string;
}
