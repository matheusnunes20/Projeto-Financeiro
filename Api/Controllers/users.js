import { db } from "../db.js";

export const getUsers = (_, res) => {
    const q = "SELECT * FROM crud.usuarios";

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err); // Corrigido: Retornar status 500 em caso de erro

        return res.status(200).json(data);
    });
};

export const addUser = (req, res) => {
    const q = "INSERT INTO usuarios (nomeUsuario, email, telefone, dataNascimento) VALUES (?)"; // Corrigido: Sintaxe correta para inserção de dados

    const values = [
        req.body.nomeUsuario, // Corrigido: Corrigido o typo "req.boy" para "req.body"
        req.body.email,
        req.body.telefone,
        req.body.dataNascimento,
    ];

    db.query(q, [values], (err) => {
        if (err) return res.status(500).json(err); // Corrigido: Retornar status 500 em caso de erro

        return res.status(200).json("Usuário Cadastrado !!");
    });
};

export const updateUser = (req, res) => {
    const q = "UPDATE usuarios SET nomeUsuario = ?, email = ?, telefone = ?, dataNascimento = ? WHERE idUsuarios = ?";
    const values = [
        req.body.nomeUsuario,
        req.body.email,
        req.body.telefone,
        req.body.dataNascimento,
    ];

    db.query(q, values, (err) => {
        if (err) {
            console.error('Erro ao atualizar usuário:', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }

        return res.status(200).json("Usuário atualizado com sucesso!");
    });
}

export const deleteUser = (req, res) => {
    const q = "DELETE FROM crud.usuarios WHERE idUsuarios = ?"; // Corrigido: Sintaxe correta para exclusão de dados

    db.query(q, [req.params.idUsuarios], (err) => {
        if (err) return res.status(500).json(err); // Corrigido: Retornar status 500 em caso de erro

        return res.status(200).json("Usuário deletado !!");
    });
};
