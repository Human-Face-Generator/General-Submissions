import mongoose from "mongoose";
const mongoUsername=process.env.DB_USER;
const mongoPassword=process.env.DB_PASS;
const mongoURI=`mongodb+srv://${mongoUsername}:${mongoPassword}@hfg.prgke.mongodb.net/HFG?retryWrites=true&w=majority`;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }).
then(()=>console.log("connected")).catch(err=>console.log(err));
