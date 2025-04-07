import {useState} from 'react';
import {FiSearch} from 'react-icons/fi';
import './services/api'
import api from './services/api';

import './styles.css';

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({});

  async function handleSearch(){
    if(input === ''){
      alert("Preencha com o CEP que deseja!")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    }catch{
      alert("Erro, insira um CEP valido");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>
      <div className="containerinput">
        <input type="text" placeholder="Digite o seu CEP aqui..." value={input} onChange={(e) => setInput(e.target.value) }/>
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff"/>
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>
          <div className='line'><p>Rua: </p><span>{cep.logradouro}</span></div>
          <div className='line'><p>Complemento: </p><span>{cep.complemento}</span></div>
          <div className='line'><p>Bairro: </p><span>{cep.bairro}</span></div>
          <div className='line'><p>Cidade: </p><span>{cep.localidade} -{cep.uf}</span></div>
        </main>
      )}
      <footer>
          <p>Pedro Henrique Melo e Silva - Projeto Buscador de CEP</p>
      </footer>
    </div>
  );
}

export default App;
