import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

export function App() {
  const [repos, setRepos] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [displayedList, setDisplayedList] = useState([]);
  const [languageFilter, setLanguageFilter] = useState(false);

  useEffect(() => {
    getRepos();
  }, []);

  // GET Request to get all the repos from the endpoint of my server
  const getRepos = async () => {
    await axios
      .get('http://localhost:4000/repos')
      .then((res) => {
        setRepos(res.data);
        sortRepos(res.data);
        setLanguageFilter(false);
      })
      .catch((err) => console.log(err));
  };

  // Sort the repos in reverse chronological order
  const sortRepos = (array) => {
    const sortedRepos = array.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    setSorted(sortedRepos);
    setDisplayedList(sortedRepos);
    setLanguageFilter(true);
  };


  // Filter by language
  const filterLanguage = (e, array) => {
    
    const lang = array.filter(el => el.language === e.target.innerHTML.toString());
    setDisplayedList(lang);
    setLanguageFilter(true);
  }

  // Vanilla JavaScript and Bootstrap collapsible div
  const collapseFunction = (e) => {
    const collapsibleDiv = e.target.nextElementSibling;
    if(collapsibleDiv.classList.contains('show')) {
      collapsibleDiv.classList.remove('show');
    } else {
      collapsibleDiv.classList.add('show');
    };
  }



  const userInfo = displayedList.map((repo, idx) => {
    const { name, description, language, forks_count, owner } = repo;

    return (
      <div key={idx}>
        <div 
          onClick={(e) => {collapseFunction(e)}}
          className="row card"
          >
          <img className="image" src={owner.avatar_url} alt="" />
            <div className="col justify-content-start">
              <p className="gray-400"><span className="text-black-50">Repository Name: </span>{name}</p>
              <p className="gray-400"><span className="text-black-50">Repository Description: </span>{description ? description : "No Description"}</p>
              <p className="gray-400"><span className="text-black-50">Repository Forks: </span>{forks_count}</p>
              <span className="text-black-50 gray-400">Repository Language: </span>
              <button 
                onClick={(e) => {filterLanguage(e, sorted)}}
                className="btn btn-secondary">
                     { language}
              </button>
              <button 
                onClick={() => {getRepos()}}
                className={languageFilter === false ? "btn btn-secondary no-display" : "btn btn-secondary display"}>
                     Original List
              </button>
            </div>
            <div className="collapse hidden-container">
              <p className="gray-400 hidden-p"><span className="text-black-50 hidden-span">Recent Commit Date: </span>{repo.created_at}</p>
              <p className="gray-400 hidden-p"><span className="text-black-50 hidden-span">Author: </span>{owner.login}</p>
              <p className="gray-400 hidden-p"><span className="text-black-50 hidden-span">Message: </span>Happy Coding!!!</p>
            </div>
        </div>
      </div>
    );
  });

  return (
    <div className="App">
      <h1>Thank you for taking the time to view this project!</h1>
      <h3>I had to spread out my work over over a few days because:</h3>
      <ul>
        <li>I'm working full time.</li>
        <li>I haven't used React in Months</li>
      </ul>
      <div>{userInfo}</div>
    </div>
  );
}
