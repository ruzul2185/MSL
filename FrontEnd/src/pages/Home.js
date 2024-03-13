import React, {useEffect} from 'react';
import {TextCard} from "../components/Cards";
import {MemberCard} from "../components/Cards";

import classes from '../styles/Home.module.css';
import {useDispatch, useSelector} from "react-redux";
import {getMemberList, getMessageList} from "../stores/actions/auth";

const welcomeMessage = `
<strong>5 Main Rules of Astral</strong>\n
1. 12 hits minimum in Titan per week
2. Daily donation of golds (300 guild coins = 60k golds)
3. 1 week inactivity without prior notice will be dismissed.
   [Ping the leaders about your absence]
4. Respect your fellow members
5. BE ACTIVE\n
<strong>Fun Fact:</strong> The birth of the name AstralSwag started when Dazai became a kdrama addict. Watching the most popular kdrama that time 'Weightlifting Fairy Kim Bokjo' where the swag effect started- She got addicted and shamelessly created a clan with a "swag" attached to it.
(I deeply regret it now. I'm sorry my dear members)
`

const Home = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMemberList());
        dispatch(getMessageList());
    }, [dispatch]);

    const List = useSelector(state => state.auth.memberList);
    const MessageList = useSelector(state => state.auth.messageList);

    return(
       <React.Fragment>
           <div className={classes.TextCard}>
               {MessageList && MessageList.map((item) => (
                   <TextCard key={item._id} Title={item.Title} SubTitle={item.SubTitle} Message={item.Body} />
               ))}
               {List && List.length>0 && <MemberCard Title={"Members"} Array={List}/>}
               {/*{List && List.HonorableMentionList.length>0 && <MemberCard Title={"Honorable Mentions"} Array={List.HonorableMentionList}/>}*/}
           </div>
       </React.Fragment>
    );
};



export default Home;
