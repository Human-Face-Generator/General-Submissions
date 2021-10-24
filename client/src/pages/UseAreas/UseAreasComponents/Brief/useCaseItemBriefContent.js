import advertisingImage from '../images/briefImages/advertising.jpg' ;
import bookImage from '../images/briefImages/book.jpg' ;
import prototypeImage from '../images/briefImages/prototype.jpg' ;
import gamingImage from '../images/briefImages/gaming.jpg' ;
import datasetImage from '../images/briefImages/dataset.jpg' ;
import classes from './UseCaseItem.module.css' ;

const UseCaseItemBrief = [
    {
        pic: <img className={classes['item-image']} src={advertisingImage}></img> ,
        topic: "Business Advertisement"
    },
    {
        pic: <img className={classes['item-image']} src={datasetImage}></img>,
        topic: "Dataset for ML/AI Models"
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
        pic: <img className={classes['item-image']} src={bookImage}></img> ,
        topic: "Book Covers" 
    }
] ;

export {UseCaseItemBrief} ;