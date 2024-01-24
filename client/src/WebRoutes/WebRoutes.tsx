import App from "../App";
import GQLFileUploadDemo from "../pages/GQLFileUploadDemo/GQLFileUploadDemo";
import {
    createBrowserRouter
} from "react-router-dom";
import About from "../pages/website/About";
import Contact from "../pages/website/Contact";
import Home from "../pages/website/Home";
import Recipes from "../pages/website/Recipes";
import Privacy from "../pages/website/Privacy";
import Terms from "../pages/website/Terms";
import FAQs from "../pages/website/FAQs";
import Login from "../pages/website/Login";
import Register from "../pages/website/Register";

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
            },
            {
                path: "/terms",
                element: <Terms />
            },
            {
                path: "/privacy",
                element: <Privacy />
            },
            {
                path: "/faqs",
                element: <FAQs />
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "gql-upload",
        element: <GQLFileUploadDemo />
    }
]);

export default WebRoutes;