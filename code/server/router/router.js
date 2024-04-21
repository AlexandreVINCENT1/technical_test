import Router from "express";
import {calculGameProgress} from "../controller/score.js";
import cors from "cors";

const router = Router();

router.use(cors());

router.use((req, res, next) => {
  console.log(`${new Date().toJSON()}:\n  ${req.method}  ${req.path}\n`)
  next();
});

router.get("/", (req, res) => {
  res.status(200).send("ok");
});

router.post("/scoreboard", (req, res) => {
  if (!req.body.points || !req.body.players)
    return res.status(400).send("Bad Request");
  else if (!Array.isArray(req.body.points) || !Array.isArray(req.body.players))
    return res.status(400).send("Bad Request");
  else if (req.body.players.length !== 2) //req.body.points.length !== 150 ||
    return res.status(400).send("Bad Request");
  let scoreboard = calculGameProgress(req.body.points, req.body.players);
  return res.json(scoreboard);
});

router.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

export default router;