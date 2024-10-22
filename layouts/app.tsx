import Navbar from "@/components/layout/app/navbar";
import React from "react";

export default function({children} : {children:React.ReactNode}){

    return <div id="app-layout">
        <Navbar/>
        <aside style={{gridArea: 'sidebar', background: 'yellow'}}></aside>
        <main style={{gridArea: 'main', background: 'blue'}}></main>
        <footer style={{gridArea: 'footer', background: 'green'}}></footer>
    </div>

}