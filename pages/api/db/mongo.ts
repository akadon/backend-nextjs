import mongoose from 'mongoose';
const localUri = process.env.MONGODB_LOCAL_URI as string;
const connection: any = {};
var Schema = mongoose.Schema;


var Users = new Schema({
  title: String,
  description: String,
  published: Boolean
},{ 
  timestamps: true 
});

export const User = mongoose.models.Users || mongoose.model('Users', Users);


export function connectDB() {
  if (connection.isConnected) {
    return;
  }

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      return;
    }
     mongoose.disconnect();
  }

    mongoose.connect(localUri);
    const connectDB = mongoose.connection;
    connectDB.on('error', console.error.bind(console, 'connection error:'));
    connectDB.once('open', function(){
      console.log("Successfully Connected to DB");
    });
    return connectDB;
}

// create
// connectDB()?.once('open', function(){
//   var test = new User({
//     title: "test",
//     description: "tset",
//     published: true
//   });

//   test.save(function (err:any, users:any) {
//     console.log("create"+users);
//   })
// })

// read
// connectDB()?.once('open', function(){
//   User.find({title: { $regex: new RegExp("test") }},{},function (err:any, users:any) {
//     console.log("Username supplied"+users);
//   })
//   User.findById("635760f0640d9f5140c92123",{},function (err:any, users:any) {
//     console.log("read"+users);
//   })
// })

// update
// connectDB()?.once('open', function(){
//   User.findByIdAndUpdate("635760f0640d9f5140c92123",{title:"test"},{},function (err:any, users:any) {
//     console.log("update"+users);
//   })
// })

// delete
// connectDB()?.once('open', function(){
//   User.findByIdAndRemove("635760f0640d9f5140c92123",function (err:any, users:any) {
//     console.log("delete"+users);
//   })

//   User.deleteMany({});
// })





//express + api routes
// exports.create = (req, res) => {
  
// };

// // Retrieve all Tutorials from the database.
// exports.findAll = (req, res) => {
  
// };

// // Find a single Tutorial with an id
// exports.findOne = (req, res) => {
  
// };

// // Update a Tutorial by the id in the request
// exports.update = (req, res) => {
  
// };

// // Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {
  
// };

// // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
  
// };

// // Find all published Tutorials
// exports.findAllPublished = (req, res) => {
  
// };
// var router = require("express").Router();

// // Create a new Tutorial
// router.post("/", tutorials.create);

// // Retrieve all Tutorials
// router.get("/", tutorials.findAll);

// // Retrieve all published Tutorials
// router.get("/published", tutorials.findAllPublished);

// // Retrieve a single Tutorial with id
// router.get("/:id", tutorials.findOne);

// // Update a Tutorial with id
// router.put("/:id", tutorials.update);

// // Delete a Tutorial with id
// router.delete("/:id", tutorials.delete);

// // Create a new Tutorial
// router.delete("/", tutorials.deleteAll);