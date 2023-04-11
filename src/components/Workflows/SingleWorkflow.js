import React from 'react';
import { Link } from 'react-router-dom';

const SingleWorkflow = ({workflow,index}) => {
    return (
        <Link to={`/workflow/${workflow?.id}`}  className='grid grid-cols-3 items-start cursor-pointer'>
            <h1 className={`${index % 2 === 0 ? "bg-blue-200":"bg-blue-300"} text-start p-2  m-[1px] font-semibold text-lg underline`}>{workflow?.name}</h1>
            <h1 className={`${index % 2 === 0 ? "bg-blue-200":"bg-blue-300"} text-start p-2  m-[1px] font-semibold text-lg`}>{workflow?.input_type}</h1>
            <h1 className={`${index % 2 === 0 ? "bg-blue-200":"bg-blue-300"} text-start p-2  m-[1px] font-semibold text-lg`}>{workflow?.createdAt?.substring(0, 10)}</h1>
            
        </Link>
    );
};

export default SingleWorkflow;