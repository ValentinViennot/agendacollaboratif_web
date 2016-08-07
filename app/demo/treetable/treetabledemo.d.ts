import { OnInit } from '@angular/core';
import { TreeNode } from '../../../components/common';
import { NodeService } from '../service/nodeservice';
import { Message } from '../../../components/common';
export declare class TreeTableDemo implements OnInit {
    private nodeService;
    msgs: Message[];
    files: TreeNode[];
    lazyFiles: TreeNode[];
    selectedFile: TreeNode;
    selectedFiles: TreeNode[];
    constructor(nodeService: NodeService);
    ngOnInit(): void;
    nodeSelect(event: any): void;
    nodeUnselect(event: any): void;
    nodeExpand(event: any): void;
}
