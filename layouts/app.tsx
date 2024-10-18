import React from "react";

export default function({children} : {children:React.ReactNode}){

    return <div>
        HEADER
        {children}
        FOOTER
    </div>

}