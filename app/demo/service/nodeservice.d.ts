import { Http } from '@angular/http';
import { TreeNode } from '../../../components/common';
export declare class NodeService {
    private http;
    constructor(http: Http);
    getFiles(): Promise<TreeNode[]>;
    getLazyFiles(): Promise<TreeNode[]>;
    getFilesystem(): Promise<TreeNode[]>;
    getLazyFilesystem(): Promise<TreeNode[]>;
}
