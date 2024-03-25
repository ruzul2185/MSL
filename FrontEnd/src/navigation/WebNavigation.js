import {BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider, Navigate} from "react-router-dom";
import React from 'react';
import Home from "../pages/Home";
import Astromon from "../pages/Astromon";
import RootLayout from "../components/RootLayout";
import IndividualAstromon from "../pages/IndividualAstromon";
import DimensionalDefense from "../pages/DimensionalDefense";
import DimensionalGolem from "../pages/DimensionalGolem";
import Titan from "../pages/Titan";

const router = createBrowserRouter([
    {path: '/', element: <RootLayout/>, children:[
            {path:'/', element:<Home/>},
            {path:'/astromon', element:<Astromon/>},
            {path:'/astromon/:id/:state', element:<IndividualAstromon/>},
            {path:'/dimensional-defense/:state',element:<DimensionalDefense/>},
            {path:'/dimensional-golem/:state',element:<DimensionalGolem/>},
            {path:'/titan/:state',element:<Titan/>}
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
