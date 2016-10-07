import { PJ } from "./PJ";
/**
 * Created by Valentin on 29/09/2016.
 */
export declare class Commentaire {
    id: number;
    user: number;
    auteur: string;
    date: Date;
    texte: string;
    pjs: PJ[];
}
