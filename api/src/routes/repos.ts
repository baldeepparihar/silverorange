import { Router, Request, Response } from 'express';
import axios from 'axios';


export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  
  
  
  // TODO: See README.md Task (A). Return repo data here. You’ve got this!

  // Axios was defaulting to port 80, so I changed the baseURL to localhost:4000
  axios.defaults.baseURL = 'http://localhost:4000';
  try {

  let resp = await axios('https://api.github.com/users/silverorange/repos');

  // Was getting CORS error
  // Tried using headers with "Access-Control-Allow-Origin": "localhost://3000"
  // That didn't work.  I found this and it worked.  
  // This is beyond my knowledge level but I understand it sets the headers to allow cross origin requests
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 

  res.header('Cache-Control', 'no-store');
  res.status(200);
  res.json(resp.data);

} catch(e) {
  res.status(400).json("Bad Request");
  res.json(e);

}
  
    

  
});
