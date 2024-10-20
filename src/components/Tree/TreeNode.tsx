import React, { useState, useMemo } from 'react';
import './Tree.css';
import { useDispatch, useSelector } from 'react-redux';
import { TreeNode as TreeNodeType } from '../../types/tree/TreeNode';
import { TreeNodeProps } from './TreeNode.types';
import { selectNode } from '../../store/tree/treeSlice';
import { RootState } from '../../store';

const TreeNodeComponent: React.FC<TreeNodeProps> = ({
    node,
    highlightedNode,
    onHighlightNode,
    onLeafClick,
    moveNode,
    draggedNodeId,
    setDraggedNodeId
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const dispatch = useDispatch();
    const selectedNode = useSelector((state: RootState) => state.tree.selectedNode);

    const toggleExpand = (e: React.MouseEvent | React.KeyboardEvent) => {
        e.stopPropagation();
        setIsExpanded(prev => !prev);
    };

    const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
        e.stopPropagation();
        if (!node.children || node.children.length === 0) {
            onLeafClick(node.id!);
        }
        dispatch(selectNode(node));
        onHighlightNode(selectedNode?.leafid === node.leafid ? null : node);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        switch (e.key) {
            case 'ArrowRight':
                e.preventDefault();
                setIsExpanded(true);
                break;
            case 'ArrowLeft':
                e.preventDefault();
                setIsExpanded(false);
                break;
            case 'Enter':
            case ' ':
                handleClick(e);
                break;
            default:
                break;
        }
    };

    const handleDragStart = (e: React.DragEvent) => {
        console.log("Starting drag for node:", node.leafid); // debugging
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
            moveNode(draggedNodeId, node.leafid || '');
            setDraggedNodeId(null);
        }
        console.log("Dropped on node:", node.leafid); // debugging 
    };

    const isHighlighted = useMemo(() => {
        if (!highlightedNode || !node.leafid || !highlightedNode.leafid) return false;
        return node.leafid.startsWith(highlightedNode.leafid);
    }, [highlightedNode, node.leafid]);

    return (
        <li
            key={node.leafid}
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
                        aria-label={isExpanded ? 'Collapse' : 'Expand'}
                    >
                        {isExpanded ? '-' : '+'}
                    </button>
                )}
            </div>
            {isExpanded && node.children && (
                <ul role="group">
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
                </ul>
            )}
        </li>
    );
};

export default React.memo(TreeNodeComponent);
