import { OnInit } from '@angular/core';
import { TreeNode } from '../../../components/common';
import { NodeService } from '../service/nodeservice';
import { Message, MenuItem } from '../../../components/common';
export declare class TreeDemo implements OnInit {
    private nodeService;
    msgs: Message[];
    files: TreeNode[];
    lazyFiles: TreeNode[];
    selectedFile: TreeNode;
    selectedFile2: TreeNode;
    selectedFiles: TreeNode[];
    items: MenuItem[];
    constructor(nodeService: NodeService);
    ngOnInit(): void;
    nodeSelect(event: any): void;
    nodeUnselect(event: any): void;
    nodeExpand(event: any): void;
    viewFile(file: TreeNode): void;
    unselectFile(): void;
}
