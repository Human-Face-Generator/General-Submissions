import classes from './DetailItem.module.css' ;

const DetailItem = (props) => {
    return (
        <div className={classes['item-box']}>
            <div className={classes['pic-box']}>
               
            </div>
            <img className={classes['item-pic']} src={props.pic}></img>
            <div className={classes['item-details']}>
                <h4>{props.topic}</h4>
                <p>{props.details}</p>
            </div>
        </div>
    ) ;
} ;

export default DetailItem;