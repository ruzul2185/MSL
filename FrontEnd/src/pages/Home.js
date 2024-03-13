import React from 'react';
import {TextCard} from "../components/Cards";
import {MemberCard} from "../components/Cards";

import classes from '../styles/Home.module.css';

const randomArray = [
    87, 22, 34, 56, 91, 12, 7, 66, 42, 18,
    49, 59, 77, 8, 32, 53, 28, 93, 64, 3,
    17, 41, 82, 95, 13, 61, 44, 37, 69, 81,
    72, 19, 79, 25, 68, 15, 52, 97, 46, 29,
    74, 2, 36, 88, 11, 63, 84, 71, 38, 5
];

const welcomeMessage = "Some quick example text to build on the card title and make up the\n" +
    "                    bulk of the card's content.\n" +
    "                    Some quick example text to build on the card title and make up the\n" +
    "                    bulk of the card's content.\n" +
    "                    Some quick example text to build on the card title and make up the\n" +
    "                    bulk of the card's content.\n" +
    "                    Some quick example text to build on the card title and make up the\n" +
    "                    bulk of the card's content.\n" +
    "                    Some quick example text to build on the card title and make up the\n" +
    "                    bulk of the card's content.\n" +
    "                    Some quick example text to build on the card title and make up the\n" +
    "                    bulk of the card's content.\n" +
    "                    Some quick example text to build on the card title and make up the\n" +
    "                    bulk of the card's content.\n" +
    "                    Some quick example text to build on the card title and make up the\n" +
    "                    bulk of the card's content."

const Home = () => {
    return(
       <React.Fragment>
           <div className={classes.TextCard}>
               <TextCard Title={"Welcome!"} Message={welcomeMessage}/>
               <MemberCard Title={"Members"} Array={randomArray}/>
               <MemberCard Title={"Honorable Mentions"} Array={randomArray}/>
           </div>
       </React.Fragment>
    );
};

export default Home;
