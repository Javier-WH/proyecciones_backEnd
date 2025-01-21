import Profile from "#models/perfil.js";

async function deleteProfile(req, res) {
  const { id } = req.params;
  const result = await Profile.destroy({
    where: {
      id,
    },
  });

  res.json(result);
}
export default deleteProfile;

