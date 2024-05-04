import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Form from './components/Form';
import Grid from './components/Grid.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

import GlobalStyle from "./styles/global"; // Renomeado de "Global" para "GlobalStyle" para refletir o padrão do styled-components

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a, b) => (a.nomeUsuario > b.nomeUsuario ? 1 : -1))); // Corrigido: Ordenação usando "nomeUsuario" ao invés de "nome"
    } catch (error) {
      toast.error("Erro ao buscar usuários"); // Corrigido: Adicionada mensagem de erro fixa
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <GlobalStyle /> {/* Corrigido: Renomeado de "Global" para "GlobalStyle" */}
      <Container>
        <Title>USUÁRIOS</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
    </>
  );
}

export default App;
