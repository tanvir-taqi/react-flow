import React, { useCallback, useState } from 'react';
import Workflows from '../Workflows/Workflows';
import WorkflowCanvas from '../WorkflowCanvas/WorkflowCanvas';



const Home = () => {



    return (
        <div>
            <div >
                <Workflows></Workflows>
                {/* <WorkflowCanvas></WorkflowCanvas> */}
            </div>
        </div>
    );
};

export default Home;