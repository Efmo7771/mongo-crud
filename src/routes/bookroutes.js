const express = require("express");
const router = express.Router();
const libro = require("../models/bookmodel");

// Middleware
const leerUnLibro = async (req, res, next) => {
  let miLibro;
  const { id } = req.params;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({ message: `El id del libro no es válido` });
  }
  try {
    miLibro = await libro.findById(id);
    if (!miLibro) {
      return res.status(404).jason({ message: `El libro no fue encontrado` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  res.miLibro = miLibro;
  next();
};

// Iniciamos las peticiones
//-----------------------------------------------[GET ALL]--------------------------
// Obtener todos los libros
router.get("/", async (req, res) => {
  try {
    const libros = await libro.find();
    console.log("GET ALL", libros);
    if (libros.length === 0) {
      return res.status(204).json({ message: `Me duele una pierna` });
    }
    res.json(libros);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//--------------------------------------------------[POST]-----------------------
// Crear un nuevo libro (recurso)
router.post("/", async (req, res) => {
  const { titulo, autor, genero, fechaPublica } = req?.body;
  if (!titulo || !autor || !genero || !fechaPublica) {
    return res.status(400).json({ message: `Los campos son obligatorios` });
  }

  const glibro = new libro({
    titulo,
    autor,
    genero,
    fechaPublica,
  });
  try {
    const nuevoLibro = await glibro.save();
    console.log("POST", nuevoLibro);
    res.status(201).json(nuevoLibro);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//--------------------------------------------------[GET :id]-----------------------
router.get("/:id", leerUnLibro, async (req, res) => {
  res.json(res.miLibro);
});
//--------------------------------------------------[PUT]---------------------------
router.put("/:id", leerUnLibro, async (req, res) => {
  try {
    tLibro = res.miLibro;
    tLibro.autor = req.body.autor || tLibro.autor;
    tLibro.titulo = req.body.titulo || tLibro.titulo;
    tLibro.genero = req.body.genero || tLibro.genero;
    tLibro.fechaPublica = req.body.fechaPublica || tLibro.fechaPublica;
    const modiLibro = await tLibro.save();
    res.json(modiLibro);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//--------------------------------------------------[PATH]---------------------------
router.patch("/:id", leerUnLibro, async (req, res) => {
  if (
    !req.body.autor &&
    !req.body.titulo &&
    !req.body.genero &&
    !req.body.fechaPublica
  ) {
    return res
      .status(400)
      .json({ message: `Al menos un campo debe ser ingresado` });
  }
  try {
    tLibro = res.miLibro;
    tLibro.autor = req.body.autor || tLibro.autor;
    tLibro.titulo = req.body.titulo || tLibro.titulo;
    tLibro.genero = req.body.genero || tLibro.genero;
    tLibro.fechaPublica = req.body.fechaPublica || tLibro.fechaPublica;
    const modiLibro = await tLibro.save();
    res.json(modiLibro);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//--------------------------------------------------[DELETE]---------------------------
router.delete("/:id", leerUnLibro, async (req, res) => {
  try {
    rLibro = res.miLibro;
    await rLibro.deleteOne({
        _id: rLibro._id
    });
    res.json({message: `EL libro ${res.miLibro.titulo} ha sido  borrado de la base de datos`});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
