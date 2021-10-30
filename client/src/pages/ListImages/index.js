import React, { useState,useEffect } from "react";
import "./index.css";
import Axios from "axios";
const ListImages=(props)=>{
    const [imgobjs,setImgobjs]=useState([]);//array of image objects   
//     const [file,setfile]=useState(null);

// const sendfile=async()=>{
//     const formdata = new FormData();
//     formdata.append("sampleimg",file);
//     console.log(formdata);

//    await Axios.post("http://localhost:3004/upload",formdata).then((res)=>console.log(res))

// }

    useEffect(async()=>{
        const imglist=props.location.state.images.list;
        setImgobjs(imglist);
        console.log(imglist)
    },[props.location.state.images.list]);

    return (
        <> 
        <h3>{props.location.state.images.listName}</h3><br/>
          <div className="ListContainer">
              
              {imgobjs && imgobjs.map((imgobj,idx)=>{
                  return (
                      <div key={idx}>
                     <p><img className="listImages" src={`http://localhost:3004/obtain-images/${imgobj.img_url}`}/></p>
                     <p>{imgobj.img_name}</p>
                     </div>
                  )
              })}
 
         </div>
         {/* <input type="file" name="sampleimg" onChange={(e)=>setfile(e.target.files[0])}/>
<button onClick={()=>sendfile()}>send</button> */}

        </>
    );
}

export default ListImages;
