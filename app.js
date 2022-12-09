const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require('mongoose');
const { response } = require("express");
const app =express();
mongoose.connect("mongodb+srv://shubham007:testdb@cluster0.nuzfjej.mongodb.net/?retryWrites=true&w=majority/To_Do_V2",{useNewUrlParser:true});

var items=[];
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

//database schema and model
const itemSchema=mongoose.Schema({
    name:String
});
const Item=mongoose.model("Item",itemSchema);
const item=new Item({
    name:"Sting !!"
});
// Item.insertMany([item],function(err){
//     if(err)
//     console.log("err"+err);
//     else
//     console.log("Insertion successful !!! ");
// })
app.get("/",function(req,res){
    //-------------------------------------------------------------------------------//
    const today =new Date();
    var options=
    {
        weekday:"long",
        month:"long",
        day:"numeric",
        year:"numeric"
    };

    var day=today.toLocaleDateString("hi",options);
    //-------------------------------------------------------------------------------//
    Item.find({},function(err,foundItem){
        if(foundItem.length===0)
        {
            Item.insertMany([item],function(err){
            if(err)
            console.log("err"+err);
            else
            console.log("Insertion successful !!! ");
});
// res.redirect("/");
        }
        else{

            res.render("index",{Day:day,newItems:foundItem,items});
        }
    })



})
app.post("/",function(req,res)
{
    const itemName=req.body.inp
    // console.log(item);
    // items.push(item);
    // res.render("index",{newItem:items});
    const item=new Item({
        name:itemName
    });
    item.save();
    res.redirect("/");
    
})
const port=3000
app.listen(port,function(){

    console.log("server is running and up my darling 💕 on the port"+port);
})