import {BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider, Navigate} from "react-router-dom";
import React from 'react';
import Home from "../pages/Home";
import Astromon from "../pages/Astromon";
import RootLayout from "../components/RootLayout";
import IndividualAstromon from "../pages/IndividualAstromon";

const router = createBrowserRouter([
    {path: '/', element: <RootLayout/>, children:[
            {path:'/', element:<Home/>},
            {path:'/astromon', element:<Astromon/>},
            {path:'/astromon/:id', element:<IndividualAstromon/>}
        ]},
    // Add a catch-all route for 404 Not Found
    { path: '*', element: <Navigate to="/" /> }
]);

function WebNavigation() {

    return (
        <React.Fragment>
            <RouterProvider router={router}>
            </RouterProvider>
        </React.Fragment>
    );
}

export default WebNavigation;
