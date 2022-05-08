import React from 'react';
import './App.css';
import axios from 'axios';

export function App() {
  async function getRepos() {
    axios
      .get('http://localhost:4000/repos')
      .then((res) => console.log('Response: ', res))
      .catch((err) => console.log(err.response.data));
  }

  getRepos();

  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}
