import React from 'react';
import TreeNode from './TreeNode';
import useTree from '../../hooks/useTree';
import './Tree.css';

const TreeView: React.FC = () => {
    const {
        treeData,
        highlightedNode,
        selectedNode,
        draggedNodeId,
        setDraggedNodeId,
        handleHighlightNode,
        handleLeafClick,
        moveNode,
        fetchedData,
        fetchError,
    } = useTree();

    return (
        <div className="treeView">
            <h1>Tree Structure</h1>
            <ul role="tree" aria-label="Tree Structure">
                {treeData.map((node) => (
                    <TreeNode
                        key={node.leafid}
                        node={node}
                        selectedNode={selectedNode}
                        highlightedNode={highlightedNode}
                        onHighlightNode={handleHighlightNode}
                        onLeafClick={handleLeafClick}
                        moveNode={moveNode}
                        draggedNodeId={draggedNodeId}
                        setDraggedNodeId={setDraggedNodeId}
                    />
                ))}
            </ul>
            {selectedNode && (
                <div className="details" aria-live="polite">
                    {fetchError && <p className="error">{fetchError}</p>}
                    {fetchedData && <pre>{JSON.stringify(fetchedData, null, 2)}</pre>}
                </div>
            )}
        </div>
    );
};

export default TreeView;
