import { TreeNode } from '../../types/tree/TreeNode';

export interface TreeNodeProps {
    node: TreeNode;
    selectedNode: TreeNode | null;
    highlightedNode: TreeNode | null;
    onHighlightNode: (node: TreeNode | null) => void;
    onLeafClick: (id: string) => void;
    moveNode: (draggedNodeId: string, targetNodeId: string) => void;
    draggedNodeId: string | null;
    setDraggedNodeId: React.Dispatch<React.SetStateAction<string | null>>;
}