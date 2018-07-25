// import React from 'react'
import React, {Component} from 'react'
import classes from './Person.css'
// import Radium from 'radium';

class Person extends Component{
    render(){
        return (
            <div className= {classes.Person} >
            
               <p onClick={this.props.click}>I'm a {this.props.name} and I'm {this.props.age} years old person</p>
               <p> {this.props.children} </p>
               <input type="text" onChange={this.props.changed} value = {this.props.name}/>
            </div>
           )
    }
}

// const person = (props) => {
// const rnd = Math.random()
// if(rnd>0.5){
//     throw new Error('Something went wrong')
// }
// return (
//      <div className= {classes.Person} >
     
//         <p onClick={props.click}>I'm a {props.name} and I'm {props.age} years old person</p>
//         <p> {props.children} </p>
//         <input type="text" onChange={props.changed} value = {props.name}/>
//      </div>
//     )
// }

// export default person;
export default Person;