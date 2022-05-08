import { Router, Request, Response } from 'express';
import axios from 'axios';


export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  
  res.header('Cache-Control', 'no-store');
  res.status(200);
  // TODO: See README.md Task (A). Return repo data here. You’ve got this!

  // Axios was defaulting to port 80, so I changed the baseURL to localhost:4000
  axios.defaults.baseURL = 'http://localhost:4000';
  try {

  let resp = await axios('https://api.github.com/users/silverorange/repos');
  res.json(resp.data);

} catch(e) {

  res.json(e);

}
  
    

  
});
