import axios from 'axios';
import { TreeNode } from '../types/tree/TreeNode';

const API_BASE_URL = 'https://ubique.img.ly/frontend-tha';

export const fetchTreeData = async (): Promise<TreeNode[]> => {
    const response = await axios.get(`${API_BASE_URL}/data.json`);
    return response.data;
};

export const fetchLeafData = async (id: string): Promise<any> => {
    const response = await axios.get(`${API_BASE_URL}/entries/${id}.json`);
    return response.data;
};
