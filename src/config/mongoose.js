const mongoose = require("mongoose");
const { mongo, env } = require("./var");
// exit application on error
mongoose.connection.on("error", (err) => {
  process.exit(err);
});

if (env === "development") {
  mongoose.set("debug", true);
}

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */
exports.connect = () => {
  mongoose
    .connect(mongo.mongoUri)
    .then(() => console.log("Mongodb Connected!"));

  return mongoose.connect;
};
