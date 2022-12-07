import axios from 'axios';
import { Container, Button, Form, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState } from 'react';

function App() {
  const [userName, setUserName] = useState("");

  const [name, setName] = useState("Nome de usuário");
  const [photo, setPhoto] = useState("https://cdn0.iconfinder.com/data/icons/free-social-media-set/24/github-512.png");
  const [qtdRepositories, setQtdRepositories] = useState(0);


  const handleSearch = () => {
    let listaRepoHtml = document.querySelector('#repositories');
    listaRepoHtml.innerHTML = '';

    axios
      .get(`https://api.github.com/users/${userName}`).then(res => {
        setName(res.data.name);
        setPhoto(res.data.avatar_url);
        axios.
          get(res.data.repos_url).
          then(arrayRepo => {
            setQtdRepositories(arrayRepo.data.length);

            arrayRepo.data.forEach(e => {
              const itemRepoContent = e.name;
              listaRepoHtml.innerHTML += `<div class="list-group-item">${itemRepoContent}</div>`;

              console.log(itemRepoContent);
            });

          })

      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <Container fluid className="bg-dark bg-gradient rounded-5 text-white text-center p-3 mt-5 w-75">
        <h3>Github Wiki</h3>
        <main>
          <div className='row'>
            <Form className='col-6'>
              <Form.Label>Buscar perfil</Form.Label>
              <Form.Control className='mb-3' type="text" placeholder="Insira o usuário" onChange={(e) => setUserName(e.target.value)}></Form.Control>
              <Button onClick={handleSearch}>Buscar</Button>
            </Form>

            <div className="content col-6">
              <img className='border border-3 rounded-pill' width="100px" src={photo} alt="Foto de usuário" />
              <p className='fs-6'>{name}</p>
            </div>
          </div>

          <div>
            <h3 className='mt-4'>Quantidade de repositórios: {qtdRepositories}</h3>
            <ListGroup id='repositories'>
            </ListGroup>
          </div>

        </main>
      </Container>
    </div>
  );
}

export default App;
