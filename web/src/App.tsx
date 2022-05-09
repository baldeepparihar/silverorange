import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

export function App() {
  const [repos, setRepos] = useState([]);
  const [filtered, setFiltered] = useState([]);

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
    const filteredRepos = array?.filter((el) => el.fork === false);
    setFiltered(filteredRepos);
  };
  console.log(filtered);

  const userInfo = filtered.map((repo, idx) => {
    const { owner } = repo;

    return (
      <div key={idx}>
        <div>
          <img src={owner.avatar_url} alt="" />
          <div>
            <p>{owner.login}</p>
          </div>
        </div>
        
      </div>
    );
  });
  console.log('User Info: ', userInfo);

  // const ownerInfo = userInfo.map((owner) => (
  //     <div>
  //       <p>{owner.avatar_url}</p>
  //     </div>
  //   )
  // );

  return (
    <div className="App">
      <h1>Hello World</h1>
      <h1>{userInfo}</h1>
    </div>
  );
}
