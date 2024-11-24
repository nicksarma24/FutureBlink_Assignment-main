import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    Background,
    Controls,
    addEdge,
    useNodesState,
    useEdgesState,
    Connection,
    Edge,
    Node,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Box, Button, Stack } from '@mui/material';
import axios from 'axios';

type NodeType = 'coldEmail' | 'waitDelay' | 'leadSource';

interface CustomNode extends Node {
    type: NodeType;
    data: {
        label: string;
        email?: string;
        subject?: string;
        delay?: number;
    };
}

const initialNodes: CustomNode[] = [
    { id: '1', type: 'leadSource', position: { x: 250, y: 100 }, data: { label: 'Lead Source' } }
];

const NodeEditor = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [nodeId, setNodeId] = useState(2);

    const addNode = (type: NodeType) => {
        const newNode: CustomNode = {
            id: `${nodeId}`,
            type,
            data: { label: type === 'coldEmail' ? 'Cold Email' : type === 'waitDelay' ? 'Wait/Delay' : 'Lead Source' },
            position: { x: 100 + Math.random() * 300, y: 100 + Math.random() * 300 },
        };
        setNodes((nds) => [...nds, newNode]);
        setNodeId((id) => id + 1);
    };

    const onConnect = (connection: Connection) => setEdges((eds) => addEdge(connection, eds));

    const saveFlow = async () => {
        try {
            await axios.post('/api/flow/save', { nodes, edges });
            alert('Flow saved successfully');
        } catch (error) {
            console.error('Error saving flow:', error);
        }
    };

    return (
        <ReactFlowProvider>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 2 }}>
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" onClick={() => addNode('coldEmail')}>Add Cold Email</Button>
                    <Button variant="contained" onClick={() => addNode('waitDelay')}>Add Wait/Delay</Button>
                </Stack>
                <Box sx={{ height: '600px', width: '100%', border: '1px solid #ccc', mt: 2 }}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        fitView
                    >
                        <Background />
                        <Controls />
                    </ReactFlow>
                </Box>
                <Button variant="contained" onClick={saveFlow}>Save Flow</Button>
            </Box>
        </ReactFlowProvider>
    );
};

export default NodeEditor;
