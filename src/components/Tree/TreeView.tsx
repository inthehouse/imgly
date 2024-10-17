import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { fetchTreeData, fetchLeafData } from '../../store/tree/treeSlice';
import TreeNode from './TreeNode';
import './Tree.css';

const TreeView: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const treeData = useSelector((state: RootState) => state.tree.data);
    const fetchedData = useSelector((state: RootState) => state.tree.fetchedData);
    const fetchError = useSelector((state: RootState) => state.tree.fetchError);

    const [highlightedNode, setHighlightedNode] = React.useState<any>(null);
    const [selectedNode, setSelectedNode] = React.useState<any>(null);
    const [draggedNodeId, setDraggedNodeId] = React.useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchTreeData());
    }, [dispatch]);

    const handleHighlightNode = (node: any) => {
        setHighlightedNode(node);
        setSelectedNode(node);
    };

    const handleLeafClick = (id: string) => {
        dispatch(fetchLeafData(id));
    };

    const moveNode = (draggedNodeId: string, targetNodeId: string) => {
        const updateTree = (nodes: any[]): any[] => {
            let draggedNode: any = null;

            const removeDraggedNode = (nodeList: any[]): any[] => {
                return nodeList.map((node: any) => {
                    const newNode = { ...node };

                    if (newNode.leafid === draggedNodeId) {
                        draggedNode = newNode;
                        return null;
                    }

                    if (newNode.children) {
                        newNode.children = removeDraggedNode(newNode.children).filter(Boolean);
                    }

                    return newNode;
                }).filter(Boolean);
            };

            const addDraggedNodeToTarget = (nodeList: any[]): any[] => {
                return nodeList.map((node: any) => {
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

            const updatedTree = addDraggedNodeToTarget(treeWithoutDraggedNode);

            return updatedTree;
        };

        const updatedTree = updateTree(treeData);
        console.log('Updated Tree Structure:', updatedTree);  // debugging let it be for a while
        return updatedTree;
    };


    return (
        <div className="treeView">
            <h1>Tree Structure</h1>
            <ul>
                {treeData.map((node: any) => (
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
                <div className="details">
                    {fetchError && <p className="error">{fetchError}</p>}
                    {fetchedData && <pre>{JSON.stringify(fetchedData, null, 2)}</pre>}
                </div>
            )}
        </div>
    );
};


export default TreeView;
