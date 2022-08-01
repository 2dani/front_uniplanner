import React from 'react';
import { useRoutes } from "react-router-dom";
import { Profile, Login, Main, Testdday, Submit, Timetable, Vacation, AddHomework, Testddayadd, Meeting, Groupwork, AddGr, Signup, } from "./screens";

//import Groupwork from './screens/Groupwork';

const Router = () => {

    let element = useRoutes([
        { path: "/", element: <Main /> },
        { path: "/submit", element: <Submit /> },
        { path: "/time", element: <Timetable /> },
        { path: "/vacations", element: <Vacation /> },
        { path: "/dday", element: <Testdday /> },
        { path: "/addhw", element: <AddHomework /> },
        { path: "/addhw/:id", element: <AddHomework /> },
        { path: "/adddday", element: <Testddayadd /> },
        { path: "/test/:id", element: <Testddayadd />},
        { path: "/meet", element: <Meeting /> },
        { path: "/grwork", element: <Groupwork /> },
        { path: "/addgrwork", element: <AddGr /> },
        { path: "/group/:id", element: <AddGr /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
        { path: "/profile", element: <Profile /> },

    ]);
    return element;

};

export default Router;