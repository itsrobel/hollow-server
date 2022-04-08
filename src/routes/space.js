const Space = require("../database/models/space");
const User = require("../database/models/user");
const express = require("express");
const router = express.Router();
// gets all chat rooms
router.get("/", (req, res) => {
  Space.find()
    .then((space) => res.json(space))
    .catch((err) => res.status(400).json("Error: " + err));
});
//creates chat room
router.post("/", (req, res) => {
  console.log(req.body);
  const { name, owner } = req.body;
  if (!req.session.passport.user || !owner) {
    res.json({ error: { msg: "You have to sign in to use this Feature" } });
  } else if (owner !== req.session.passport.user) {
    res.json({
      error: { msg: "User signed in does not match the user id given" },
    });
  } else if (!name) {
    req.json({
      error: { msg: "No name was given" },
    });
  } else {
    User.findById(req.session.passport.user, {
      username: true,
    }).then((data) => {
      try {
        let username = data.username;
        Space.findOne({ name }).then((project) => {
          if (project) {
            errors.push({ msg: "you already have a project with that name" });
            res.json({
              error: { msg: "space already exists with that name " },
            });
          } else {
            console.log("open");
            let project = new Space({ owner: { owner, username }, name });
            project.save();
            res.json({ success: { msg: "new project created" } });
          }
        });
      } catch {
        res.json({ error: { msg: "Failed to fetch user" } });
      }
    });
  }
});
// delete chatroom
router.delete("/:id", (req, res) => {
  Space.findByIdAndDelete(req.params.id)
    .then(() => res.json("Space deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;
