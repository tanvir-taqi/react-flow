import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { FaArrowRight } from "react-icons/fa";

const CustomNode = ({ data }) => {
    return (
        <div>
            <div className={`w- border ${data?.input_type ? 'border-blue-500' : 'border-red-500'}  rounded-2xl   grid grid-cols-[1fr,4fr,1fr]`}>
            <h1 className=" p-1 capitalize text-black font-bold text-sm text-center">
                    {data?.output_type ? <span>{data?.output_type}</span>  : <span className=' flex justify-start items-center text-xs w-full h-full border border-gray-500 text-gray-500 rounded-full border-l-transparent font-thin '><FaArrowRight></FaArrowRight></span>}
                </h1>
                <h1 className={`border-x-2 ${data?.input_type ? 'border-blue-500' : 'border-red-500'}  bg-blue-100 p-1 text-start text-sm font-semibold text-gray-600`}>
                    {data?.name}
                </h1>
                <h1 className=" p-1 capitalize text-black font-bold text-sm text-center">
                    {data?.input_type ? <span>{data?.input_type}</span>  : <span className=' flex justify-start items-center text-xs w-full h-full border border-gray-500 text-gray-500 rounded-full border-l-transparent font-thin rotate-180'><FaArrowRight></FaArrowRight></span>}
                </h1>
                
            </div>
            {
                data?.output_type && <Handle type="target" position={Position.Top} className="w-8 bg-transparent" />
            }
            {
                data?.input_type && <Handle type="source" position={Position.Bottom} className="w-8 bg-transparent" />
            }
            
            
        </div>
    );
};

export default memo(CustomNode);