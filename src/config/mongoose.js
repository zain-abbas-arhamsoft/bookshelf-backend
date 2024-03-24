const mongoose = require("mongoose");
// const { mongo, env } = require("./var");

// exit application on error
mongoose.connection.on("error", (err) => {
  process.exit(err);
});

//  print mongoose logs in dev env
if ("development" === "development") {
  mongoose.set("debug", true);
}

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */
exports.connect = () => {
  mongoose.connect('mongodb+srv://zainabbaskhakhi123:xDCXRq0Jm71gC9PF@bookshelf.8oe1bor.mongodb.net/').then(() => console.log("Mongodb Connected!"));

  return mongoose.connect;
};
