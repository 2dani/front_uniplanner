import React from 'react';
import {
    BrowserRouter,
} from "react-router-dom";
import { Header, Footer } from "./component"
import Router from "./routes";

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <div className="App">
                <Router/>
            </div>
            <Footer />
        </BrowserRouter>
    );
};

export default App;