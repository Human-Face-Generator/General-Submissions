import advertisingImage from './images/advertising.jpg' ;
import bookImage from './images/book.jpg' ;
import prototypeImage from './images/prototype.jpg' ;
import gamingImage from './images/gaming.jpg' ;
import datasetImage from './images/dataset.jpg' ;
import classes from './UseCaseItem.module.css' ;

const UseCaseItemBrief = [
    {
        pic: <img className={classes['item-image']} src={advertisingImage}></img> ,
        topic: "Business Advertisement"
    },
    {
        pic: <img className={classes['item-image']} src={bookImage}></img> ,
        topic: "Book Covers" 
    },
    {
        pic: <img className={classes['item-image']} src={prototypeImage}></img>,
        topic: "Design and Prototyping"
    },
    {
        pic: <img className={classes['item-image-gaming']} src={gamingImage}></img>,
        topic: "Gaming Industry"
    },
    {
        pic: <img className={classes['item-image']} src={datasetImage}></img>,
        topic: "Dataset for ML/AI Models"
    }
] ;

export {UseCaseItemBrief} ;