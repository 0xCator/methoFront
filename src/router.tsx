import App from "./App";
import MainPage from "./Components/MainPage/MainPage";
import SignIn from "./Components/AuthPage/SignIn/SignIn";
import SignUp from "./Components/AuthPage/SignUp/SignUp";
import path from "path";
import  UploadPage  from "./Components/UploadPage/UploadPage";
import { Modal } from "react-bootstrap";
const { createBrowserRouter } = require("react-router-dom");

export const router = createBrowserRouter([
    {
        path: "", // localhost:3000
        element: <App />,
        children: [
            {
                path: "/",
                element: <MainPage />
            },
            {
                path: "/login",
                element: <SignIn />
            },
            {
                path: "/register",
                element: <SignUp />
            },
            {
                path: "/upload",
                element: <UploadPage/>
            }
        ]
    }
]);