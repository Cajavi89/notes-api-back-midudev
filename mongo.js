const mongoose = require("mongoose");

const conectionString = process.env.MONGO_DB_URI;

//conexion a mongodb
mongoose
  .connect(conectionString)
  .then(() => {
    console.log("database conected");
  })
  .catch((error) => {
    console.log(error);
  });
