import treeReducer from './treeSlice';
import { TreeState } from '../../types/tree/TreeNode';

describe('treeSlice', () => {
    const initialState: TreeState = {
        data: [],
        selectedNode: null,
        fetchedData: null,
        fetchError: null,
    };

    it('should return the initial state', () => {
        const state = treeReducer(undefined, { type: '' });
        expect(state).toEqual(initialState);
    });

});
