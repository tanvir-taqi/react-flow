import React, { useState } from 'react';
import { useEffect } from 'react';
import SingleWorkflow from './SingleWorkflow';

const Workflows = () => {
    const [workFlows, setworkFlows] = useState([])

    useEffect(() => {
        fetch('https://64307b10d4518cfb0e50e555.mockapi.io/workflow')
            .then(response => response.json())
            .then(data => {
                setworkFlows(data)
            })
            .catch(err => console.error(err))
    }, [])

    return (
        <div className=' m-10 border border-blue-700'>
            <h1 className='border border-blue-700 py-3 px-6 text-start text-xl font-bold'>Workflow</h1>
            <div className='w-full flex justify-center p-6'>
                <div className='w-2/3 border border-blue-700 '>
                    <div className='grid grid-cols-3  items-start'>
                        <h1 className='bg-blue-500 text-start p-2  m-[1px] text-white font-semibold text-lg'>Name</h1>
                        <h1 className='bg-blue-500 text-start p-2  m-[1px] text-white font-semibold text-lg'>Input Type</h1>
                        <h1 className='bg-blue-500 text-start p-2  m-[1px] text-white font-semibold text-lg'>Created At</h1>
                    </div>
                    <div>
                        {
                            workFlows?.map((workflow, i) => <SingleWorkflow
                                key={workflow?.createdAt}
                                workflow={workflow}
                                index={i}

                            ></SingleWorkflow>)
                        }
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Workflows;