import { TreeNode as TreeNodeType } from '../types/tree/TreeNode';

export const updateTreeStructure = (
    nodes: TreeNodeType[],
    draggedNodeId: string,
    targetNodeId: string
): TreeNodeType[] => {
    let draggedNode: TreeNodeType | null = null;

    const removeDraggedNode = (nodeList: TreeNodeType[]): TreeNodeType[] => {
        return nodeList.map((node) => {
            const newNode = { ...node };

            if (newNode.leafid === draggedNodeId) {
                draggedNode = newNode;
                return null;
            }

            if (newNode.children) {
                newNode.children = removeDraggedNode(newNode.children).filter(Boolean);
            }

            return newNode;
        }).filter(Boolean) as TreeNodeType[]; 
    };

    const addDraggedNodeToTarget = (nodeList: TreeNodeType[]): TreeNodeType[] => {
        return nodeList.map((node) => {
            const newNode = { ...node };

            if (newNode.leafid === targetNodeId && draggedNode) {
                newNode.children = [...(newNode.children || []), draggedNode];
            }

            if (newNode.children) {
                newNode.children = addDraggedNodeToTarget(newNode.children);
            }

            return newNode;
        });
    };

    const treeWithoutDraggedNode = removeDraggedNode(nodes);
    return addDraggedNodeToTarget(treeWithoutDraggedNode);
};

export const isPartOfHighlightedSubtree = (
    highlightedNode: TreeNodeType | null,
    node: TreeNodeType
): boolean => {
    if (!highlightedNode || !highlightedNode.leafid || !node.leafid) return false;
    return node.leafid.startsWith(highlightedNode.leafid);
};

export const moveNode = (
    nodes: TreeNodeType[],
    draggedNodeId: string,
    targetNodeId: string
): TreeNodeType[] => {
    return updateTreeStructure(nodes, draggedNodeId, targetNodeId);
};
