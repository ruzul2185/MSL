import {BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider, Navigate} from "react-router-dom";
import React from 'react';
import Home from "../pages/Home";
import Astromon from "../pages/Astromon";
import RootLayout from "../components/RootLayout";

const router = createBrowserRouter([
    {path: '/', element: <RootLayout/>, children:[
            {path:'/', element:<Home/>},
            {path:'/astromon', element:<Astromon/>}
        ]},
    // {path: '/isAuth',
    //     element:<RootLayout/>,
    //     children:[
    //         {path: 'loa',element:<LevelAssessmentPage/>},
    //         {path: 'examtype', element:<SelectExamType/>},
    //         {path: 'exam', element:<ExamPage/>},
    //     ]
    // },
    // {path:'/astromon', element:<Astromon/>},
    // {path: '/school',
    //     element:<SchoolLayout/>,
    //     children:[
    //         {path: 'addStd', element:<AddStudent/>},
    //         {path: 'viewStd', element:<ViewStudent/>},
    //         {path: 'viewStd/viewStdProfile', element:<ViewStudentProfile/>}
    //     ]
    // },
    // { path:'/isAuth/examtype',element:<ExamPage/>},
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
