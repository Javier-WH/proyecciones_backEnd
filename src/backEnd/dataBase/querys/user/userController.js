/* eslint-disable camelcase */
import { validateCreateUserData, validateLoginUserData } from "./validateUserData.js";
import Users from "#models/users.js";
import Pensum from "#models/pensum.js";
import { createUser } from "./userAux/userAux.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const saltRounds = 10;

export async function createUserController(req, res) {
  const { error, value } = validateCreateUserData(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    value.id = uuidv4();
    value.password = bcrypt.hashSync(value.password, saltRounds);
    const request = await createUser(value);
    if (request.error) {
      return res.status(400).json({ error: request.message });
    }
    res.status(200).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function loginUserController(req, res) {
  const { error, value } = validateLoginUserData(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const user = await Users.findOne({
      where: {
        user: value.user,
      },
    });
    if (!user) {
      return res.status(401).json({ error: "El usuario no está registrado" });
    }

    if (!bcrypt.compareSync(value.password, user.password)) {
      return res.status(401).json({ error: "La contraseña es incorrecta" });
    }

    const { pnf_id, name, last_name, ci, su } = user;

    const userData = {
      name: `${name} ${last_name}`,
      ci,
      su,
    };

    const requestPensum = await Pensum.findAll({ attributes: ["subject_id"], where: { pnf_id }, raw: true });
    const perfil = requestPensum.map((item) => item.subject_id);

    res.status(200).json({ message: "Inicio de sesión exitoso", pnf_id, perfil, userData });
  } catch (error) {
    res.status(500).json({ error });
  }
}

