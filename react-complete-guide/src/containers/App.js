import React, { Component } from 'react';
//import logo from './logo.svg';
import classes from './App.css';
// import Radium, {StyleRoot} from 'radium';
import Cockpit from '../components/Cockpit/Cockpit';
import Person from '../components/Persons/Person/Person';
import Persons from '../components/Persons/Persons';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
class App extends Component {
  constructor(props){
    super(props);
    console.log(props)
    this.state = {
      persons: [
        {id:'ad1s',name:'Max',age:28},
        {id:'ad2s',name:'Min',age:29},
        {id:'ad3s',name:'Stephanie',age:26}
      ],
    otherState : 'other state' ,
    showPersons : false
    }
  }

  // state = {
  //   persons: [
  //     {id:'ad1s',name:'Max',age:28},
  //     {id:'ad2s',name:'Min',age:29},
  //     {id:'ad3s',name:'Stephanie',age:26}
  //   ],
  // otherState : 'other state' ,
  // showPersons : false
  // }
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
    // debugger;
    const persons=[...this.state.persons]
    persons[personIndex]=person;
    this.setState({persons:persons})
  }
  deletePersonHandler =(personIndex)=>{
    // const persons = this.state.persons;
    const persons = [...this.state.persons];
    persons.splice(personIndex,1);
    this.setState({persons:persons})
  }
  render() {
   
    let persons=null;
    
    if(this.state.showPersons){
      persons=(
        
          <Persons
          persons = {this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangeHandler}/>

      // {this.state.persons.map((person,index)=>{
      //       return (<ErrorBoundary key={person.id}>
      //         <Person 
      //           click={()=>this.deletePersonHandler(index)} 
      //           name={person.name} 
      //           age={person.age}
      //           changed={(event)=>this.nameChangeHandler(event,person.id)}/>
      //         </ErrorBoundary>)
      //     })} 
       
      );
      // btnClass = classes.Red;
    }

    
    return (
      
      <div className={classes.App}>
      <Cockpit 
      appTitle ={this.props.appTitle}
      showPersons={this.state.showPersons}
      persons={this.state.persons}
      clicked={this.togglePersonHandler}/> 
      {persons}
      </div>
      
    );
    // return React.createElement('div', {className:'App'}, React.createElement('h1', null, 'Hi, I\'m god' ))
  }
}

export default App;
