import { useEffect, useState } from "react";
import  "./index.css";
import addList from "./images/addList.png";
import { Dropdown } from "react-bootstrap";
import Axios from "axios";
import deleteIcon from "../../pages/SavedImages/images/deleteIcon.png";
import downloadIcon from "./images/downloadIcon.png";
const ImageCard=(props)=>{

    const [imgURL,seturl]=useState("");
    const [imgName,setname]=useState("");
    const currlist=props.currlist;
    const currImgName=props.img_name;
    const listNames=props.listNames;
    const filename=props.filename;
    const UserID=localStorage.getItem('UserID');
   // console.log(currlist);
    //console.log(listNames)
    
    const moveImage=async (newList)=>{
         //console.log(newList)
         const postData={uid:UserID,collName:newList,imgName:currImgName,imgURL:filename};
         //console.log(postData);

        await Axios.post("http://localhost:3004/addImage",postData).then((res)=>{
           console.log(res)
           //console.log("in image card")
        }).catch((err)=>{console.log(err)});
        
        postData.collName=currlist;// image to be deleted from curr collection
        await Axios.post("http://localhost:3004/removeImage",postData).then((res)=>{
           console.log(res);
           props.setToggling(!props.listToggle);// re-rendering the list of images
        }).catch((err)=>{console.log(err)});     
    }
    
    const deleteImage=async ()=>{
        const postData={uid:UserID,collName:currlist,imgName:currImgName,imgURL:filename};

        await Axios.post("http://localhost:3004/removeImage",postData).then((res)=>{
            console.log(res);
            props.setToggling(!props.listToggle);// re-rendering the list of images
         }).catch((err)=>{console.log(err)}); 
    }
    
    const downloadImg=async ()=>{
        const image = await fetch(imgURL);// NOT same as Axios.get(imgURL)
        const imageBlob = await image.blob()
        //console.log(imageBlob)
        const imageURL = URL.createObjectURL(imageBlob)
        const link = document.createElement('a')
        link.href = imageURL
        link.download = `${currImgName}`+'.jpg';
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    
    useEffect(()=>{
        seturl(props.img_url);
        setname(props.img_name);
    },[])
    return (
        <>
        <div className="cardContainer">

       {!props.img_url?<p>loading...</p> :<img className="cardimg" src={imgURL}/>}
    
        <div className="cardFooter">

       <p><em>{imgName}</em></p>
        <Dropdown className="move" >

          <Dropdown.Toggle variant="" className="listIcon" >
          <img  className="listIcon" src={addList}/>
          </Dropdown.Toggle>
          
         <Dropdown.Menu className="listmenu">
          
            { listNames.map((listName, idx)=>{
                return(
                    <div key={idx}>
                     {listName !== currlist && 
                      <Dropdown.Item className="menuitem" 
                      onClick={async ()=>{
                          await moveImage(listName)
                          }}>
                          {listName}
                      </Dropdown.Item>}
                    </div>
                )
            })}
          
         </Dropdown.Menu>

       </Dropdown>
         
      
    
        
       
        <img className="ImgIcon" src={downloadIcon}
         onClick={async ()=>await downloadImg()}/> 
        
         <img className="ImgIcon" src={deleteIcon} 
              onClick={async()=>await deleteImage()}
         />
        
        </div>
        </div>
        </>
    );
}

export default ImageCard;