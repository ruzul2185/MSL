import React, {useEffect} from 'react';
import {TextCard} from "../components/Cards";
import {MemberCard} from "../components/Cards";

import classes from '../styles/Home.module.css';
import {useDispatch, useSelector} from "react-redux";
import {getMemberList, getMessageList} from "../stores/actions/auth";
import HomeSpinner from "../components/Spinner";

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
               {!MessageList && !List && <HomeSpinner/>}
               {/*{List && List.HonorableMentionList.length>0 && <MemberCard Title={"Honorable Mentions"} Array={List.HonorableMentionList}/>}*/}
           </div>
       </React.Fragment>
    );
};



export default Home;
