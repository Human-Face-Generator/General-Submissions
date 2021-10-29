import mongoose from "mongoose";
const mongoURI="mongodb+srv://Stark:stark123@hfg.prgke.mongodb.net/HFG?retryWrites=true&w=majority";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }).
then(()=>console.log("connected")).catch(err=>console.log(err));
