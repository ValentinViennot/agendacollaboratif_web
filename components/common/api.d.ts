import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
export interface SortMeta {
    field: string;
    order: number;
}
export interface LazyLoadEvent {
    first?: number;
    rows?: number;
    sortField?: string;
    sortOrder?: number;
    multiSortMeta?: SortMeta[];
    filters?: {
        [s: string]: FilterMetadata;
    };
}
export interface FilterMetadata {
    value?: string;
    matchMode?: string;
}
export interface MenuItem {
    label?: string;
    icon?: string;
    command?: (event?: any) => void;
    url?: string;
    routerLink?: any;
    eventEmitter?: EventEmitter<any>;
    items?: MenuItem[];
    expanded?: boolean;
    disabled?: boolean;
}
export interface Message {
    severity?: string;
    summary?: string;
    detail?: string;
}
export interface SelectItem {
    label: string;
    value: any;
}
export interface TreeNode {
    label?: string;
    data?: any;
    icon?: any;
    expandedIcon?: any;
    collapsedIcon?: any;
    children?: TreeNode[];
    leaf?: boolean;
    expanded?: boolean;
    type?: string;
}
export interface Confirmation {
    message: string;
    icon?: string;
    header?: string;
    accept?: Function;
    reject?: Function;
    acceptEvent?: EventEmitter<any>;
    rejectEvent?: EventEmitter<any>;
}
export declare class ConfirmationService {
    private requireConfirmationSource;
    private acceptConfirmationSource;
    requireConfirmation$: Observable<Confirmation>;
    accept: Observable<Confirmation>;
    confirm(confirmation: Confirmation): this;
    onAccept(): void;
}
