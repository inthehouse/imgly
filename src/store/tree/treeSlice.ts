import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TreeNode, TreeState } from '../../types/tree/TreeNode';
import { fetchTreeData as fetchTreeDataAPI, fetchLeafData as fetchLeafDataAPI } from '../../services/api';

const initialState: TreeState = {
    data: [],
    selectedNode: null,
    fetchedData: null,
    fetchError: null,
};

export const fetchTreeData = createAsyncThunk<TreeNode[]>('tree/fetchTreeData', async () => {
    return await fetchTreeDataAPI();
});

export const fetchLeafData = createAsyncThunk<any, string>('tree/fetchLeafData', async (id) => {
    return await fetchLeafDataAPI(id);
});


const treeSlice = createSlice({
    name: 'tree',
    initialState,
    reducers: {
        setTreeData: (state, action: PayloadAction<TreeNode[]>) => {
            state.data = action.payload;
        },
        selectNode: (state, action: PayloadAction<TreeNode>) => {
            state.selectedNode = action.payload;
        },
        updateNode: (state, action: PayloadAction<TreeNode[]>) => {
            state.data = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTreeData.fulfilled, (state, action) => {
                state.data = generateTreeWithIds(action.payload);
            })
            .addCase(fetchLeafData.fulfilled, (state, action) => {
                if (action.payload) {
                    state.fetchedData = action.payload;
                    state.fetchError = null;
                } else {
                    state.fetchError = 'Leaf contains no data';
                    state.fetchedData = null;
                }
            })
            .addCase(fetchLeafData.rejected, (state, action) => {
                state.fetchError = 'An error occurred while fetching data.';
                state.fetchedData = null;
            });
    },
});

const generateTreeWithIds = (nodes: TreeNode[], parentId: string = ''): TreeNode[] => {
    return nodes.map((node, index) => {
        const newLeafId = parentId ? `${parentId}.${index + 1}` : `${index + 1}`;
        const newNode = { ...node, leafid: newLeafId };
        if (node.children && node.children.length > 0) {
            newNode.children = generateTreeWithIds(node.children, newLeafId);
        }
        return newNode;
    });
};

export const { setTreeData, selectNode, updateNode } = treeSlice.actions;

export default treeSlice.reducer;
