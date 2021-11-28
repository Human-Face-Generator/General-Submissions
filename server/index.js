import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import crypto from "crypto";
import passport from "passport";
import cookieSession from "cookie-session";

import  "./Connection/mongodb.js";// must be called before others 
import {upload,gfs,gridFSBucket} from "./Connection/multer_GridFS.js";
import "./passport-config.js";
import SignupModel from "./models/Signup.js";
import SavedImagesModel from "./models/SavedImages.js";
import tokenModel from "./models/userToken.js";
import RandomImgModel from "./models/RandomImages.js"
import sendEmail from "./utils/Email.js";


const app=express();
app.use(express.json());
app.use(cors());

app.use(cookieSession({
    name: 'hfg-session',
    keys: ['key1', 'key2']
  }))
   
app.use(passport.initialize());
app.use(passport.session());

const addNewUser=async ({req,res})=>{
    try{       
    const username=req.body.username;
    const email=req.body.email;
    const password=req.body.password;
    var exit=false;
    var user= await SignupModel.findOne({email});  
     if(user)
      {  exit=true;
          res.send("User with this email-id already exists!");        
      }
      if(exit)
      { return ; }

    const hashedPassword= await bcrypt.hash(password,10);
    const newUser=await new SignupModel({
        username: username,
        email: email,
        password: hashedPassword
    }).save();
   // console.log(newUser)
  
 
      const OTtoken=await new tokenModel({
          user_id:newUser._id,
          token:crypto.randomBytes(32).toString("hex")
      }).save();

      const link=`http://localhost:3004/user-verification/${newUser._id}/${OTtoken.token}`;
      const message=`Hello ${newUser.username},Hello and welcome to Human Face Generator.\n
      Please Click ${link} to verify your account `;

    var mailResponse= await sendEmail(email,"Please verify your Email-account",message);
    console.log(mailResponse)
    if(mailResponse === "email sent successfully")
    {       //console.log("hello")
        res.send(mailResponse);
    }
   
    if(mailResponse === "email sent successfully")
    {       //console.log("hello from here also")
         setTimeout(async ()=>{
             user=await SignupModel.findOne({_id:newUser._id});// obtaining doc again from db
              if(user.status === 'pending')
              {   console.log("user deleted")
                await tokenModel.deleteOne({_id:OTtoken._id});
                await SignupModel.deleteOne({_id:user._id});
                //res.send("Hey, you have not confirmed your account. Click here to retry")
              }
         },600000)
    } 
    else
    {
        res.send("Something went wrong, please try again");
    }
     
}

      catch(err)
      {
          console.log(err)
      }   
}

const checkLoginData=async ({req,res})=>{
    const email=req.body.email;
    const password=req.body.password;
    var message=""; 
    var uid="";
    try
   {
       const user= await SignupModel.findOne({email:email},{password:1,_id:1});
    if(user)
    {
        const hashedPassword=user.password;
               await bcrypt.compare(password,hashedPassword).then(
                   response=>{
                       if(response)
                       {
                        message="Valid User";  
                        uid=user._id;
                       }
                        else
                        { 
                            message="InValid password";  
                        }
                   }
               )
    }
    else
    {
       message="Please enter a valid email-id";
    }        
    //console.log(message);       
      res.send({message,uid});// error could be here}
}
      catch(err)
      {
          res.send(err)
      }
}

const addCollection=async({req,res})=>{
    const collName=req.body.collName;
    const uid=req.body.uid;
    
    console.log(req.body)
    const newColl={
        listName:collName,
        list:[]
    };
  
   await SavedImagesModel.countDocuments({_id:uid}).
   then(async (count)=>{
       if(count === 0)
       {
          // new document     
           const new_doc=new SavedImagesModel({_id:uid,
            lists:[newColl]
           });
       
            await new_doc.save().
            then(result=>res.send("new doc added")).
            catch(err=>console.log(err))
   
       }
       else
       {
         
   //if user doc already exists
    await SavedImagesModel.findByIdAndUpdate(uid,{$push:{lists:newColl}}).
    then((result)=>{
     res.send("doc updated");}).
       catch((err)=>{console.log(err)});

       }
   }).
   catch(err=>console.log(err))
  
}

const deleteCollection=async ({req,res})=>{
    const coll=req.body.collection;
    const uid=req.body.uid;
    await SavedImagesModel.findByIdAndUpdate(uid,{$pull:{lists:{listName:coll}}}).
    then( result=>res.send("ok")
    ).catch((err)=>console.log(err));
    
}

const getImages=async ({uid,res})=>{
    
    await SavedImagesModel.findOne({_id:uid}).then(
        (doc)=>{ 
            if(doc)     
         {//console.log(doc);
        res.send(doc);}
        else
        {
            res.send("Empty List");
        }
        }
    ).catch(err=>console.log(err));
}

