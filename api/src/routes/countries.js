const { Router } = require("express");



const axios = require("axios").default;


const router = Router();
const { Country, Activity } = require("../db");
const sequelize = require("sequelize");

router.get("/", async (req, res) => {
  if (!(await Country.findAll()).length) {
    // Si la base de datos esta vacia, busco los paises de la api y los guardo en la DB
    const api = await axios
      .get("https://restcountries.com/v3/all")
      .catch((e) => {
        console.log("Error get API: ", e);
        res.status(404);
      });

    const countries = api.data.map((country) => {
      return {
        id: country.cca3,
        name: country.name.common,
        flag: country.flags[1],
        continent: country.continents[0],
        languages: Object.values(
          typeof country.languages === "object" ? country.languages : "unknown"
        ),
        capital:
          typeof country.capital === "undefined"
            ? "unknown"
            : country.capital[0],
        subregion: country.subregion,
        area: country.area,
        population: country.population,
      };
    });

    await Country.bulkCreate(countries).catch((e) => {
      console.log("Error al crear paises en DB: ", e);
      res.status(404);
    });
  }

  if (Object.keys(req.query).length) {
    // busco en DB
    const COUNTRY = req.query.name.toLocaleLowerCase();
    const dbCountries = await Country.findAll({
      limit: 20,
      where: {
        name: sequelize.where(
          sequelize.fn("LOWER", sequelize.col("name")),
          "LIKE",
          "%" + COUNTRY + "%"
        ),
      },
      attributes: ["id", "flag", "name", "continent", "population", "languages"],
      include: [
        {
          model: Activity,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    }).catch((e) => {
      console.log("Error al buscar por nombre: ", e);
      res.status(404);
    });
    console.log("Busco por nombre");
    res.send(dbCountries);
  } else {
    // traigo los paises de la DB
    const dbCountries = await Country.findAll({
      attributes: ["id", "flag", "name", "continent", "population", "languages"],
      include: [
        {
          model: Activity,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    }).catch((e) => {
      console.log("Error al traer de la DB: ", e);
      res.status(404);
    });

    console.log("Traigo de la DB");
    res.send(dbCountries);
  }
});

router.get("/:id", async (req, res) => {
  const ID = req.params.id;

  const dbCountries = await Country.findByPk(ID, {
    include: [
      {
        model: Activity,
        attributes: ["name", "dificulty", "duration", "season"],
        through: {
          attributes: [],
        },
      },
    ],
  }).catch((e) => {
    console.log("Error al buscar detalles: ", e);
    res.status(404);
  });

  console.log("Traigo todos los detalles");
  res.send(dbCountries);
});



module.exports = router;
