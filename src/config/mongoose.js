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
  mongoose.connect('mongodb://127.0.0.1:27017/bookshelf').then(() => console.log("Mongodb Connected!"));

  return mongoose.connect;
};
