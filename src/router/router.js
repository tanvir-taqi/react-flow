import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home/Home";
import Workflowdetails from "../components/WorkflowDetails/Workflowdetails";



export const router = createBrowserRouter([
    {
        path: '/',
        element:<Home></Home>
    },
    {
        path: '/workflow/:id',
        element:<Workflowdetails></Workflowdetails>,
        loader: async ({ params }) => {
            return fetch(`https://64307b10d4518cfb0e50e555.mockapi.io/workflow/${params?.id}`);
          },
    }
])