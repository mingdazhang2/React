import React from 'react'
import './Person.css'
// import Radium from 'radium';
const person = (props) => {
    const style={
        
    }
return (
     <div className="Person" style={style}>
        <p onClick={props.click}>I'm a {props.name} and I'm {props.age} years old person</p>
        <p> {props.children} </p>
        <input type="text" onChange={props.changed} value = {props.name}/>
     </div>
    )
}

export default person;