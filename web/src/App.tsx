import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

export function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    async function getRepos() {
      await axios
        .get('http://localhost:4000/repos')
        .then((res) => {
          // My attempt at defining type with TypeScript (getting a squiggly line even though docs say this is correct)
          const filteredRepos = res.data.filter((repo: Repo{}) => repo.fork === false);
          console.log(filteredRepos)
        })
        .catch((err) => console.log(err.response.data));
    }
    
    getRepos();
  });

  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}
