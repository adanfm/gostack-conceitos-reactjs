import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const repository = { 
      title: `Repository ${Date.now()}`,
      url: `http://localhost/repository/${Date.now()}`,
      techs: [
        'NodeJS',
        'React'
      ],
    };

    const response = await api.post('repositories', repository);

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    if (response.status == 204) {
      const responseList = await api.get('repositories');

      setRepositories(responseList.data);
    }
  }

  return (
    <div>
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

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
