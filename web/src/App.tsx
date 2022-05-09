import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

export function App() {
  const [repos, setRepos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [visible, setVisible] = useState(false);

  // interface repo {
  //   fork: boolean;
  // }

  useEffect(() => {
    getRepos();
  }, []);

  // GET Request to get all the repos from the endpoint of my server
  const getRepos = async () => {
    await axios
      .get('http://localhost:4000/repos')
      .then((res) => {
        setRepos(res.data);
        filterRepos(res.data);
      })
      .catch((err) => console.log(err));
  };
  console.log(repos);

  // Filter the repos so only repos with fork set to false display
  const filterRepos = (array) => {
    const filteredRepos = array?.filter((el) => el.fork === false)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    
    setFiltered(filteredRepos);
  };
  console.log(filtered);

  const sortDates = (array) => {
    const sortedArray = array.sort((date1, date2) => date1 - date2);
    return sortedArray;
  }
  





  const userInfo = filtered.map((repo, idx) => {
    const { name, description, language, forks_count, owner } = repo;

    return (
      <div key={idx}>
        <div className="row card">
          <img className="image" src={owner.avatar_url} alt="" />
            <div className="col justify-content-start">
              <p className="gray-100"><span className="text-black-50">Repository Name: </span>{name}</p>
              <p className="gray-100"><span className="text-black-50">Repository Description: </span>{description}</p>
              <p className="gray-100"><span className="text-black-50">Repository Language: </span>{language}</p>
              <p className="gray-100"><span className="text-black-50">Repository Forks: </span>{forks_count}</p>
              <p className="gray-100"><span className="text-black-50">Date: </span>{repo.created_at}</p>
            </div>
        </div>
        <div>

        </div>
      </div>
    );
  });
  console.log('User Info: ', userInfo);

  return (
    <div className="App">
      <h1>Thank you for taking the time to view this project!</h1>
      <div>{userInfo}</div>
    </div>
  );
}
