import React, { useCallback, useRef, useState } from 'react';
import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

import { Background, Controls, ReactFlow, addEdge, getConnectedEdges, getIncomers, getOutgoers, useEdgesState, useNodesState } from 'reactflow';
import CustomNode from '../CustomNode/CustomNode';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import ModuleList from '../ModuleList/ModuleList';

const Workflowdetails = () => {
  const workflow = useLoaderData();
  
  const nodeTypes = {
    custom: CustomNode,
  };
  
  const initialNodes = [
    {
      id: '1',
      type: 'custom',
      data: { name: `${workflow?.name}`, input_type:`${workflow?.input_type}` },
      position: { x: 250, y: 5 },
    },
  ];


  const reactFlowWrapper = useRef();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);



  

    /** 
   * @dragged element on react flow canvas
   * 
   */
  const handleOnDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const handleOnDrop = useCallback(
    (event) => {
      event.preventDefault();
      
      if (!reactFlowWrapper.current) {
     
        return;
      }
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

      const type = JSON.parse(event.dataTransfer.getData('application/reactflow'));

      if (typeof type === 'undefined' || !type) {
      
        return;
      }
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: type.id,
        type: 'custom',
        position,
        data: { name: `${type?.name}`, input_type:`${type?.input_type}`,output_type:`${type?.output_type}` },
      };
   

      setNodes((nds) => nds.concat(newNode));

    },
    [reactFlowInstance, setNodes]
  );

  const onNodesDelete = useCallback(
    (deleted) => {
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);

          const remainingEdges = acc.filter((edge) => !connectedEdges.includes(edge));

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({ id: `${source}->${target}`, source, target }))
          );

          return [...remainingEdges, ...createdEdges];
        }, edges)
      );
    },
    [nodes, edges, setEdges]
  );
  return (
    <div>
      <div className=" m-10 border border-blue-700">
        <div className="border border-blue-700 py-3 px-6 flex justify-between items-center">
          <h1 className='text-start text-lg font-bold'>
          Workflow Name:{" "}
          <span className="text-base text-gray-800">{workflow?.name}</span>
          </h1>
          <span class=" text-2xl" onClick={()=>window.history.go(-1)}><FaArrowAltCircleLeft ></FaArrowAltCircleLeft></span>
        </div>
        <div className="w-full grid grid-cols-[3fr,5fr] p-6">
          <ModuleList></ModuleList>
          
          <div ref={reactFlowWrapper} style={{ width: '100%', height: '100%' }}>

          
            <ReactFlow

              // onElementsRemove={(elementsToRemove) =>
              //   setElements((els) => removeElements(elementsToRemove, els))
              // }
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={(params) => setEdges((els) => addEdge(params, els))}
              onNodesDelete={onNodesDelete}
              // snapToGrid={true}
              onInit={setReactFlowInstance}
              // snapGrid={[15, 15]}
              nodeTypes={nodeTypes}
              onDrop={(event) => handleOnDrop(event)}
              onDragOver={(event) => handleOnDragOver(event)}
              fitView
            >
              <Controls />
              {/* <MiniMap zoomable pannable /> */}
              <Background color="#aaa" gap={16} variant='cross' />
            </ReactFlow>
          
          </div>
          
        </div>
      </div>
    </div>
  );
};


export default Workflowdetails;