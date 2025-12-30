const express=require("express");
const path=require("path");
const mongoose = require("mongoose");
const chat = require("./models/chat.js");
const methodOverride = require('method-override');

const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));



app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

main().then(()=>{console.log("connection was succcessful....")}).catch(err => {console.log(err);});

async function main() {
    mongoose.connect("mongodb://127.0.0.1:27017/whatsapp"); 
}


app.get("/",(req,res)=>{
    res.send("express is working");
})

app.get("/chats" , async (req,res)=>{
    let allchats = await chat.find();
    console.log(allchats);
    res.render("what.ejs",{allchats});
})

// new route
app.get("/chats/new", async (req, res) => {
    res.render("form.ejs");
})

//edit route
app.get("/chats/:id/edit", async (req, res) => {
    const { id } = req.params;                            // get id from URL
    const chat2 = await chat.findById(id);                // fetch the chat from DB
    if (!chat2) return res.send("Chat not found");        // handle invalid ID
    res.render("edit.ejs", { chat2 });                    // pass chat2 to EJS
});


// create route
app.post("/chats" , (req,res)=>{
    let {from , msg , to}=req.body;
    let newchat =new chat({from :from , msg: msg ,to :to,created_at:new Date()});
    newchat.save().then(data => console.log(data)).catch(err => console.log(err));
    res.redirect("/chats");
})

app.listen(7000,(req,res)=>{
    console.log("server is listening on port 7000");
})


//update route
app.put("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let {msg} = req.body;

    try{
    let updatechat = await chat.findByIdAndUpdate(id , {msg});
    console.log(updatechat);
    res.redirect("/chats");
}catch(err){
    console.log("error in updating chat........");
}
})


//destroy route
app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    try {
        await chat.findByIdAndDelete(id);
        res.redirect("/chats");          // redirect after deletion
        } catch (err) {
            console.log("Error deleting chat:", err);
            res.redirect("/chats"); // redirect even if error occurs
        }
})
