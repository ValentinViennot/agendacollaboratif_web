/**
 * Created by Valentin on 14/07/2016.
 */
import { Commentaire } from './commentaire';
export declare class Devoir {
    id: number;
    user: number;
    date: Date;
    auteur: string;
    matiere: string;
    matiere_c: string;
    texte: string;
    commentaires: Commentaire[];
    nb_fait: number;
    fait: boolean;
    flag: number;
}
