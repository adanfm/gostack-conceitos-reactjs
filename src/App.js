import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      try {
        const response = await api.get('repositories')

        setRepositories(response.data);
      } catch(err) {
        console.error(err);
      }
    }
    
    loadRepositories()
  }, []);

  async function handleAddRepository() {
    try {
      const response = await api.post('repositories', {
        title: `Repositorio ${Date.now()}`,
        url: 'http://my-repository.github.com/meu-repo',
        techs: ['ReactJs', 'NodeJS'],
      });
      
      setRepositories([...repositories, response.data]);
    } catch(err) {
      console.error(err);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);

      const results = repositories.filter(repository => repository.id !== id);

      setRepositories(results);
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <div>
      <button onClick={handleAddRepository}>Adicionar</button>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
