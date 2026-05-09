exports.cadastrarUsuario = (req, res) => {
  const { materia, objetivo, local, limite } = req.body;
  const errors = {};

  if (!materia || materia.trim() === "") errors.materia = "Matéria é obrigatória.";
  if (!objetivo || objetivo.trim() === "") errors.objetivo = "Objetivo é obrigatório.";
  if (!local || local.trim() === "") errors.local = "Local deve ser selecionado.";
  if (!limite || limite <= 0) errors.limite = "Limite deve ser maior que 0.";

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
};
