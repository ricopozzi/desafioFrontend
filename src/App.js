import React, { useState, useEffect } from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repo, addRepo] = useState([])

  useEffect(()=>{
    api.get('/repositories').then(response => {
       addRepo(response.data)
    })  
  
  },[])
  

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      url: "https://github.com/ricopozzi",
      title: "ReactJS",
      techs: ["React", "Node.js"],
    })

    addRepo([...repo, response.data])

    
  }
  async function handleRemoveRepository(id) {

    const response = await api.delete(`/repositories/${id}`)

    const newRepo = repo.filter(rep => rep.id !== id)

    addRepo(newRepo)
  }


  return (

    <div>
      <ul data-testid="repository-list">
        {
         repo.map(repo =>{
          return <li key={repo.id}>
           {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        })
        
        }
          
    
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
