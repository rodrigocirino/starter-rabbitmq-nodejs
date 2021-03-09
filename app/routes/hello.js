const router = require("express").Router();

router.route("/").get((req, res) => {
  msg = `Hello ${req.query.name || "World"} from GET request!`;
  res.json({ msg });
  console.log(msg);
});

router.route("/").post((req, res) => {
  msg = `Hello ${req.body.name || "World"} from POST request!`;
  res.json({ msg });
  console.log(msg);
});

router.route("/:lang").get((req, res) => {
  switch (req.params.lang) {
    case "es":
      msg = "Holla Mundo !";
      break;
    case "pt":
      msg = "Olá Mundo !";
      break;
    case "fr":
      msg = "Bonjour Monde !";
      break;
    default:
      msg = "Hello World !";
  }

  res.json({ msg });
});

module.exports = router;
