const { Router } = require("express");
const { Activity } = require("../db");
const router = Router();

router.post("/", async (req, res, next) => {
  const { name, dificulty, duration, season, countries } = req.body;

  if (!name || !dificulty || !duration || !season || !countries) {
    return res.status(400).send("Obligatory data missing.");
  }

  const newActivity = {
    name: name,
    dificulty: dificulty,
    duration: duration,
    season: season,
  };

  try {
    const activity = await Activity.create(newActivity);
    activity.addCountry(countries);
    //console.log(activity);
    res.send("Activity created successfully.");
  } catch (e) {
    console.log("Error:", e);
    res.status(400).send("Error creating activity.");
  }
});

router.get("/", async (req, res, next) => {
  const activities = await Activity.findAll({
    attributes: ["id", "name"],
  }).catch((e) => {
    console.log("Error al buscar actividades: ", e);
    res.status(404);
  });
  //console.log("Traigo dactividades");
  res.send(activities);
});


module.exports = router;
