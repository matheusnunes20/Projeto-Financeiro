import React from "react";
import axios from 'axios';
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 800px;
  margin: 20px auto;
  word-break: break-all;
`;

const Tr = styled.tr``;

const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;
`;

const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};
  
  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none;"}
  }
`;

const GridComponent = ({ users, setUsers, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);  
  };

  const handleDelete = async (idUsuarios) => {
    try {
      const response = await axios.delete("http://localhost:8800/" + idUsuarios);
      const newArray = users.filter((user) => user.idUsuarios !== idUsuarios);
      setUsers(newArray);
      toast.success("Usuário deletado com sucesso");
    } catch (error) {
      toast.error("Erro ao deletar usuário");
    }
    setOnEdit(null);
  };
  
  return (
    <>
      <ToastContainer />
      <Table>
        <thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Email</Th>
            <Th onlyWeb>Fone</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </thead>
        <tbody>
          {users.map((item) => (
            <Tr key={item.idUsuarios}>
              <Td width="30%">{item.nomeUsuario}</Td>
              <Td width="30%">{item.email}</Td>
              <Td width="20%" onlyWeb>{item.telefone}</Td>
              <Td alignCenter width="5%">
                <FaEdit onClick={() => handleEdit(item)} />
              </Td>
              <Td alignCenter width="5%">
                <FaTrash onClick={() => handleDelete(item.idUsuarios)} />
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default GridComponent;