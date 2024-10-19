import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TreeNodeComponent from '../TreeNode';
import { TreeNode } from '../../../types/tree/TreeNode';
import { TreeNodeProps } from '../TreeNode.types';

const mockNode: TreeNode = {
    leafid: '1',
    id: 'node1',
    label: 'Node 1',
    children: [],
};

describe('TreeNodeComponent', () => {
    const setup = (overrides: Partial<TreeNodeProps>) => {
        const props = {
            node: mockNode,
            selectedNode: null,
            highlightedNode: null,
            onHighlightNode: jest.fn(),
            onLeafClick: jest.fn(),
            moveNode: jest.fn(),
            draggedNodeId: null,
            setDraggedNodeId: jest.fn(),
            ...overrides,
        };

        return render(<TreeNodeComponent {...props} />);
    };

    it('renders correctly', () => {
        const { getByText } = setup({});
        expect(getByText(mockNode.label)).toBeInTheDocument();
    });

    it('calls onLeafClick when leaf is clicked', () => {
        const onLeafClickMock = jest.fn();
        const { getByText } = setup({ onLeafClick: onLeafClickMock });

        fireEvent.click(getByText(mockNode.label));
        expect(onLeafClickMock).toHaveBeenCalledWith(mockNode.id);
    });


    it('toggles expand/collapse on button click', () => {
        const { getByLabelText, queryByLabelText } = setup({});
        const expandButton = getByLabelText('Expand');
        fireEvent.click(expandButton);

        expect(getByLabelText('Collapse')).toBeInTheDocument();

        fireEvent.click(getByLabelText('Collapse'));

        expect(queryByLabelText('Expand')).toBeInTheDocument();
    });
});
