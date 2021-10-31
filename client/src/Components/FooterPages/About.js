import classes from "./Layout.module.css" ;

const About = ()=> {
    return (
        <div>
           <h2>About Us</h2>
           <h5>We are here to help you. </h5>
           <div className={classes['detail-items']}>
            <p>We help you in the creation of fake human visuals for personal
            or professional use.
            All the images that 
            you generate over here can be used without worrying 
            about copyrights, distribution rights, 
            infringement claims, or royalties.</p>
           </div>
           <div className={classes['detail-items']}>
           <p>
                One of our many purposes is to make advertisement much cheaper
                and hassle-free for the common man planning to start a business
                from the ground level. Or for an enthusiastic AI student 
                experimenting with AI models at his personal or ground level.
            </p>
           </div>
           <div className={classes['detail-items']}>
               <p>
               Our project offers human face generation which do not exist in 
               the real world, by using the ability of AI to generate fake 
               visuals .The algorithm behind it, is trained on a huge 
               dataset of real images, then uses a type of neural 
               network known as a generative adversarial network 
               (or GAN) to fabricate new examples. 
               </p>
           </div>
        </div>
    ) ;
} ;


export default About;