import logo from './logo.svg';
// import * as url from "node:url";
import './App.css';
import React, {useEffect, useState} from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NameColor from "./components/NameColor";
import DataCard from "./components/DataCard";



function App() {

    return (
        <div className="App">
            <div className="flex gap10">
                <NameColor/>
                <DataCard/>
            </div>
        </div>
    );
}

export default App;

