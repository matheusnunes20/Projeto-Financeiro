import axios from "axios";
import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 200px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  height: 45px;
  color: white;
  background-color: #2c73d2;
  cursor: pointer;
`;

const Label = styled.label``;

const Form = ({ onEdit, setOnEdit, getUsers }) => {
  const [formData, setFormData] = useState({
    nomeUsuario: '',
    email: '',
    telefone: '',
    dataNascimento: ''
  });

  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const { nomeUsuario, email, telefone, dataNascimento } = onEdit;
      setFormData({
        nomeUsuario,
        email,
        telefone,
        dataNascimento
      });
    }
  }, [onEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.nomeUsuario || !formData.email || !formData.telefone || !formData.dataNascimento) {
        throw new Error("Preencha todos os campos");
      }

      const userData = {
        nomeUsuario: formData.nomeUsuario,
        email: formData.email,
        telefone: formData.telefone,
        dataNascimento: formData.dataNascimento,
      };

      if (onEdit) {
        await axios.put("http://localhost:8800/" + onEdit.idUsuario, userData);
        toast.success("Usuário atualizado com sucesso");
      } else {
        await axios.post("http://localhost:8800/", userData);
        toast.success("Usuário cadastrado com sucesso");
      }
      
      // Limpa o formulário após o envio bem-sucedido
      setFormData({
        nomeUsuario: '',
        email: '',
        telefone: '',
        dataNascimento: ''
      });

      setOnEdit(null);
      getUsers();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nomeUsuario" type="text" value={formData.nomeUsuario} onChange={handleChange} />
      </InputArea>

      <InputArea>
        <Label>Email</Label>
        <Input name="email" type="email" value={formData.email} onChange={handleChange} />
      </InputArea>

      <InputArea>
        <Label>Telefone</Label>
        <Input name="telefone" type="tel" value={formData.telefone} onChange={handleChange} />
      </InputArea>

      <InputArea>
        <Label>Data de Nascimento</Label>
        <Input name="dataNascimento" type="date" value={formData.dataNascimento} onChange={handleChange} />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
