import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Radium, {StyleRoot} from 'radium';
import Person from './Person/Person1';
class App extends Component {
  state = {
    persons: [
      {id:'ad1s',name:'Max',age:28},
      {id:'ad2s',name:'Min',age:29},
      {id:'ad3s',name:'Stephanie',age:26}
    ],
  otherState : 'other state' ,
  showPersons : false
  }
  togglePersonHandler = () =>{
    const doesShow = this.state.showPersons;
    this.setState({showPersons:!doesShow})
  }
  switchNameHandler = (newName) => {
   
    // Don't do this: this.state.persons[0].name = 'Daming'
    
    // let oldPerson =this.state.persons[1]
    // let person = Object.assign(oldPerson,{name: 'DM', age: 5});
    // console.log(oldPerson.name)
    // this.setState(person)
     

    this.setState({
      persons:[
        {name: newName,age:18},
        {name:'Min1',age:19},
        {name:'Stephanie1',age:2}
    ]})

  }

  nameChangeHandler =(event,id)=>{
    // this.setState({
    //   persons:[
    //     {name: 'HEIHEI',age:18},
    //     {name: event.target.value,age:19},
    //     {name:'Stephanie1',age:2}
    // ]})
    const personIndex = this.state.persons.findIndex(p =>{
      return p.id === id;
    })
    const person = {...this.state.persons[personIndex]};
    // const person = Object.assign({},this.state.persons[personIndex])
    person.name =event.target.value;
    const persons=[...this.state.persons]
    persons[personIndex]=person;
    this.setState({person:persons})
  }
  deletePersonHandler =(personIndex)=>{
    // const persons = this.state.persons;
    const persons = [...this.state.persons];
    persons.splice(personIndex,1);
    this.setState({persons:persons})
  }
  render() {
    const buttonStyle ={
      backgroundColor : 'green',
      color:'white',
      font:'inherit',
      border:'1px solid blue',
      padding:'8px',
      cursor:'pointer',
      ':hover':{
        backgroundColor:'lightgreen',
        color:'black'
      }
    }
    let persons=null;
    if(this.state.showPersons){
      persons=(
        <div>
          {this.state.persons.map((person,index)=>{
            return (<Person click={()=>this.deletePersonHandler(index)} 
            name={person.name} 
            age={person.age}
            key={person.id}
            changed={(event)=>this.nameChangeHandler(event,person.id)}
            />)
          })}
          {/* <Person 
        name= {this.state.persons[0].name} 
        age= {this.state.persons[0].age}/>
       <Person 
        name= {this.state.persons[1].name} 
        age= {this.state.persons[1].age}
        click={this.switchNameHandler.bind(this,'zx')}
        changed={this.nameChangeHandler}
        >My hobbies:Racing</Person>
       <Person 
        name= {this.state.persons[2].name} 
        age= {this.state.persons[2].age}/> */}
        </div>
      );
      buttonStyle.backgroundColor='red';
      buttonStyle[':hover']={
        backgroundColor:'lightgreen',
        color:'black'
      }
    }

    const classes = [];
    if(this.state.persons.length<=2){
      classes.push('red');
    }
    if(this.state.persons.length<=1){
      classes.push('bold');
    }
    return (
      <StyleRoot>
      <div className="App">
       <h1>Hello world</h1>
       <p className={classes.join(' ')}>I love wzx</p>
       <button style={buttonStyle} 
      //  onClick={() =>  this.switchNameHandler('DM@')}>Swich Name
      onClick ={()=> this.togglePersonHandler()}>Swich Name
      </button>
      {persons}
      {/* {this.state.showPersons?<div > */}
       {/* <Person 
        name= {this.state.persons[0].name} 
        age= {this.state.persons[0].age}/>
       <Person 
        name= {this.state.persons[1].name} 
        age= {this.state.persons[1].age}
        click={this.switchNameHandler.bind(this,'zx')}
        changed={this.nameChangeHandler}
        >My hobbies:Racing</Person>
       <Person 
        name= {this.state.persons[2].name} 
        age= {this.state.persons[2].age}/> */}
       {/* </div>:null}   */}
      </div>
      </StyleRoot>
    );
    // return React.createElement('div', {className:'App'}, React.createElement('h1', null, 'Hi, I\'m god' ))
  }
}

export default Radium(App);