const uploadTodb=async ({req,res,uid})=>{ // has to be modified
    const filename=(req.file.filename)
    // console.log("in uploadTodb fxn")
    // console.log(req.data)
    
    const new_img={img_name:"Imagexyz",img_url:filename};
    const query= {$push:{'lists.$.list':new_img}};

    await SavedImagesModel.updateOne({_id:uid,'lists.listName':'DefaultList'},
       query).then(
        (result)=>{
            res.send("ok");
        }
    ).catch((err)=>{console.log(err)})
}

const uploadRandomImages=async ({req,res})=>{
    const files=req.files;
    //console.log(files.length);
    try{
    var i=0;
    for(i;i<files.length;i++)
    {
      const filename=  files[i].filename;
      const RandomImg=await new RandomImgModel({imgURL:filename}).save();
    }
    res.send("Random images uploaded successfuly");
}
    catch(err)
    {
        console.log(err);
    }
}

const showImage=async ({res,imgurl})=>{
   // console.log(imgurl);
  
       await gfs.files.findOne({filename:imgurl}).
        then((file)=>{
            if(!file || file.length === 0)
            {
                res.send("one of the image not present");
            }
            else
            {  //console.log(file);
                const readStream = gridFSBucket.openDownloadStream(file._id);
                readStream.pipe(res);              
            }
            }
        ).catch((err)=>{console.log(err)})
}

const addNewImage=async ({req,res})=>{
    const collName=req.body.collName;
    const imgURL=req.body.imgURL;
    const imgName=req.body.imgName;
    const uid=req.body.uid;

    const new_img={img_name:imgName,img_url:imgURL};
    const query= {$push:{'lists.$.list':new_img}};

    await SavedImagesModel.updateOne({_id:uid,'lists.listName':collName},
       query).then(
        ()=>{
            res.send("image added to new collection successfuly");
        }
    ).catch((err)=>{console.log(err)})

}

const deleteImage=async ({req,res})=>{
    const collName=req.body.collName;
    const imgURL=req.body.imgURL;
    const imgName=req.body.imgName;
    const uid=req.body.uid;

    const img={img_name:imgName,img_url:imgURL};
    const query= {$pull:{'lists.$.list':img}};

    await SavedImagesModel.updateOne({_id:uid,'lists.listName':collName},
       query).then(
        ()=>{
            res.send("image removed from current collection successfuly");
        }
    ).catch((err)=>{console.log(err)})

}

const CollectionList=async ({uid,collName,res})=>{
    await SavedImagesModel.findOne({_id:uid,'lists.listName':collName},"lists.$").then(
     (obj)=>{
         res.send(obj.lists[0]);
     }
    ).catch(err=>console.log(err))
}

const verifyEmailLink=async ({uid,tokenId,res})=>{
    try{
    const user=await SignupModel.findOne({_id:uid});
    if(!user)
    {    
        res.send("Invalid Link");
    }
    else
    {
        const checkToken=await tokenModel.findOne({user_id:uid,token:tokenId});
        if(!checkToken)
        {   
            res.send("Invalid Link");
        }
        else
        {   user.status="active";
           await user.save();
           await tokenModel.deleteOne({_id:checkToken._id});
             // creating default collection for new user
             const newColl={
                listName:"DefaultList",
                list:[]
            }; 
            await new SavedImagesModel({_id:uid,
                lists:[newColl]
                   }).save();
           
            res.redirect(`http://localhost:3000/user/${user._id}`);
        }
    }
}
      catch(err)
      {
          console.log(err);
      }
}

const getRandomImages=async (res)=>{

    try{
    
      var list= await RandomImgModel.find({},{imgURL:1,_id:0});
       //console.log(list)
       res.send(list);
    }
    catch(err)
    {
        console.log(err);
    }
}

const listenToGoogleCallback=async (req,res)=>{
    const google_id=req.user.id;
      console.log(google_id)
     const user= await SignupModel.findOne({google_id},{_id:1});
     const uid=user._id;

   const isnewuser= await SavedImagesModel.findOne({_id:uid});
   
   if(!isnewuser)
   {  const newColl={
        listName:"DefaultList",
        list:[]
    }; 
    await new SavedImagesModel({_id:uid,
        lists:[newColl]
           }).save();
    }

    res.redirect(`http://localhost:3000/user/${uid}`);
}

