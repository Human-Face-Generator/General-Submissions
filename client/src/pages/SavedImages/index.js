import './SavedImages.css';
import classes from "./Modal.module.css" ;
import {useState,useEffect} from "react";
import {useHistory,Redirect} from "react-router";
import Axios from 'axios';
import {Button} from "react-bootstrap";
import deleteIcon from "./images/deleteIcon.png";
import smileIcon from './images/smileIcon.png';
import Modal from './Modal' ;

const SavedImages=()=>{
    
   const [ImageLists,setLists] = useState([]);
   const [listNames,setNames]=useState([]);// for next page, to avoid another call to db
   const [addlist,setaddlist]=useState(false);
   const [newCollname,setcollname]=useState("");
   const [colldeleted,setdelstatus]=useState(false);
   const history=useHistory();
   const UserID=localStorage.getItem('UserID');
   console.log(UserID);
   
   const [modalState, setModalState] = useState({modal: false, curName: ""}) ;
   const [currList, setCurrList] = useState({}) ;

   const addCollName= ()=>{

      console.log("coll name obtained");
      console.log(newCollname)
      Axios.post("http://localhost:3004/addnewcollection",{collName:newCollname,uid:UserID}).then(
         (res)=>{
            console.log(res.data)
            if(res.data==="new doc added" || res.data==="doc updated")
            {   
                 setaddlist(!addlist);
            }
         }
      ).catch((err)=>{console.log(err)});
   }

   const deleteColl=(collname)=>{
      console.log(collname);
      Axios.post("http://localhost:3004/deleteCollection",{collection:collname,uid:UserID}).then(
         (res)=>{
            if(res.data==="ok")
            {setdelstatus(!colldeleted);}
         }
      ).catch(err=>console.log(err))

   }

useEffect( ()=>{
       if(!UserID){return ;}
         Axios.get(`http://localhost:3004/ImageLists/${UserID}`).then((imgobj)=>{ 
            if(imgobj.data==="Empty List")  
            {
                  console.log(imgobj.data);
            }    
            else   
         {var data=imgobj.data.lists;// array of lists
          // console.log(data);
           let names=[];
   data.map(list=>names.push(list.listName));
           setNames(names);
        
            setLists(data); }                
     }).catch((err)=>{console.log(err)});
  
},[addlist,colldeleted])


const changeListName = (inputName) => {
   const i = ImageLists.findIndex(o => o.listName===modalState.curName) ;
   
   let newArr = [...ImageLists] ;
   newArr[i].listName = inputName ;
   
   setLists(newArr) ;
   listNames[i] = inputName;

   hideModalHandler(false) ;
}

const showModalHandler = (p) => {
   setModalState({modal: true, curName: p}) ;
}

const hideModalHandler = () => {
   setModalState(false) ;
}

    return (
        <>
        {!UserID ?
        <div className="getUserLoggedin">
       Hey please login and lets start by making some awesome collections
      <br/><br/>  <img className="smileicon" src={smileIcon}/>
        </div>:
        <div className="bgsetup">
        <div className="savedImages">

            <div className="headingSI">
            <p >Organize your saved photos here</p>
            </div>
           
            <div className="listNames">
             {/* <p>Your Gallery</p><br/> */}
            { ImageLists && ImageLists.map((list,idx)=>{
               return (
                  <div className="listItem" key={idx}>
                  <p id="selectedList" onClick={()=>{
            history.push( {pathname:"/listImages",state:{images:list,allListNames:listNames}} );
                  }}>
                  {list.listName}
                  </p>
                  {/* <a href="" onClick={showModalHandler}>Rename</a> */}
            
                  
                  <div>
                    <button 
                     className="box btnn"
                     onClick={() => showModalHandler(list.listName)
                    }>
                     Rename
                    </button>
                    <img className="deleteicon" src={deleteIcon} onClick={()=>deleteColl(list.listName)}/>

                  </div>

                  {modalState.modal && 
                     <Modal 
                     current={modalState.curName}
                     changeListName={changeListName}
                     onClose={hideModalHandler}  
                  />}
                             
                  </div>
               )
            })}
            
            

           </div>
           <br/>

           <div >
               { addlist ?
               <div className="newlist">
               <input className="forminput" id="fi" type="text"
               placeholder=" Your Collection name" 
               onChange={(e)=>{setcollname(e.target.value)}}
               />
               <Button className="addlistbtn" onClick={()=>addCollName()}>
                  Create</Button>
               <Button className="addlistbtn" onClick={()=>setaddlist(!addlist)}>
               Cancel</Button>
               </div>
               :
               <Button onClick={
                  ()=>{ setaddlist(!addlist);}
               }>Create a new Collection</Button>} 
         </div>


        </div>
        <br/>
       </div>}
        </>
    );
}

export default SavedImages;