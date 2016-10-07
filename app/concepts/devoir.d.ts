import { Commentaire } from "./commentaire";
import { PJ } from "./PJ";
export declare class Devoir {
    id: number;
    user: number;
    date: Date;
    auteur: string;
    matiere: string;
    matiere_c: string;
    texte: string;
    nb_fait: number;
    fait: boolean;
    flag: number;
    pjs: PJ[];
    commentaires: Commentaire[];
}
