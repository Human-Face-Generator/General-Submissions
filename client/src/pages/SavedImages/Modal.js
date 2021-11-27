import ModalUI from "../../Components/UI/ModalUI" ;
import classes from "./Modal.module.css" ;
import { useState } from "react";

const Modal = (props) => {
    const [inputName, setName] = useState("") ;
    const [curr, setCurr] = useState(props.current) ;

    const rename = () => {
        const currName = curr ;
        props.changeListName(inputName, currName) ;
    }

    const changeName = (event)=> {
          setName(event.target.value) ;
    } ;

    return (
        <ModalUI onClose={props.onClose}>
            <label>List Name : {props.current} </label>
            <br></br>
            <label>Rename : </label>
            <input className={classes.inputbox} onChange={changeName} value={inputName} type="text"></input>
            <button className={classes.btn} onClick={rename}>rename</button>
            <button className={classes.btn} onClick={props.onClose}>close</button>
        </ModalUI>
    );
}

export default Modal;