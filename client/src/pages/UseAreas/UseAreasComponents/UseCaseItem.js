import classes from './UseCaseItem.module.css' ;

const UseCaseItem = (props) => {
    return (
       <div className={classes['item-block']}>
           <div className={classes['item-image']}>
               {props.image}
           </div>
           <div>
            <center>{props.topic}</center>
           </div>
       </div>
    ) ;
}

export default UseCaseItem;