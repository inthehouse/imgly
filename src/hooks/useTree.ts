import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchTreeData, fetchLeafData, updateNode } from '../store/tree/treeSlice';
import { moveNode as moveNodeHelper } from '../utils/treeHelpers';
import { TreeNode } from '../types/tree/TreeNode';

const useTree = () => {
    const dispatch = useDispatch<AppDispatch>();
    const treeData = useSelector((state: RootState) => state.tree.data);
    const fetchedData = useSelector((state: RootState) => state.tree.fetchedData);
    const fetchError = useSelector((state: RootState) => state.tree.fetchError);

    const [highlightedNode, setHighlightedNode] = useState<TreeNode | null>(null);
    const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
    const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchTreeData()).catch(error => {
            console.error("Error fetching tree data:", error);
        });
    }, [dispatch]);

    const handleHighlightNode = (node: TreeNode | null) => {
        if (highlightedNode && highlightedNode.leafid === node?.leafid) {
            setHighlightedNode(null)
        }
        else {
            setHighlightedNode(node)
            setSelectedNode(node);
        }
        // setHighlightedNode(node);
        // setSelectedNode(node);
    };

    const handleLeafClick = (id: string) => {
        dispatch(fetchLeafData(id)).catch(error => {
            console.error("Error fetching leaf data:", error);
        });
    };

    const moveNode = (draggedNodeId: string, targetNodeId: string) => {
        const updatedTree = moveNodeHelper(treeData, draggedNodeId, targetNodeId);
        console.log('Updated Tree Structure:', updatedTree); // debugging
        dispatch(updateNode(updatedTree));
    };

    return {
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
    };
};

export default useTree;
