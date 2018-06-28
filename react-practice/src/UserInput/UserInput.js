import React from 'react'
// import './UserOutput.css'
const userInput =(props)=>{
    const inputStyle={
        border:'1px solid green'
    };
    return <input type="text" 
    style ={inputStyle}
    onChange={props.changed}
    value={props.currentName}/>;
}
export default userInput;