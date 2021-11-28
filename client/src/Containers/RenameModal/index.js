import {Modal,Button} from "react-bootstrap";
import {useState} from "react";
import  './index.css';
import Axios from "axios";

const RenameModal=(props)=>{
    
    const [ModalState,setState]= useState(false);
    const currName=props.currColl;
    console.log(currName)
    const [newName,setName]=useState("");
    const uid=localStorage.getItem('UserID');

    const updateCollName=async ()=>{
     
       await Axios.post('http://localhost:3004/updateCollName',{uid,currName,newName}).then(
           res=>{console.log(res.data);
           setState(false);
           
           props.changeStatus(!props.collStatus);
        }
       ).catch((err)=>{console.log(err)});
    }
       

    return (<>
     
     <div>
       <Button onClick={()=>setState(true)} >
           Rename
        </Button> 

        <Modal show={ModalState} onHide={()=>setState(false)}>
        <Modal.Body>
            <form className="collnameForm">
        
          <p className="modalHeading">Collection's new name:</p>
          <input type="text" className="forminput" onChange={(e)=>setName(e.target.value)} />
          <Button className="modalbtn" onClick={()=>updateCollName()}>
              Change 
          </Button>
        
        <Button className="modalbtn" onClick={()=>setState(false)}>
            Cancel
        </Button>
        
        </form>
        </Modal.Body>

        </Modal>
     </div>

    </>);

}

export default RenameModal;