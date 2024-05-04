import express from "express";
import { getUsers, 
        addUser,
        updateUser,
        deleteUser,
        
} from "../Controllers/users.js";
const router = express.Router();

router.get("/", getUsers);

router.post("/", addUser);

router.put("/:idUsuarios", updateUser); // Adicionado ":id" como parâmetro para identificar o usuário a ser atualizado

router.delete("/:idUsuarios", deleteUser); // Adicionado ":id" como parâmetro para identificar o usuário a ser deletado

export default router;
