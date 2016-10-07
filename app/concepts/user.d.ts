import { Groupe } from "./groupe";
/**
 * Created by Valentin on 14/07/2016.
 */
export declare class User {
    id: number;
    prenom: string;
    nom: string;
    email: string;
    notifs: number;
    rappels: boolean;
    mail: boolean;
    fake_identity: boolean;
    courses: Groupe[];
    root: number;
}
