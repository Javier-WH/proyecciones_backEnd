import Profile from "#models/perfil.js";
import ProfileNames from "#models/perfilNames.js";
import connection from "#dataBaseConnection";

async function deleteProfile(req, res) {
  const { perfil_name_id } = req.params;
  if (!perfil_name_id) {
    return res.status(401).json({ error: "debe suministrar un id de nombre de perfil" });
  }

  const transaction = await connection.transaction();

  try {
    await Profile.destroy(
      {
        where: {
          perfil_name_id,
        },
      },
      { transaction }
    );

    await ProfileNames.destroy(
      {
        where: {
          id: perfil_name_id,
        },
      },
      { transaction }
    );

    await transaction.commit();
    res.status(200).json({ message: "perfil eliminado" });
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    res.status(500).json({ error: "ha ocurrido un error" });
  }
}
export default deleteProfile;

