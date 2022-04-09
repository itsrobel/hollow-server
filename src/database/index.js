//Connect to Mongo database
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

//your local database url
//27017 is the default mongoDB port
const uri = "mongodb://127.0.0.1:27017/chatData";
const options = {
            useCreateIndex: true,
            useNewUrlParser:true,
            useUnifiedTopology:true
}

mongoose
  .connect(uri, options)
  .then(
    () => {
      /** ready to use. the `mongoose.connect()` promise resolves to undefined. */

      console.log("connected to mongo");
    },
    (err) => {
      /** handle initial connection error */

      console.log("error connecting to mongo: ");
      console.log(err);
    }
  );

module.exports = mongoose.connection;
