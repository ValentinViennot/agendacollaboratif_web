import { OnInit } from '@angular/core';
import { Control } from "@angular/common";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { UserService } from "../services/user.service";
import { User } from "../concepts/user";
export declare class UserComponent implements OnInit {
    private _user;
    user: User;
    mdp1: string;
    mdp2: string;
    changed: boolean;
    form: Control;
    constructor(_user: UserService);
    ngOnInit(): void;
    save(): void;
}
