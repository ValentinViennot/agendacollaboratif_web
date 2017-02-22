import {Message, ConfirmationService} from "../../components/common/api";
export declare class NotificationService {
    private confirmationService;
    constructor(confirmationService: ConfirmationService);
    msgs: Message[];
    private wait;
    add(level: number, titre: string, message: string): void;
    ask(titre: string, message: string, confirmer: string, annuler: string): JQueryPromise<void>;
}
