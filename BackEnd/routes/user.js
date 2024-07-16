const express = require("express");
const router = express.Router();
const zod = require("zod");
const jwt = requre("jsonwebtoken");
const { User } = require("../db");
const JWT_SECRET = require("../confing");
const { authMiddleware } = require("../middleware");
// router.use("/user", userRouter);

const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupSchema.safeParse(body);
  if (!success) {
    return res.json({
      msg: "Email is already taken / Invalid Inputs",
    });
  }

  const user = User.findOne({
    username: body.username,
  });

  if (user._id) {
    return res.json({
      msg: "Email is already taken / Invalid Inputs",
    });
  }

  const createUser = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  const userId = user._id;
  const token = jwt
    .sign(
      {
        userId,
      },
      JWT_SECRET
    )
    .then(res.json({ msg: "user created successfully", token: token }))
    .catch((err) => {
      msg: "some error occured at the end", err;
    });
});

//creating the signin route with the schema
const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});
router.post("/signin", async (req, res) => {
  const { success } = signinSchema.safeParse(req.body);
  if (!success) {
    return res.json({
      msg: "Invalid Inputs",
    });
  }

  const theUser = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  if (theUser) {
    const token = jwt
      .sign(
        {
          userId: User._id,
        },
        JWT_SECRET
      )
      .then((token) => {
        res.json(token);
      });
  }
});

const updateUserSchema = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateUserSchema.safePareser(req.body);
  if (!success) {
    return res.status(411).json({
      msg: "error while updating your information maybe check your username and passoword once again",
    });
  }

  await User.updateOne({ _id: req.userId }, req.body).then(
    res.json({
      msg: "your information is successfully updated in the system",
    })
  );
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });
});

module.exports = router;
