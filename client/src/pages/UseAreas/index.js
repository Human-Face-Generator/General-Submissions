import UseCaseItem from "./UseAreasComponents/Brief/UseCaseItem";
import DetailItem from "./UseAreasComponents/Detail/DetailItem";

import { DetailsItemContent } from "./UseAreasComponents/Detail/DetailItemContent";
import {UseCaseItemBrief} from "./UseAreasComponents/Brief/useCaseItemBriefContent";
import classes from './Index.module.css' ;



const UseAreas=()=>{

    return (
        <>
        <div className="Usecases">
         <div id="heading">
           <center>
            <h2 className={classes.h1tag}>Where Generated Photos are Used</h2>
            <p className={classes.ptag}>
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

         

         <div className={classes['detail-items']}>
            <center>
              <h1 className={classes.useCasesTag}>Use Cases</h1>
            </center>
            {DetailsItemContent.map(item => (
              <DetailItem 
                topic={item.topic}
                pic={item.pic}
                details={item.details}
              />
            ))}
         </div>

         

        </div>
        </>
    );
}
export default UseAreas;