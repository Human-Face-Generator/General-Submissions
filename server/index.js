const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const SignupModel=require("./models/SignupModel");
const SavedImagesModel=require("./models/SavedImagesModel");

mongoose.connect("mongodb+srv://Stark:stark123@hfg.prgke.mongodb.net/HFG?retryWrites=true&w=majority",
 { useNewUrlParser: true },{ useUnifiedTopology: true }, );

const app=express();
app.use(express.json());
app.use(cors());



// adding New User info to database
app.post("/signupInfo",async(req,res)=>{

    console.log("in post");
    const username=req.body.username;
    const email=req.body.email;
    const password=req.body.password;
 
    const newUser=new SignupModel({
        username: username,
        email: email,
        password: password
    });

    try{
          await newUser.save();
          console.log("New User added");
    }
    catch(err)
    {
        console.log(err);
    }

});



// Checking login info 
app.post("/LoginInfo",async (req,res)=>{

    const email=req.body.email;
    const password=req.body.password;
    var message=""; 

    await SignupModel.find({email:email,password:password},(err,result)=>{
          console.log("**********************");
       
        if(err)
        {
            message="An error occured";
        }
        else if(result.length === 0)
        {  
            message="Either email or password is not correct";
        }
        else if( result.length === 1)
        {
            message="Valid User";
          
        }      
        console.log(message);    
      res.send(message);

    }).clone().catch((err)=>{console.log(err)});
     // use catch to avoid promise errors/warning

});


// getting saved images
app.get("/ImageLists",async (req,res)=>{

    const uid="6173897315e1bbccd6a0c4f0";

    /*const imgdoc={
        img_url:"https://static.generated.photos/vue-static/face-generator/landing/wall/20.jpg",
        img_name:"random pic",

    };

    const imgdoc2={
        img_url:"https://cdn.pixabay.com/photo/2021/06/04/10/28/portrait-6309448_960_720.jpg",
        img_name:"another random pic"
    }
    const imgList={
        listName:"DefaultList",
         list:[imgdoc,imgdoc2]
    };
    console.log(imgList);
    const new_doc=new SavedImagesModel({_id:uid,
     lists:[imgList]
    });

    await new_doc.save((err,res)=>{
        if(err)
        {console.log(err);}
        else
        {
            console.log("added");
        }    
    });*/

   await SavedImagesModel.findOne({_id:uid},(err,doc)=>{
        if(!err)
        {   console.log(doc);
            res.send(doc);
        }
  
    }).clone().catch((err)=>{console.log(err)});
 
    
})

app.listen(3004,()=>{
    console.log("Server running at 3004");
})