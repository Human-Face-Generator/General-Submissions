import { useEffect, useState } from "react";
import  "./index.css";
import addList from "./images/addList.png";
import { Dropdown } from "react-bootstrap";

const ImageCard=(props)=>{

    const [imgURL,seturl]=useState("");
    const [imgName,setname]=useState("");
    const currlist=props.currlist;
    const listNames=props.listNames;
   // console.log(currlist);
    //console.log(listNames)
    
    const moveImage=(props)=>{
          console.log(props.newList);
    }


    useEffect(()=>{
        seturl(props.img_url);
        setname(props.img_name);
    })
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
                      onClick={()=>moveImage({newList:listName})}>
                          {listName}
                      </Dropdown.Item>}
                    </div>
                )
            })}
          
         </Dropdown.Menu>

       </Dropdown>
        
        </div>
        </div>
        </>
    );
}

export default ImageCard;