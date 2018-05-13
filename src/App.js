import React, { Component } from 'react';
import { Link, Router } from "react-router-dom";

import logo from './logo.svg';
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
    });
  }

  onSubmit(_values){
    const listRef = firebase.database().ref("list");
    listRef.push(_values);
  }

  deleteItem(_key){
    if (window.confirm('Are you sure you wish to delete this item?')){
      const itemRef = firebase.database().ref(`list/${_key}`);
      itemRef.remove();
    }
  }

  render() {
    const {list} = this.state;
    return (
      <div>
        <FormCreate onSubmit={this.onSubmit}/>
        <ul>
            {Object.entries(list).map(([key, {firstName, lastName, email}],index) =>(
              <li key={key}>
                {`${index+1}: ${firstName} - ${lastName}: ${email}`}
                <Link to={`${key}`}><button>Edit</button></Link>
                <button onClick={()=>this.deleteItem(key)}>Delete</button>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default App;
