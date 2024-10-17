import React, { useState } from 'react';
import './Tree.css';
import { TreeNode as TreeNodeType } from '../../types/tree/TreeNode';

interface TreeNodeProps {
    node: TreeNodeType;
    selectedNode: any;
    highlightedNode: any;
    onHighlightNode: (node: any) => void;
    onLeafClick: (id: string) => void;
    moveNode: (draggedNodeId: string, targetNodeId: string) => void;
    draggedNodeId: string | null;
    setDraggedNodeId: React.Dispatch<React.SetStateAction<string | null>>;
}

const TreeNodeComponent: React.FC<TreeNodeProps> = ({
    node,
    selectedNode,
    highlightedNode,
    onHighlightNode,
    onLeafClick,
    moveNode,
    draggedNodeId,
    setDraggedNodeId
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!node.children || node.children.length === 0) {
            onLeafClick(node.id!);
        }
        onHighlightNode(selectedNode && selectedNode.leafid === node.leafid ? null : node);
    };

    const handleDragStart = (e: React.DragEvent) => {
        console.log("Starting drag for node:", node.leafid); // debugging let it be for a while
        setDraggedNodeId(node.leafid!);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();

        console.log("Dropped on node:", node.leafid); // debugging let it be for a while
        if (draggedNodeId) {
            moveNode(draggedNodeId, node.leafid || "");
            setDraggedNodeId(null);
        }
    };


    return (
        <li onDragOver={handleDragOver} onDrop={handleDrop}>
            <div
                draggable
                onDragStart={handleDragStart}
                className={`treeNode ${highlightedNode === node ? 'highlighted' : ''}`}
                onClick={handleClick}
            >
                <span style={{ cursor: 'pointer', fontWeight: highlightedNode === node ? 'bold' : 'normal' }}>
                    {node.label}
                </span>
                {node.children && (
                    <button
                        className="toggle-button"
                        onClick={toggleExpand}
                        aria-label={isExpanded ? 'Collapse' : 'Expand'}
                    >
                        {isExpanded ? '-' : '+'}
                    </button>
                )}
            </div>
            {isExpanded && node.children && (
                <ul>
                    {node.children.map((child: TreeNodeType) => (
                        <TreeNodeComponent
                            key={child.leafid}
                            node={child}
                            selectedNode={selectedNode}
                            highlightedNode={highlightedNode}
                            onHighlightNode={onHighlightNode}
                            onLeafClick={onLeafClick}
                            moveNode={moveNode}
                            draggedNodeId={draggedNodeId}
                            setDraggedNodeId={setDraggedNodeId}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};



export default TreeNodeComponent;
