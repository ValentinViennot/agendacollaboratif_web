import { FormGroup } from '@angular/forms';
import { SelectItem } from '../../../components/common';
import { Message } from '../../../components/common';
export declare class ValidationDemo {
    msgs: Message[];
    userform: FormGroup;
    submitted: boolean;
    genders: SelectItem[];
    description: string;
    ngOnInit(): void;
    onSubmit(value: string): void;
    diagnostic: string;
}
