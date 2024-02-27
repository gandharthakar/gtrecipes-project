import App from "../App";
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
import UserProfile from "../pages/website/user-area/UserProfile";
import UserProfileCat from "../pages/website/user-area/UserProfileCat";
import CreateRecipe from "../pages/website/user-area/CreateRecipe";
import GeneralSettings from "../pages/website/user-area/settings/GeneralSettings";
import ProfilePictureSettings from "../pages/website/user-area/settings/ProfilePictureSettings";
import PasswordSettings from "../pages/website/user-area/settings/PasswordSettings";
import DeleteAccountSettings from "../pages/website/user-area/settings/DeleteAccountSettings";
import ViewSingleRecipe from "../pages/website/ViewSingleRecipe";
import PageNotFound from "../pages/website/PageNotFound";
import EditRecipe from "../pages/website/user-area/EditRecipe";

const WebRoutes = createBrowserRouter([
    {
        path: "*",
        element: <PageNotFound />
    },
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
            },
            {
                path: "/user-area/profile/:id",
                element: <UserProfile />
            },
            {
                path: "/user-area/categories/:id",
                element: <UserProfileCat />
            },
            {
                path: "/create-recipe/:id",
                element: <CreateRecipe />
            },
            {
                path: "/edit-recipe/:uid/:rid",
                element: <EditRecipe />
            },
            {
                path: "/user-area/settings/:id",
                element: <GeneralSettings />
            },
            {
                path: "/user-area/settings/change-password/:id",
                element: <PasswordSettings />
            },
            {
                path: "/user-area/settings/change-profile-picture/:id",
                element: <ProfilePictureSettings />
            },
            {
                path: "/user-area/settings/delete-account/:id",
                element: <DeleteAccountSettings />
            },
            {
                path: "/view-recipe/:id",
                element: <ViewSingleRecipe />
            },
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }
// ], { basename: '/' });
]);

export default WebRoutes;