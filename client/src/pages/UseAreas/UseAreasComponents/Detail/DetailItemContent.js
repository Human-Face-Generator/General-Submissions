import datasetImage from '../images/detailImages/dataset.png' ;
import advertisementImage from '../images/detailImages/advertisement.jpg' ;
import prototypeImage  from '../images/detailImages/prototype.png';
import gamingImage from '../images/detailImages/gaming.jpg' ;
import bookImage from '../images/detailImages/book.jpg' ;

const DetailsItemContent = [
    {
        topic: "Business Advertisement",
        pic: advertisementImage,
        details: "The scope of image generation via AI is tremendous. This could save small businesses as well as huge enterprises a substantial share of their incomes spent on marketing which involves huge transactions with modelling agencies, since here a random face generator could synthesize new faces which would not cost the company big bucks and lead to no copyright issues."
    },
    {
        topic: "Dataset for Training AI/ML Models",
        pic: datasetImage ,
        details: "There’s a lot of research going on in the area of human face visuals, that require large datasets of human faces. Other ML/AI models can make use of these fake images for research purposes instead of struggling to find large datasets over the internet that may be found, but may contain images from random people over the internet, and you may be using sensitive data without the person's consent."
    },
    {
        topic: "Prototyping and Designing",
        pic: prototypeImage ,
        details: "An important application of face synthesizing is in design and prototyping of applications. This has provided flexibility to front end developers and UI designers while adding human faces to their project for demo purposes. Before a software gets real users, the fake visual faces can be used to make an application meaningful until real data is generated, instead of using pictures online without the consent of the owner."
    },
    {
        topic: "Gaming Industry",
        pic: gamingImage ,
        details: "Our project is also capable of playing a vital role in the gaming industry. AI based face synthesizer will prove to revolutionize the gaming industry, saving time and efforts of game developers and hence generate greater revenues. Programs like this could create endless virtual worlds, as well as help designers and illustrators."
    },
    {
        topic: "Book Covers",
        pic: bookImage ,
        details: "Writers may find it difficult to find model figures for their book covers. Also using random images from the internet may raise copyright issues if the person in the image never gave his consent for using his image because the writer may not have access to his contact. Or it’ll be very difficult to get consent. Here considering fake visuals for the book cover would be a time-saving and a better option."
    }  
] ;

export {DetailsItemContent} ;