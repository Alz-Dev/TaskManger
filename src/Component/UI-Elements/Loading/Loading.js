import React from "react";

const Loading = (props) => { 
    switch (props.loadingColor) {
        case 'red': {
            const color = 'text-danger'; ;
            break;
        }
        case 'green': {
            const color = 'text-success'; ;
            break;
        }
        case 'yellow': {
            const color = 'text-warning'; ;
            break;
        }
        case 'blue': {
            const color = 'text-primary'; ;
            break;
        }
        default : const color = 'text-primary';
            
    }
    return <div className={`spinner-grow ${Color} text-center`}/>
}