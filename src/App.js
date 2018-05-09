import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FormCreate from './FormCreate';
import firebase from './firebase';

class App extends Component {
  state = {
    list: []
  };

  componentDidMount() {
    const listRef = firebase.database().ref("list");
    listRef.on("value", snapshot => {
      let list = snapshot.val();
      this.setState({ list });
      // console.log(this.state.list);
    });
  }

  onSubmit(_values){
    // console.log("values",_values);
    const listRef = firebase.database().ref("list");
    listRef.push(_values);
  }
  render() {
    const {list} = this.state;
 console.log(list);
    return (
      <div>
        <FormCreate onSubmit={this.onSubmit}/>
        <ul>
          {Object.entries(list).map(([key, {firstName, lastName, email}]) => (
            <li key={key}>{`${firstName} - ${lastName}: ${email}`}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;