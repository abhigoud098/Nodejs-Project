import express from "express";
import mongoose from "mongoose";

const app = express();

await mongoose.connect(
  "mongodb+srv://abhigoud198484:snapcode09@cluster0.hkwptbc.mongodb.net/clintData"
);

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  pass: String,
  ph: Number,
});

const dbWaleBhiya = mongoose.model("user", userSchema, "information");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile("/login.html", { root: "public" });
});
app.get("/signup", (req, res) => {
  res.sendFile("/signup.html", { root: "public" });
});

app.post("/formsubmit", (req, res) => {
  const data = new dbWaleBhiya(req.body);
  data.save();
  res.sendFile("/gone.html", {root: 'public'});
});
app.post("/login", async (req, res) => {
  const data = req.body;
  const user = await dbWaleBhiya.find({email :  data.email})
  console.log(user)
  //Authentication code
  if (user.length > 0){
    //authorisation code
    if (data.pass == user[0].pass && data.email == user[0].email){
        res.send(`aap a skte hain janab ji aayiye aap ka intjaar tha. aapka naam ${user[0].name} hai na? welcome! ☺️`);
    } else {
        res.send(`Sir ji ${user[0].pass} galat password hai app kon hai 😡`);
    }
  } else{
    res.send('user not exist')
  }

});

app.listen(3000, () => {
  console.log("server is running");
});