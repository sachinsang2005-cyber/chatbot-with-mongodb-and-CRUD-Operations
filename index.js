const { log } = require("console");
const mongoose=require("mongoose");
const { type } = require("os");
// we import mongoose package from npm i mongoose


main().then( ()=>{
    console.log("connection was successful...");
})
.catch(err => console.log(err));


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');              // this port is reserved for mongoose server
}

// Schema : shape of the documents (table column names)

const user= new mongoose.Schema(
    {
        name : String,
        actor : String,
        episodes : Number
    }
)


// Models : Model in mongoose is class help to construct documents
const anime=mongoose.model("anime", user);

anime.insertMany([{name : "Naruto" , actor:"Naruto Uzuzmaki" ,episodes : 720 },
    { name: "Demon Slayer", actor: "Tannjiro", episodes: 60 },
    { name: "JJK", actor: "Gojo Sotaru", episodes: 48 },
    { name: "solo laveling", actor: "jinwoo", episodes: 24 },
    {name : "death note", actor: "Light Yagami", episodes : 37}
]).then(data => {
    console.log(data[0]);
});

// anime.find({name : "JJK"}).then(data => {console.log(data)})
// .catch(err => {console.log(err)});

anime.findById('68bf4ad22d0eaa4c2193251d').then(data => { console.log(data) })
.catch(err => { console.log(err) });

anime.updateOne({name:"JJK"},{$set : {actor : "sukuna"}}).then(d => {console.log(d)}).catch(err => {console.log(err)});

// anime.updateMany({ name: "JJK" }, { $set: { actor: "sukuna" } }).then(d => { console.log(d) }).catch(err => { console.log(err) });

// anime.find().then(d => { console.log(d) }).catch(err => { console.log(err) });


anime.insertOne({name:"overflow",actor:"okarun",episodes:8}).then(d=>{console.log(d)}).catch(e=>console.log(e));
anime.deleteOne({ name: "overflow"}).then(d => { console.log(d) }).catch(e => console.log(e));



// Schema with validations
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,          // must provide
        minlength: 3,            // minimum length
        maxlength: 50,           // maximum length
        uppercase: true,        
    },
    author: {
        type: String,
        lowercase: true         
    },
    price: {
        type: Number,
        min: 1,                  // minimum value
        max: 1000,               // maximum value
        immutable: true          // once set, cannot change
    },
    category: {
        type: String,
        enum: ["fiction", "non-fiction", "comics"]           // only allowed values
    },
    inStock: {
        type: Boolean,
        default: true            // default value if not provided
    }
});

// Model
const Book = mongoose.model("book", bookSchema);


const movieschema = mongoose.Schema({
    name : {
        type: String,
        required : [true,"you must enter the name of the movie..."]
    },
    price : {
        type : Number,
        min : [100 , "movie is to cheap...."],
        max : [50000 , "download from pirated website...."]
    }
}) 


// custom error msg 
const movie = mongoose.model("movie" , movieschema);

movie.insertMany({name:"aladin"  , price: 50})
.then(data => console.log(data))
.catch(err=> {console.log(err.errors.name?.properties.message);
    console.log(err.errors.price?.properties.message); 
});
// err.errors ---> object of all field errors.
// err.errors.name ---> the error object for the name field
// err.errors.price ---> the error object for the price field


// .properties.message ---> Each field error object has a .properties object:
// .message ---> This contains the custom error message you wrote in your schema

// Optional chaining?. ----> ?. is optional chaining in JS.
// It prevents runtime errors if something is undefined or null.
// If err.errors.name exists → prints the message.
// If err.errors.name does not exist → returns undefined instead of crashing.


// insertOne is not used in Mongoose so use insertMany or create