const listenTofbCallback=async (req,res)=>{
    const facebook_id=req.user.id;
      //console.log(facebook_id)
     const user= await SignupModel.findOne({facebook_id:facebook_id},{_id:1});
     const uid=user._id;

   const isnewuser= await SavedImagesModel.findOne({_id:uid});
   
   if(!isnewuser)
   {  const newColl={
        listName:"DefaultList",
        list:[]
    }; 
    await new SavedImagesModel({_id:uid,
        lists:[newColl]
           }).save();
    }

    res.redirect(`http://localhost:3000/user/${uid}`);
}


const listenToTwitterCallback=async (req,res)=>{
    const twitter_id=req.user.id;
    
     const user= await SignupModel.findOne({twitter_id},{_id:1});
     const uid=user._id;

   const isnewuser= await SavedImagesModel.findOne({_id:uid});
   
   if(!isnewuser)
   {  const newColl={
        listName:"DefaultList",
        list:[]
    }; 
    await new SavedImagesModel({_id:uid,
        lists:[newColl]
           }).save();
    }

    res.redirect(`http://localhost:3000/user/${uid}`);
}

const updateCollName=async (req,res)=>{
      const uid=req.body.uid;
      const currName=req.body.currName;
      const newName=req.body.newName;
      
   try{
    const doc=await SavedImagesModel.findOne({_id:uid,'lists.listName':currName},"lists.$");
    console.log(doc);
    const newColl={
        listName:newName,
        list:doc.lists[0].list
    };
    await SavedImagesModel.findByIdAndUpdate(uid,{$pull:{lists:{listName:currName}}});
    await SavedImagesModel.findByIdAndUpdate(uid,{$push:{lists:newColl}});
    res.send("coll name updated");}
    catch(err)
    { console.log(err)}
}

// adding New User info to database
app.post("/signupInfo",async (req,res)=>{
    await addNewUser({req,res});   
 });

// Checking login info 
app.post("/LoginInfo", async (req,res)=>{
    await checkLoginData({req,res});
});

// adding new collection
app.post("/addnewcollection",async (req,res)=>{
    await addCollection({req,res});       
});

// delete collection
app.post("/deleteCollection",async (req,res)=>{
      await deleteCollection({req,res});
});

// adding new image to collection
app.post("/addImage",async (req,res)=>{
     await addNewImage({req,res});
})

// remove image from collection
app.post("/removeImage",async (req,res)=>{
    await deleteImage({req,res});
})

// getting saved images
app.get("/ImageLists/:uid", async (req,res)=>{
    const uid=req.params.uid;
    await getImages({uid,res});  
  }); 

// uploading user images to default list as of now
app.post(`/upload/:uid`,upload.single("savedimg"),async (req,res)=>{
    const uid=req.params.uid;
   await uploadTodb({req,res,uid});
});

//uploading random images to db
app.post('/uploadRandomImgs',upload.array('randomImages',10),async(req,res)=>{
   await uploadRandomImages({req,res});
});

//display requested image
app.get("/obtain-images/:filename",async (req,res)=>{
    const imgurl=req.params.filename;
    await showImage({res,imgurl});  
});

// obtain collection imageslist
app.get("/collection-imageList/:uid/:collname",async (req,res)=>{
    const collName=req.params.collname;
    const uid=req.params.uid;
    await CollectionList({uid,collName,res});
});

// verifying email link of user
app.get("/user-verification/:uid/:token",async (req,res)=>{
    const uid=req.params.uid;
    const tokenId=req.params.token;
    await verifyEmailLink({uid,tokenId,res});
});

// random images created by site till now
app.get("/obtain-Random-images",async(req,res)=>{
    await getRandomImages(res);
});

// we will be directing user to /google for authentication
app.get('/auth/google', passport.authenticate('google', { scope: ['profile','email'] }));

// after authentication google will call this uri
app.get('/auth/google/callback',  passport.authenticate('google',
 { failureRedirect: 'http://localhost:3000/login' }),
  async (req, res) =>await listenToGoogleCallback(req,res));

// fb authentication
app.get('/auth/fb', passport.authenticate('facebook',{ scope:['email']})); // scope is imp here,eg. profile is not an option here

// Facebook will call this URL after approval.  
app.get('/auth/fb/callback',passport.authenticate('facebook',
 { failureRedirect: 'http://localhost:3000/login' }),
 async (req,res)=>await listenTofbCallback(req,res));

// twitter authentication
app.get('/auth/twitter', passport.authenticate('twitter',{scope:['email']}));

// twitter will call this URL after approval.  
app.get('/auth/twitter/callback', passport.authenticate('twitter',
 { failureRedirect: 'http://localhost:3000/login' }),
 async (req,res)=>await listenToTwitterCallback(req,res));

// update coll name 
app.post('/updateCollName',async (req,res)=>{
    await updateCollName(req,res);
})


app.listen(3004,()=>{
    console.log("Server running at 3004");
});