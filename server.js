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

app.set("view engine", "ejs");
app.use(express.static("views"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("login");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/formsubmit", (req, res) => {
  const data = new dbWaleBhiya(req.body);
  data.save();
  res.render("gone");
});

app.post("/login", async (req, res) => {
  const data = req.body;
  const user = await dbWaleBhiya.find({ email: data.email });
  console.log(user);
  //Authentication code
  if (user.length > 0) {
    //authorisation code
    if (data.pass == user[0].pass && data.email == user[0].email) {
      res.render("welcome", {name: user[0].name});
    } else {
      res.send(`Sir ji ${user[0].pass} galat password hai app kon hai 😡`);
    }
  } else {
    res.send("user not exist");
  }
});

//Delete your data
app.post("/delet_data", async (req, res) => {
  const data = await req.body;
  console.log(data.username);  
  const user = await dbWaleBhiya.find({username: data.username}) //Find to match the pass
  if (user[0].pass == data.pass){  //Pass. match
    await dbWaleBhiya.findOneAndDelete({username: data.username}) // Find again and Delete it
    res.send('account deleted sorry to see you go')
  } else {
    res.send('err aagya')
  }
});

app.post("/update_data", async (req, res) => {
  const data = await req.body;
  const user = dbWaleBhiya.find({email: data.email}) //Find to match the pass
  if (user[0].pass == data.pass){  //Pass. match
    dbWaleBhiya.findOneAndUpdate({username: data.username}) // Find again and Delete it
    res.send("Data is Updated....!")
  }else {
    res.send("Bhiya kon hai App.....!")
  }
});



app.listen(3000, () => {
  console.log("server is running");
});
