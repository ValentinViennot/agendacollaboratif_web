import { Message } from "../../components/common";
export declare class NotificationService {
    msgs: Message[];
    constructor();
    add(level: number, titre: string, message: string): void;
    ask(titre: string, message: string, confirmer: string, annuler: string): Promise<String>;
}
