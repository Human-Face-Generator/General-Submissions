import React, { useState,useEffect } from "react";
import "./index.css";
import Axios from "axios";
import ImageCard from "../../Components/ImageCard";

const ListImages=(props)=>{
    const [imgobjs,setImgobjs]=useState([]);//array of image objects   
    const [file,setfile]=useState(null);
    const [listToggle,setToggling]=useState(false);// image moved from curr list to another
    // hence imgobjs needs to be updated
    const currentList=props.location.state.images.listName;
   const allListNames=props.location.state.allListNames;
   

  const sendfile=async()=>{
    const formdata = new FormData();
    formdata.append("sampleimg",file);
    console.log(formdata);
   await Axios.post("http://localhost:3004/upload",formdata).then((res)=>console.log(res)).catch(err=>console.log(err))
}

    useEffect(async()=>{
        const imglist=props.location.state.images.list;
        setImgobjs(imglist);
        //console.log(imglist)
    },[props.location.state.images.list]);

    useEffect(async()=>{
      await Axios.get(`http://localhost:3004/collection-imageList/${currentList}`)
      .then(obj=>{//console.log(obj);
        setImgobjs(obj.data.list);
      })
      .catch(err=>console.log(err))
    },[listToggle])

    return (
        <> 
        <div className="collImages">
        <p className="listName">{currentList}</p><br/>
          <div className="ListContainer">
              
              {imgobjs && imgobjs.map((imgobj,idx)=>{
                  return (
                      <div key={idx}>

                          <ImageCard 
                          img_url={`http://localhost:3004/obtain-images/${imgobj.img_url}`}
                          img_name={imgobj.img_name}
                          currlist={currentList}
                          listNames={allListNames}
                          filename={imgobj.img_url}
                          listToggle={listToggle}
                          setToggling={setToggling}
                          />

                     </div>
                  )
              })}
 
         </div>
         <input type="file" name="sampleimg" onChange={(e)=>setfile(e.target.files[0])}/>
<button onClick={()=>sendfile()}>send</button>
       </div>
        </>
    );
}

export default ListImages;
