import App from "./App";
import MainPage from "./Components/MainPage/MainPage";
import SignIn from "./Components/AuthPage/SignIn/SignIn";
import SignUp from "./Components/AuthPage/SignUp/SignUp";
import  UploadPage  from "./Components/UploadPage/UploadPage";
import { AuthGuard } from "./Guard/auth-guard";
import { Navigate } from "react-router-dom";
const { createBrowserRouter } = require("react-router-dom");

export const router = createBrowserRouter([
    {
        path: "", // localhost:3000
        element: <App />,
        children: [
            {
                path: "",
                element: <MainPage />
            },
            {
                element: <AuthGuard logRequired={false}/>,
                children: [
                    {
                        path: "/login",
                        element: <SignIn />
                    },
                    {
                        path: "/register",
                        element: <SignUp />
                    }
                ]
            },
            {
                element: <AuthGuard logRequired={true}/>,
                children: [
                    {
                        path: "/upload",
                        element: <UploadPage/>
                    }
                ]
            },
            {
                path: "*",
                element: <Navigate to={"/"} />
            }
        ]
    }
]);