import React, { useCallback, useState } from 'react';
import ReactFlow, { Background, Controls, MiniMap, addEdge, applyEdgeChanges, applyNodeChanges, useEdgesState, useNodesState } from 'reactflow';

import 'reactflow/dist/style.css';



const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
    { id: '3', position: { x: 200, y: 200 }, data: { label: '3' } },
    { id: '4', position: { x: 0, y: 200 }, data: { label: '4' } },
];
const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e1-3', source: '2', target: '3' },
    { id: 'e1-4', source: '2', target: '4', animated: true },
];


const WorkflowCanvas = () => {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const defaultEdgeOptions = { animated: true };
  
      const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  
      const onNodesChange = useCallback(
          (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
          [setNodes]
        );
        const onEdgesChange = useCallback(
          (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
          [setEdges]
        );
  
    return (
        <div style={{ width: '100%', height: '100%' }}>
              <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    defaultEdgeOptions={defaultEdgeOptions}
                >
                    
                    <MiniMap zoomable pannable />
                    <Background color="#ddd" variant='cross' />
                </ReactFlow>
        </div>
    );
};

export default WorkflowCanvas;