import { MongoClient } from 'mongodb';
import path from 'path';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'

import './init-db'
import { addNewTask, updateTask, addNewComment } from './utility'
import { authenticationRoute } from './authenticate'

let port = process.env.PORT || 8888;
let app = express();

app.listen(port, console.log("Server listening on port", port));
/*
app.get('/', (req, res) => {
  res.send(" Hello world!");
})
*/

app.use(
  cors(),
  bodyParser.urlencoded({extended: true}),
  bodyParser.json()
);

authenticationRoute(app);

if (process.env.NODE_ENV == 'production') {
  app.use(express.static(path.resolve(__dirname, '../../dist')));
  app.get('/*', (req, res)=>{
    res.sendFile(path.resolve('index.html'));
  });
}

app.post('/task/new', async (req, res)=> {
  let task = req.body.task;
  await addNewTask(task);
  res.status(200).send();
})

app.post('/task/update', async (req, res)=> {
  let task = req.body.task;
  await updateTask(task);
  res.status(200).send();
})

app.post('/comment/new', async (req, res) => {
  let comment = req.body.comment;
  await addNewComment(comment);
  res.status(200).send();
})
