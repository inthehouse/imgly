import React, { useState } from 'react';
import './Tree.css';
import { TreeNode as TreeNodeType } from '../../types/tree/TreeNode';
import { TreeNodeProps } from './TreeNode.types';

const TreeNodeComponent: React.FC<TreeNodeProps> = React.memo(({
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

    const toggleExpand = (e: React.MouseEvent | React.KeyboardEvent) => {
        e.stopPropagation();
        setIsExpanded(prev => !prev);
    };

    const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
        e.stopPropagation();
        if (!node.children || node.children.length === 0) {
            onLeafClick(node.id!);
        }
        onHighlightNode(selectedNode?.leafid === node.leafid ? null : node);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            handleClick(e);
        }
    };

    const handleDragStart = (e: React.DragEvent) => {
        e.stopPropagation();
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
        if (draggedNodeId) {
            moveNode(draggedNodeId, node.leafid || "");
            setDraggedNodeId(null);
        }
    };

    const isPartOfHighlightedSubtree = (highlightedNode: TreeNodeType | null, node: TreeNodeType): boolean => {
        if (!highlightedNode || !node.leafid || !highlightedNode.leafid) return false;
        return node.leafid.startsWith(highlightedNode.leafid);
    };

    const isHighlighted = isPartOfHighlightedSubtree(highlightedNode, node);
    return (
        <li
            role="treeitem"
            aria-expanded={isExpanded}
            aria-selected={isHighlighted}
            draggable
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            <div
                className={`treeNode ${isHighlighted ? 'highlighted' : ''}`}
                onClick={handleClick}
                role="button"
                tabIndex={-1}
                aria-label={node.label}
            >
                <span style={{ cursor: 'pointer', fontWeight: isHighlighted ? 'bold' : 'normal' }}>
                    {node.label}
                </span>
                {node.children && (
                    <button
                        className="toggle-button"
                        onClick={toggleExpand}
                        onKeyDown={handleKeyDown}
                        aria-label={isExpanded ? 'Collapse' : 'Expand'}
                    >
                        {isExpanded ? '-' : '+'}
                    </button>
                )}
            </div>
            {isExpanded && node.children && (
                <ul role="group">
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
});

export default TreeNodeComponent;
