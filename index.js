const express=require("express")
const app=express()
const port=8080
const path=require("path")
const { v4: uuidv4 } = require('uuid');
const methodOverride=require("method-override")


app.use(express.urlencoded({extended: true}))//focuse
app.use(methodOverride("_method"))

app.set("view engine","ejs")//focuse
app.set("views",path.join(__dirname,"views"))//focuse

app.use(express.static(path.join(__dirname,"public")))//focuse
//start
let posts=[
        {
                id:uuidv4(),
                username:"Talha",
                content:"I love Law",
        },
        {
                id:uuidv4(),
                username:"safi",
                content:"Im engineer,means nothing"
        },

]
app.get("/posts",(req,res)=>{
        res.render("index.ejs",{posts})//send_=render
})
//for new.ejs
app.get("/posts/new",(req,res)=>{
        res.render("new.ejs")
})
//for new.ejs
app.post("/posts",(req,res)=>{
        let {username,content}=req.body
        let id=uuidv4()
        posts.push({id,username,content})
        res.redirect("/posts")//posts and posts was same thats why we use redirect method in ejs
        // res.send("this request is working properly")
})

app.get("/posts/:id",(req,res)=>{
   let {id}=req.params
   console.log(id)
   let post=posts.find((p) =>id===p.id )
   res.render("show.ejs",{post})
})

app.patch("/posts/:id",(req,res)=>{
        let{id}=req.params
        let newContent=req.body.content
        let post=posts.find((p) =>id===p.id )
        post.content=newContent
        console.log(post)
        res.redirect("/posts")
})

app.get("/posts/:id/edit",(req,res)=>{
        let { id }=req.params
        let post=posts.find((p) =>id===p.id )
        res.render("edit.ejs",{post})
})

app.delete("/posts/:id",(req,res)=>{
        let {id}=req.params
        posts =posts.filter((p) =>id !== p.id )
        res.redirect("/posts")
})

app.listen(port,()=>{
        console.log("listning on: 8080")
})