const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories)
});

app.post("/repositories", (request, response) => {
  let repository = request.body
  repository = {id: uuid(), ...repository, likes: 0 }
  repositories.push(repository)
  console.log(repository)
  response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
 
  const { id } = request.params
  const { title, url, techs } = request.body
  const repositoryIndex = repositories.findIndex((item) => item.id === id )
  if(repositoryIndex < 0){
    return response.status(400).json({error: 'Repository not found'})
  }
  const repository = {
    id,
    title,
    url,
    techs,
    likes: 0
  }
  repositories[repositoryIndex] = repository

  return response.json(repository)
});

app.delete("/repositories/:id", (request, response) => {
  
  const { id } = request.params
  const repositoryIndex = repositories.findIndex((item) => item.id === id)
  if(repositoryIndex < 0){
    return response.status(400).json({error: 'Repository not found'})
  }
  response.status(204).json(repositories.splice(repositoryIndex, 1))

});

app.post("/repositories/:id/like", (request, response) => {
 
  const { id } = request.params
  const repositoryIndex = repositories.findIndex((item) => item.id === id )
  if(repositoryIndex < 0){
    return response.status(400).json({error: 'Repository not found'})
  }
  
  const { likes } = repositories[repositoryIndex]
  repositories[repositoryIndex] = { ...repositories[repositoryIndex], likes: likes + 1 }

  return response.json(repositories[repositoryIndex])

});

module.exports = app;
