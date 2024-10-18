import React from 'react';
import { act } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import treeReducer from '../../../store/tree/treeSlice';
import TreeView from '../TreeView';
import { TreeState } from '../../../types/tree/TreeNode';

const mockTreeData = [
    { id: '1', label: 'Node 1', children: [] },
    { id: '2', label: 'Node 2', children: [] },
];

const mockFetchResponse = {
    ok: true,
    status: 200,
    statusText: 'OK',
    json: jest.fn().mockResolvedValue(mockTreeData),
    headers: {
        get: jest.fn(),
    },
    redirected: false,
    type: 'basic',
    url: 'http://example.com',
    clone: jest.fn().mockReturnValue(this),
} as unknown as Response;

global.fetch = jest.fn().mockResolvedValue(mockFetchResponse);

const defaultInitialState: TreeState = {
    data: mockTreeData,
    selectedNode: null,
    fetchedData: null,
    fetchError: null,
};

const setupStore = (initialState: Partial<TreeState> = {}) => {
    return configureStore({
        reducer: { tree: treeReducer },
        preloadedState: { tree: { ...defaultInitialState, ...initialState } },
    });
};

describe('TreeView Component', () => {
    let store: ReturnType<typeof setupStore>;

    beforeEach(() => {
        store = setupStore();
    });

    test('renders tree nodes correctly', async () => {
        await act(async () => {
            render(
                <Provider store={store}>
                    <TreeView />
                </Provider>
            );
        });

        await waitFor(() => {
            expect(screen.getByText('Node 1')).toBeInTheDocument();
            expect(screen.getByText('Node 2')).toBeInTheDocument();
        });
    });
});
