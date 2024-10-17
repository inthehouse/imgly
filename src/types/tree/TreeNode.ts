export interface TreeNode {
    id?: string;
    label: string;
    leafid?: string; // adding this on our own right
    children?: TreeNode[];
}

export interface TreeState {
    data: TreeNode[];
    selectedNode: TreeNode | null;
    fetchedData: any | null;
    fetchError: string | null;
}
