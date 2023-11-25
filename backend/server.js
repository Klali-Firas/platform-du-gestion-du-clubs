const express = require("express");
const cors = require("cors");
const app = express();
const authRouter = require("./app/routes/clubAuth.router");
const serviceRouter = require("./app/routes/service.router");
const jwtVerifier = require('./app/middlewares/authenticateToken');
const db = require("./app/models");
const config = require('./app/config/db.config');
var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to firas and raslen's application." });
});

app.use("/api/auth", authRouter);
app.use("/api/service", jwtVerifier, serviceRouter);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


db.mongoose
  .connect(config.ConnectionString)
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    // initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });




// async function initial() {
//   try {
//     const count = await Role.estimatedDocumentCount();
//     if (count === 0) {
//       await Promise.all([
//         new Role({ name: "user" }).save(),
//         new Role({ name: "moderator" }).save(),
//         new Role({ name: "admin" }).save()
//       ]);

//       console.log("Roles added to the roles collection");
//     }
//   } catch (err) {
//     console.error("Error initializing roles:", err);
//   }
// }

