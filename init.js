const mongoose = require("mongoose");
const chat = require("./models/chat.js");

main().then(()=>{console.log("connection was succcessful....")}).catch(err => {console.log(err);});

async function main() {
    mongoose.connect("mongodb://127.0.0.1:27017/whatsapp"); 
}

let allchats = [
    {
        from: "naruto",
        to: "obito",
        msg: "You are my friend...",
        created_at: new Date("2025-09-09T10:00:00Z")
    },
    {
        from: "sasuke",
        to: "naruto",
        msg: "I will surpass you!",
        created_at: new Date("2025-09-09T10:05:00Z")
    },
    {
        from: "kakashi",
        to: "team7",
        msg: "Meet me at the training ground.",
        created_at: new Date("2025-09-09T10:10:00Z")
    },
    {
        from: "sakura",
        to: "naruto",
        msg: "Don’t be reckless!",
        created_at: new Date("2025-09-09T10:15:00Z")
    }
];

chat.insertMany(allchats);