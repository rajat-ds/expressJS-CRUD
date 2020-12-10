const express = require("express");
const router = express.Router();
const members = require("../../Members");
const uuid = require("uuid");
//gets all members
router.get("/", (req, res) => res.json(members));

//Get single memeber
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `no member with the id of ${req.params.id}` });
  }
});

//Create Member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "please include a name and email" });
  }

  members.push(newMember);
  res.json(members);
});

//Update Member
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    const updMeber = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMeber.name ? updMeber.name : member.name;
        member.email = updMeber.email ? updMeber.email : updMeber.email;
        res.json({ msg: "Member Updated", member: member });
      }
    });
  } else {
    res.status(400).json({ msg: `no member with the id of ${req.params.id}` });
  }
});

router.get("/", (req, res) => res.json(members));

//delete member
router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json({
      msg: "Member Deleted",
      members: members.filter(
        (member) => member.id !== parseInt(req.params.id)
      ),
    });
  } else {
    res.status(400).json({ msg: `no member with the id of ${req.params.id}` });
  }
});

module.exports = router;
