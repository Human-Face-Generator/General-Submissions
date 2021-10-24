import UseCaseItem from "./UseAreasComponents/UseCaseItem";
import { UseCaseItemBrief } from "./UseAreasComponents/useCaseItemBriefContent";
import classes from './Index.module.css' ;

const UseAreas=()=>{

    return (
        <>
        <div className="Usecases">
         <div id="heading">
           <center>
            <h2>Where Generated Photos are Used</h2>
            <p>
              We find the application of Human-Face-Generation in a wide range of 
              places. From small-scale tech-amateur business people for 
              advertising products, to  ML/AI model developers
              for their data set for training, we see the the scope and range
              of our product's utility.
            </p>
           </center>
         </div>

         <div className={classes['brief-items']}> 
             {UseCaseItemBrief.map(item => (
               <UseCaseItem
                   image={item.pic}
                   topic={item.topic}
               />
             ))}
         </div>

        </div>
        </>
    );
}
export default UseAreas;