import App from "../App";
import GQLFileUploadDemo from "../pages/GQLFileUploadDemo/GQLFileUploadDemo";
import {
    createBrowserRouter
} from "react-router-dom";
import About from "../pages/website/About";
import Contact from "../pages/website/Contact";
import Home from "../pages/website/Home";
import Recipes from "../pages/website/Recipes";

const WebRoutes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: "/recipes",
                element: <Recipes />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/contact",
                element: <Contact />
            }
        ]
    },
    {
        path: "gql-upload",
        element: <GQLFileUploadDemo />
    }
]);

export default WebRoutes;