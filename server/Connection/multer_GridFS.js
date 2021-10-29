import path from "path";
import crypto from "crypto";
import multer from "multer";
import {GridFsStorage} from "multer-gridfs-storage";
import Grid from "gridfs-stream";
import mongoose from "mongoose";
const mongoURI="mongodb+srv://Stark:stark123@hfg.prgke.mongodb.net/HFG?retryWrites=true&w=majority";

                         
// connection for gfs
const conn=mongoose.createConnection(mongoURI);
let gfs;//init gfs
conn.once('open',()=>{
    //init stream
    gfs=Grid(conn.db,mongoose.mongo);
    gfs.collection("uploads");
})


//create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => { // crypto is being used here to generate file name from i/p file
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
const upload = multer({ storage });

export default upload;