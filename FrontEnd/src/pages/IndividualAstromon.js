import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import classes from '../styles/IndividualAstromon.module.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {useDispatch, useSelector} from "react-redux";
import {getCleanINDIVIDUAL_ASTROMON, getIndividualAstromons} from "../stores/actions/auth";

import bronzeFrame from '../assets/bronze_border_large.webp';
import silverFrame from '../assets/silver_border_large.webp';
import goldenFrame from '../assets/gold_border_large.webp';
import superFrame from '../assets/super_border_large.webp';

import Fire from '../assets/monster_element_fire.png';
import Water from '../assets/monster_element_water.png';
import Wood from '../assets/monster_element_tree.png';
import Light from '../assets/monster_element_light.png';
import Dark from '../assets/monster_element_dark.png';

import Star from '../assets/YellowStar.png';

const IndividualAstromon = () => {

    let { id ,state } = useParams();

    const isMobile = window.innerWidth <= 768;

    const dispatch = useDispatch();

    const [key, setKey] = useState(state);

    useEffect(() => {
        dispatch(getCleanINDIVIDUAL_ASTROMON());
        dispatch(getIndividualAstromons(id));
    },[dispatch,id]);

    const astromon = useSelector(state => state.auth.individualAstromon);

    function getFrameImageUrl(item) {
        switch (item.Evolution_Level) {
            case 'Evo 1':
                return bronzeFrame;
            case 'Evo 2':
                return silverFrame;
            case 'Evo 3':
                return goldenFrame;
            case 'Super Evo':
            case 'Ultimate Evo':
                return superFrame;
            default:
                return bronzeFrame;// Handle default case if necessary
        }
    }

    function getElement(item) {
        switch (item.Element) {
            case 'Fire':
                return Fire;
            case 'Water':
                return Water;
            case 'Wood':
                return Wood;
            case 'Light':
                return Light;
            case 'Dark':
                return Dark;
            default:
                return Water;// Handle default case if necessary
        }
    }

    function getDescription(desc, figure){
        const elements = figure.split(",");
        const newDescParts = desc.split('&');

        let coloredElements = [];
        for (let i = 0; i < Math.max(elements.length, newDescParts.length); i++) {
            if (newDescParts[i]) coloredElements.push(<span key={`desc_${i}`} style={{color: 'black'}}>{newDescParts[i]}</span>);
            if (elements[i]) coloredElements.push(<span key={`figure_${i}`} style={{color: '#F6C700',fontWeight:"bold"}}>{elements[i]}</span>);
        }
        return (
            <p key="description">{coloredElements}</p>
        );
    }

    return(
        <React.Fragment>
            {astromon && <div className="container">
                <div className="row">
                    <div className="col">
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                            className="mb-3"
                        >
                            {astromon.Evo1.length > 0 && <Tab eventKey="Evo 1" title="Evo 1">
                                <div className={classes.MainContainer}>
                                    {astromon.Evo1.map((item,index) => <div className={classes.IndividualContainer} key={item._id || index}>
                                        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                            <div className={classes.conditionalContainer}>
                                                <div className={classes.AtromonWrapperContainer} style={{backgroundImage: `url(${item.URL})`}}>
                                                    <img src={getFrameImageUrl(item)} alt={"..."} className={classes.AstromonFrame}/>
                                                    <img src={getElement(item)} alt={"..."} className={classes.AstromonElement}/>
                                                    <div className={classes.AstromonStarContainer} style={isMobile ? { marginLeft: `${(item.Star - 1) * 17}px` } : { marginLeft: `${(item.Star - 1) * 9}px` }}>
                                                        {[...Array(Number(item.Star))].map((_, index) => (
                                                            <img key={index} src={Star} alt={"..."} className={classes.AstromonStar} style={isMobile ? {transform: `translateX(${index * -18}px)`} : { transform: `translateX(${index * -9}px)` }}/>
                                                        ))}
                                                    </div>
                                                    <div className={classes.TypeContainerA} style={{transform: 'translate(0px, 80px)',fontWeight:'bold',position:'absolute'}}>
                                                        Tank
                                                    </div>
                                                </div>
                                                <div className={classes.TypeContainerB} style={{marginTop:"5px",fontWeight:'bold'}}>
                                                    Tank
                                                </div>
                                                <div className={classes.statContainer} style={{textAlign:'center'}}>
                                                    <div style={{fontWeight:'bold'}}>
                                                        Lv60 Stats
                                                    </div>
                                                    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                        <div style={{paddingRight:'7px'}}>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"HP" + item.HP}>
                                                                    HP:
                                                                </p>
                                                                <p>
                                                                    {item.HP}
                                                                </p>
                                                            </div>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"Attack" + item.Attack}>
                                                                    Attack:
                                                                </p>
                                                                <p>
                                                                    {item.Attack}
                                                                </p>
                                                            </div>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"Defense" + item.Defence}>
                                                                    Defense:
                                                                </p>
                                                                <p>
                                                                    {item.Defence}
                                                                </p>
                                                            </div>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"Recovery" + item.Recovery}>
                                                                    Recovery:
                                                                </p>
                                                                <p>
                                                                    {item.Recovery}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div style={{paddingLeft:'7px'}}>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"CriticalDmg" + item.Critical_Dmg}>
                                                                    Crit Dmg:
                                                                </p>
                                                                <p>
                                                                    {item.Critical_Dmg}
                                                                </p>
                                                            </div>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"CriticalRate" + item.Critical_Rate}>
                                                                    Crit Rate:
                                                                </p>
                                                                <p>
                                                                    {item.Critical_Rate}
                                                                </p>
                                                            </div>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"Resist" + item.Resist}>
                                                                    Resist:
                                                                </p>
                                                                <p>
                                                                    {item.Resist}
                                                                </p>
                                                            </div>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"CriticalResist" + item.Critical_Resist}>
                                                                    Crit Res:
                                                                </p>
                                                                <p>
                                                                    {item.Critical_Resist}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={classes.mediaQueryContainer}>
                                                <div className={classes.skillContainer} key={item._id + item.Leader_Skill.Name}>
                                                    <div className={classes.UpperIndividualContainer}>
                                                        <div className={classes.UpperIndividualTitle}>
                                                            {item.Leader_Skill.Name}
                                                        </div>
                                                        <div>
                                                            Leader Skill
                                                        </div>
                                                    </div>
                                                    <div className={classes.LowerIndividualContainer}>
                                                        <div style={{paddingRight:"20px"}}>
                                                            <img src={item.Leader_Skill.Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                        </div>
                                                        <div style={{wordBreak: 'break-word'}} key={item._id + "1"}>
                                                            {getDescription(item.Leader_Skill.Desc,item.Leader_Skill_Figure)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={classes.skillContainer}>
                                                    <div className={classes.UpperIndividualContainer}>
                                                        <div className={classes.UpperIndividualTitle}>
                                                            {item.Passive_Skill.Name}
                                                        </div>
                                                        <div>
                                                            {item.Astromon_Info.Passive_Skill_Target}
                                                        </div>
                                                    </div>
                                                    <div className={classes.LowerIndividualContainer}>
                                                        <div style={{paddingRight:"20px"}}>
                                                            <img src={item.Passive_Skill.Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                        </div>
                                                        <div style={{wordBreak: 'break-word'}}>
                                                            {getDescription(item.Passive_Skill.Desc,item.Passive_Skill_Figure)}
                                                            <div>
                                                                {item.Passive_Skill.AI_Desc}
                                                            </div>
                                                            <div>
                                                                {item.Passive_Book}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={classes.skillContainer}>
                                                    <div className={classes.UpperIndividualContainer}>
                                                        <div className={classes.UpperIndividualTitle}>
                                                            {item.Active_Skill.Name}
                                                        </div>
                                                        <div>
                                                            {item.Astromon_Info.Active_Skill_Target}
                                                        </div>
                                                    </div>
                                                    <div className={classes.LowerIndividualContainer}>
                                                        <div style={{paddingRight:"20px"}}>
                                                            <img src={item.Active_Skill.Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                        </div>
                                                        <div style={{wordBreak: 'break-word'}}>
                                                            {getDescription(item.Active_Skill.Desc,item.Active_Skill_Figure)}
                                                            <div>
                                                                {item.Active_Skill.AI_Desc}
                                                            </div>
                                                            <div>
                                                                Books: {item.Active_Book}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {item.Ultimate_Skill.Name !== "None" && <div className={classes.skillContainer}>
                                                    <div className={classes.UpperIndividualContainer}>
                                                        <div className={classes.UpperIndividualTitle}>
                                                            {item.Ultimate_Skill.Name}
                                                        </div>
                                                        <div>
                                                            {item.Astromon_Info.Super_Skill_Target}
                                                        </div>
                                                    </div>
                                                    <div className={classes.LowerIndividualContainer}>
                                                        <div style={{paddingRight:"20px"}}>
                                                            <img src={item.Ultimate_Skill.Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                        </div>
                                                        <div style={{wordBreak: 'break-word'}}>
                                                            {getDescription(item.Ultimate_Skill.Desc,item.Ultimate_Skill_Figure)}
                                                        </div>
                                                    </div>
                                                </div>}
                                                <div className={classes.skillContainer}>
                                                    <div className={classes.IndividualElementContainer}>
                                                        <div className={classes.UpperIndividualContainer}>
                                                            <div className={classes.UpperIndividualTitle}>
                                                                {item.Astromon_Info.Passive_Skill_Name}
                                                            </div>
                                                            <div>
                                                                {item.Astromon_Info.Passive_Skill_Target}
                                                            </div>
                                                        </div>
                                                        <div className={classes.LowerIndividualContainer}>
                                                            <div style={{paddingRight:"20px"}}>
                                                                <img src={item.Astromon_Info.Passive_Skill_Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                            </div>
                                                            <div style={{wordBreak: 'break-word'}}>
                                                                {item.Astromon_Info.Passive_Skill_Desc}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={classes.skillContainer}>
                                                    <div className={classes.IndividualElementContainer}>
                                                        <div className={classes.UpperIndividualContainer}>
                                                            <div className={classes.UpperIndividualTitle}>
                                                                {item.Astromon_Info.Active_Skill_Name}
                                                            </div>
                                                            <div>
                                                                {item.Astromon_Info.Active_Skill_Target}
                                                            </div>
                                                        </div>
                                                        <div className={classes.LowerIndividualContainer}>
                                                            <div style={{paddingRight:"20px"}}>
                                                                <img src={item.Astromon_Info.Active_Skill_Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                            </div>
                                                            <div style={{wordBreak: 'break-word'}}>
                                                                {item.Astromon_Info.Active_Skill_Desc}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {item.Astromon_Info.Super_Skill_Name !== "" && <div className={classes.skillContainer}>
                                                    {item.Astromon_Info.Super_Skill_Name !== "" && <div className={classes.IndividualElementContainer}>
                                                        <div className={classes.UpperIndividualContainer}>
                                                            <div className={classes.UpperIndividualTitle}>
                                                                {item.Astromon_Info.Super_Skill_Name}
                                                            </div>
                                                            <div>
                                                                {item.Astromon_Info.Super_Skill_Target}
                                                            </div>
                                                        </div>
                                                        <div className={classes.LowerIndividualContainer}>
                                                            <div style={{paddingRight:"20px"}}>
                                                                <img src={item.Astromon_Info.Super_Skill_Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                            </div>
                                                            <div style={{wordBreak: 'break-word'}}>
                                                                {item.Astromon_Info.Super_Skill_Desc}
                                                            </div>
                                                        </div>
                                                    </div>}
                                                </div>}
                                            </div>
                                        </div>
                                    </div>)}
                                </div>
                            </Tab>}
                            {astromon.Evo2.length > 0 && <Tab eventKey="Evo 2" title="Evo 2">
                                <div className={classes.MainContainer}>
                                    {astromon.Evo2.map((item,index) => <div className={classes.IndividualContainer} key={item._id || index}>
                                        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                            <div className={classes.conditionalContainer}>
                                                <div className={classes.AtromonWrapperContainer} style={{backgroundImage: `url(${item.URL})`}}>
                                                    <img src={getFrameImageUrl(item)} alt={"..."} className={classes.AstromonFrame}/>
                                                    <img src={getElement(item)} alt={"..."} className={classes.AstromonElement}/>
                                                    <div className={classes.AstromonStarContainer} style={isMobile ? { marginLeft: `${(item.Star - 1) * 17}px` } : { marginLeft: `${(item.Star - 1) * 9}px` }}>
                                                        {[...Array(Number(item.Star))].map((_, index) => (
                                                            <img key={index} src={Star} alt={"..."} className={classes.AstromonStar} style={isMobile ? {transform: `translateX(${index * -18}px)`} : { transform: `translateX(${index * -9}px)` }}/>
                                                        ))}
                                                    </div>
                                                    <div className={classes.TypeContainerA} style={{transform: 'translate(0px, 80px)',fontWeight:'bold',position:'absolute'}}>
                                                        Tank
                                                    </div>
                                                </div>
                                                <div className={classes.TypeContainerB} style={{marginTop:"5px",fontWeight:'bold'}}>
                                                    Tank
                                                </div>
                                                <div className={classes.statContainer} style={{textAlign:'center'}}>
                                                    <div style={{fontWeight:'bold'}}>
                                                        Lv60 Stats
                                                    </div>
                                                    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                        <div style={{paddingRight:'7px'}}>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"HP" + item.HP}>
                                                                    HP:
                                                                </p>
                                                                <p>
                                                                    {item.HP}
                                                                </p>
                                                            </div>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"Attack" + item.Attack}>
                                                                    Attack:
                                                                </p>
                                                                <p>
                                                                    {item.Attack}
                                                                </p>
                                                            </div>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"Defense" + item.Defence}>
                                                                    Defense:
                                                                </p>
                                                                <p>
                                                                    {item.Defence}
                                                                </p>
                                                            </div>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"Recovery" + item.Recovery}>
                                                                    Recovery:
                                                                </p>
                                                                <p>
                                                                    {item.Recovery}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div style={{paddingLeft:'7px'}}>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"CriticalDmg" + item.Critical_Dmg}>
                                                                    Crit Dmg:
                                                                </p>
                                                                <p>
                                                                    {item.Critical_Dmg}
                                                                </p>
                                                            </div>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"CriticalRate" + item.Critical_Rate}>
                                                                    Crit Rate:
                                                                </p>
                                                                <p>
                                                                    {item.Critical_Rate}
                                                                </p>
                                                            </div>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"Resist" + item.Resist}>
                                                                    Resist:
                                                                </p>
                                                                <p>
                                                                    {item.Resist}
                                                                </p>
                                                            </div>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"CriticalResist" + item.Critical_Resist}>
                                                                    Crit Res:
                                                                </p>
                                                                <p>
                                                                    {item.Critical_Resist}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={classes.mediaQueryContainer}>
                                                <div className={classes.skillContainer} key={item._id + item.Leader_Skill.Name}>
                                                    <div className={classes.UpperIndividualContainer}>
                                                        <div className={classes.UpperIndividualTitle}>
                                                            {item.Leader_Skill.Name}
                                                        </div>
                                                        <div>
                                                            Leader Skill
                                                        </div>
                                                    </div>
                                                    <div className={classes.LowerIndividualContainer}>
                                                        <div style={{paddingRight:"20px"}}>
                                                            <img src={item.Leader_Skill.Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                        </div>
                                                        <div style={{wordBreak: 'break-word'}} key={item._id + "1"}>
                                                            {getDescription(item.Leader_Skill.Desc,item.Leader_Skill_Figure)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={classes.skillContainer}>
                                                    <div className={classes.UpperIndividualContainer}>
                                                        <div className={classes.UpperIndividualTitle}>
                                                            {item.Passive_Skill.Name}
                                                        </div>
                                                        <div>
                                                            {item.Astromon_Info.Passive_Skill_Target}
                                                        </div>
                                                    </div>
                                                    <div className={classes.LowerIndividualContainer}>
                                                        <div style={{paddingRight:"20px"}}>
                                                            <img src={item.Passive_Skill.Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                        </div>
                                                        <div style={{wordBreak: 'break-word'}}>
                                                            {getDescription(item.Passive_Skill.Desc,item.Passive_Skill_Figure)}
                                                            <div>
                                                                {item.Passive_Skill.AI_Desc}
                                                            </div>
                                                            <div>
                                                                {item.Passive_Book}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={classes.skillContainer}>
                                                    <div className={classes.UpperIndividualContainer}>
                                                        <div className={classes.UpperIndividualTitle}>
                                                            {item.Active_Skill.Name}
                                                        </div>
                                                        <div>
                                                            {item.Astromon_Info.Active_Skill_Target}
                                                        </div>
                                                    </div>
                                                    <div className={classes.LowerIndividualContainer}>
                                                        <div style={{paddingRight:"20px"}}>
                                                            <img src={item.Active_Skill.Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                        </div>
                                                        <div style={{wordBreak: 'break-word'}}>
                                                            {getDescription(item.Active_Skill.Desc,item.Active_Skill_Figure)}
                                                            <div>
                                                                {item.Active_Skill.AI_Desc}
                                                            </div>
                                                            <div>
                                                                Books: {item.Active_Book}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {item.Ultimate_Skill.Name !== "None" && <div className={classes.skillContainer}>
                                                    <div className={classes.UpperIndividualContainer}>
                                                        <div className={classes.UpperIndividualTitle}>
                                                            {item.Ultimate_Skill.Name}
                                                        </div>
                                                        <div>
                                                            {item.Astromon_Info.Super_Skill_Target}
                                                        </div>
                                                    </div>
                                                    <div className={classes.LowerIndividualContainer}>
                                                        <div style={{paddingRight:"20px"}}>
                                                            <img src={item.Ultimate_Skill.Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                        </div>
                                                        <div style={{wordBreak: 'break-word'}}>
                                                            {getDescription(item.Ultimate_Skill.Desc,item.Ultimate_Skill_Figure)}
                                                        </div>
                                                    </div>
                                                </div>}
                                                <div className={classes.skillContainer}>
                                                    <div className={classes.IndividualElementContainer}>
                                                        <div className={classes.UpperIndividualContainer}>
                                                            <div className={classes.UpperIndividualTitle}>
                                                                {item.Astromon_Info.Passive_Skill_Name}
                                                            </div>
                                                            <div>
                                                                {item.Astromon_Info.Passive_Skill_Target}
                                                            </div>
                                                        </div>
                                                        <div className={classes.LowerIndividualContainer}>
                                                            <div style={{paddingRight:"20px"}}>
                                                                <img src={item.Astromon_Info.Passive_Skill_Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                            </div>
                                                            <div style={{wordBreak: 'break-word'}}>
                                                                {item.Astromon_Info.Passive_Skill_Desc}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={classes.skillContainer}>
                                                    <div className={classes.IndividualElementContainer}>
                                                        <div className={classes.UpperIndividualContainer}>
                                                            <div className={classes.UpperIndividualTitle}>
                                                                {item.Astromon_Info.Active_Skill_Name}
                                                            </div>
                                                            <div>
                                                                {item.Astromon_Info.Active_Skill_Target}
                                                            </div>
                                                        </div>
                                                        <div className={classes.LowerIndividualContainer}>
                                                            <div style={{paddingRight:"20px"}}>
                                                                <img src={item.Astromon_Info.Active_Skill_Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                            </div>
                                                            <div style={{wordBreak: 'break-word'}}>
                                                                {item.Astromon_Info.Active_Skill_Desc}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {item.Astromon_Info.Super_Skill_Name !== "" && <div className={classes.skillContainer}>
                                                    {item.Astromon_Info.Super_Skill_Name !== "" && <div className={classes.IndividualElementContainer}>
                                                        <div className={classes.UpperIndividualContainer}>
                                                            <div className={classes.UpperIndividualTitle}>
                                                                {item.Astromon_Info.Super_Skill_Name}
                                                            </div>
                                                            <div>
                                                                {item.Astromon_Info.Super_Skill_Target}
                                                            </div>
                                                        </div>
                                                        <div className={classes.LowerIndividualContainer}>
                                                            <div style={{paddingRight:"20px"}}>
                                                                <img src={item.Astromon_Info.Super_Skill_Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                            </div>
                                                            <div style={{wordBreak: 'break-word'}}>
                                                                {item.Astromon_Info.Super_Skill_Desc}
                                                            </div>
                                                        </div>
                                                    </div>}
                                                </div>}
                                            </div>
                                        </div>
                                    </div>)}
                                </div>
                            </Tab>}
                            {astromon.Evo3.length > 0 && <Tab eventKey="Evo 3" title="Evo 3">
                                <div className={classes.MainContainer}>
                                    {astromon.Evo3.map((item,index) => <div className={classes.IndividualContainer} key={item._id || index}>
                                        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                            <div className={classes.conditionalContainer}>
                                                <div className={classes.AtromonWrapperContainer} style={{backgroundImage: `url(${item.URL})`}}>
                                                    <img src={getFrameImageUrl(item)} alt={"..."} className={classes.AstromonFrame}/>
                                                    <img src={getElement(item)} alt={"..."} className={classes.AstromonElement}/>
                                                    <div className={classes.AstromonStarContainer} style={isMobile ? { marginLeft: `${(item.Star - 1) * 17}px` } : { marginLeft: `${(item.Star - 1) * 9}px` }}>
                                                        {[...Array(Number(item.Star))].map((_, index) => (
                                                            <img key={index} src={Star} alt={"..."} className={classes.AstromonStar} style={isMobile ? {transform: `translateX(${index * -18}px)`} : { transform: `translateX(${index * -9}px)` }}/>
                                                        ))}
                                                    </div>
                                                    <div className={classes.TypeContainerA} style={{transform: 'translate(0px, 80px)',fontWeight:'bold',position:'absolute'}}>
                                                        Tank
                                                    </div>
                                                </div>
                                                <div className={classes.TypeContainerB} style={{marginTop:"5px",fontWeight:'bold'}}>
                                                    Tank
                                                </div>
                                                <div className={classes.statContainer} style={{textAlign:'center'}}>
                                                    <div style={{fontWeight:'bold'}}>
                                                        Lv60 Stats
                                                    </div>
                                                    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                        <div style={{paddingRight:'7px'}}>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"HP" + item.HP}>
                                                                    HP:
                                                                </p>
                                                                <p>
                                                                    {item.HP}
                                                                </p>
                                                            </div>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"Attack" + item.Attack}>
                                                                    Attack:
                                                                </p>
                                                                <p>
                                                                    {item.Attack}
                                                                </p>
                                                            </div>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"Defense" + item.Defence}>
                                                                    Defense:
                                                                </p>
                                                                <p>
                                                                    {item.Defence}
                                                                </p>
                                                            </div>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"Recovery" + item.Recovery}>
                                                                    Recovery:
                                                                </p>
                                                                <p>
                                                                    {item.Recovery}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div style={{paddingLeft:'7px'}}>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"CriticalDmg" + item.Critical_Dmg}>
                                                                    Crit Dmg:
                                                                </p>
                                                                <p>
                                                                    {item.Critical_Dmg}
                                                                </p>
                                                            </div>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"CriticalRate" + item.Critical_Rate}>
                                                                    Crit Rate:
                                                                </p>
                                                                <p>
                                                                    {item.Critical_Rate}
                                                                </p>
                                                            </div>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"Resist" + item.Resist}>
                                                                    Resist:
                                                                </p>
                                                                <p>
                                                                    {item.Resist}
                                                                </p>
                                                            </div>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"CriticalResist" + item.Critical_Resist}>
                                                                    Crit Res:
                                                                </p>
                                                                <p>
                                                                    {item.Critical_Resist}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={classes.mediaQueryContainer}>
                                                <div className={classes.skillContainer} key={item._id + item.Leader_Skill.Name}>
                                                    <div className={classes.UpperIndividualContainer}>
                                                        <div className={classes.UpperIndividualTitle}>
                                                            {item.Leader_Skill.Name}
                                                        </div>
                                                        <div>
                                                            Leader Skill
                                                        </div>
                                                    </div>
                                                    <div className={classes.LowerIndividualContainer}>
                                                        <div style={{paddingRight:"20px"}}>
                                                            <img src={item.Leader_Skill.Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                        </div>
                                                        <div style={{wordBreak: 'break-word'}} key={item._id + "1"}>
                                                            {getDescription(item.Leader_Skill.Desc,item.Leader_Skill_Figure)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={classes.skillContainer}>
                                                    <div className={classes.UpperIndividualContainer}>
                                                        <div className={classes.UpperIndividualTitle}>
                                                            {item.Passive_Skill.Name}
                                                        </div>
                                                        <div>
                                                            {item.Astromon_Info.Passive_Skill_Target}
                                                        </div>
                                                    </div>
                                                    <div className={classes.LowerIndividualContainer}>
                                                        <div style={{paddingRight:"20px"}}>
                                                            <img src={item.Passive_Skill.Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                        </div>
                                                        <div style={{wordBreak: 'break-word'}}>
                                                            {getDescription(item.Passive_Skill.Desc,item.Passive_Skill_Figure)}
                                                            <div>
                                                                {item.Passive_Skill.AI_Desc}
                                                            </div>
                                                            <div>
                                                                {item.Passive_Book}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={classes.skillContainer}>
                                                    <div className={classes.UpperIndividualContainer}>
                                                        <div className={classes.UpperIndividualTitle}>
                                                            {item.Active_Skill.Name}
                                                        </div>
                                                        <div>
                                                            {item.Astromon_Info.Active_Skill_Target}
                                                        </div>
                                                    </div>
                                                    <div className={classes.LowerIndividualContainer}>
                                                        <div style={{paddingRight:"20px"}}>
                                                            <img src={item.Active_Skill.Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                        </div>
                                                        <div style={{wordBreak: 'break-word'}}>
                                                            {getDescription(item.Active_Skill.Desc,item.Active_Skill_Figure)}
                                                            <div>
                                                                {item.Active_Skill.AI_Desc}
                                                            </div>
                                                            <div>
                                                                Books: {item.Active_Book}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {item.Ultimate_Skill.Name !== "None" && <div className={classes.skillContainer}>
                                                    <div className={classes.UpperIndividualContainer}>
                                                        <div className={classes.UpperIndividualTitle}>
                                                            {item.Ultimate_Skill.Name}
                                                        </div>
                                                        <div>
                                                            {item.Astromon_Info.Super_Skill_Target}
                                                        </div>
                                                    </div>
                                                    <div className={classes.LowerIndividualContainer}>
                                                        <div style={{paddingRight:"20px"}}>
                                                            <img src={item.Ultimate_Skill.Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                        </div>
                                                        <div style={{wordBreak: 'break-word'}}>
                                                            {getDescription(item.Ultimate_Skill.Desc,item.Ultimate_Skill_Figure)}
                                                        </div>
                                                    </div>
                                                </div>}
                                                <div className={classes.skillContainer}>
                                                    <div className={classes.IndividualElementContainer}>
                                                        <div className={classes.UpperIndividualContainer}>
                                                            <div className={classes.UpperIndividualTitle}>
                                                                {item.Astromon_Info.Passive_Skill_Name}
                                                            </div>
                                                            <div>
                                                                {item.Astromon_Info.Passive_Skill_Target}
                                                            </div>
                                                        </div>
                                                        <div className={classes.LowerIndividualContainer}>
                                                            <div style={{paddingRight:"20px"}}>
                                                                <img src={item.Astromon_Info.Passive_Skill_Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                            </div>
                                                            <div style={{wordBreak: 'break-word'}}>
                                                                {item.Astromon_Info.Passive_Skill_Desc}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={classes.skillContainer}>
                                                    <div className={classes.IndividualElementContainer}>
                                                        <div className={classes.UpperIndividualContainer}>
                                                            <div className={classes.UpperIndividualTitle}>
                                                                {item.Astromon_Info.Active_Skill_Name}
                                                            </div>
                                                            <div>
                                                                {item.Astromon_Info.Active_Skill_Target}
                                                            </div>
                                                        </div>
                                                        <div className={classes.LowerIndividualContainer}>
                                                            <div style={{paddingRight:"20px"}}>
                                                                <img src={item.Astromon_Info.Active_Skill_Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                            </div>
                                                            <div style={{wordBreak: 'break-word'}}>
                                                                {item.Astromon_Info.Active_Skill_Desc}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {item.Astromon_Info.Super_Skill_Name !== "" && <div className={classes.skillContainer}>
                                                    {item.Astromon_Info.Super_Skill_Name !== "" && <div className={classes.IndividualElementContainer}>
                                                        <div className={classes.UpperIndividualContainer}>
                                                            <div className={classes.UpperIndividualTitle}>
                                                                {item.Astromon_Info.Super_Skill_Name}
                                                            </div>
                                                            <div>
                                                                {item.Astromon_Info.Super_Skill_Target}
                                                            </div>
                                                        </div>
                                                        <div className={classes.LowerIndividualContainer}>
                                                            <div style={{paddingRight:"20px"}}>
                                                                <img src={item.Astromon_Info.Super_Skill_Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                            </div>
                                                            <div style={{wordBreak: 'break-word'}}>
                                                                {item.Astromon_Info.Super_Skill_Desc}
                                                            </div>
                                                        </div>
                                                    </div>}
                                                </div>}
                                            </div>
                                        </div>
                                    </div>)}
                                </div>
                            </Tab>}
                            {astromon.SuperEvo2.length > 0 && <Tab eventKey="Super Evo 2" title="Super Evo 2">
                                <div className={classes.MainContainer}>
                                    {astromon.SuperEvo2.map((item,index) => <div className={classes.IndividualContainer} key={item._id || index}>
                                        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                            <div className={classes.conditionalContainer}>
                                                <div className={classes.AtromonWrapperContainer} style={{backgroundImage: `url(${item.URL})`}}>
                                                    <img src={getFrameImageUrl(item)} alt={"..."} className={classes.AstromonFrame}/>
                                                    <img src={getElement(item)} alt={"..."} className={classes.AstromonElement}/>
                                                    <div className={classes.AstromonStarContainer} style={isMobile ? { marginLeft: `${(item.Star - 1) * 17}px` } : { marginLeft: `${(item.Star - 1) * 9}px` }}>
                                                        {[...Array(Number(item.Star))].map((_, index) => (
                                                            <img key={index} src={Star} alt={"..."} className={classes.AstromonStar} style={isMobile ? {transform: `translateX(${index * -18}px)`} : { transform: `translateX(${index * -9}px)` }}/>
                                                        ))}
                                                    </div>
                                                    <div className={classes.TypeContainerA} style={{transform: 'translate(0px, 80px)',fontWeight:'bold',position:'absolute'}}>
                                                        Tank
                                                    </div>
                                                </div>
                                                <div className={classes.TypeContainerB} style={{marginTop:"5px",fontWeight:'bold'}}>
                                                    Tank
                                                </div>
                                                <div className={classes.statContainer} style={{textAlign:'center'}}>
                                                    <div style={{fontWeight:'bold'}}>
                                                        Lv60 Stats
                                                    </div>
                                                    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                        <div style={{paddingRight:'7px'}}>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"HP" + item.HP}>
                                                                    HP:
                                                                </p>
                                                                <p>
                                                                    {item.HP}
                                                                </p>
                                                            </div>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"Attack" + item.Attack}>
                                                                    Attack:
                                                                </p>
                                                                <p>
                                                                    {item.Attack}
                                                                </p>
                                                            </div>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"Defense" + item.Defence}>
                                                                    Defense:
                                                                </p>
                                                                <p>
                                                                    {item.Defence}
                                                                </p>
                                                            </div>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"Recovery" + item.Recovery}>
                                                                    Recovery:
                                                                </p>
                                                                <p>
                                                                    {item.Recovery}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div style={{paddingLeft:'7px'}}>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"CriticalDmg" + item.Critical_Dmg}>
                                                                    Crit Dmg:
                                                                </p>
                                                                <p>
                                                                    {item.Critical_Dmg}
                                                                </p>
                                                            </div>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"CriticalRate" + item.Critical_Rate}>
                                                                    Crit Rate:
                                                                </p>
                                                                <p>
                                                                    {item.Critical_Rate}
                                                                </p>
                                                            </div>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"Resist" + item.Resist}>
                                                                    Resist:
                                                                </p>
                                                                <p>
                                                                    {item.Resist}
                                                                </p>
                                                            </div>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"CriticalResist" + item.Critical_Resist}>
                                                                    Crit Res:
                                                                </p>
                                                                <p>
                                                                    {item.Critical_Resist}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={classes.mediaQueryContainer}>
                                                <div className={classes.skillContainer} key={item._id + item.Leader_Skill.Name}>
                                                    <div className={classes.UpperIndividualContainer}>
                                                        <div className={classes.UpperIndividualTitle}>
                                                            {item.Leader_Skill.Name}
                                                        </div>
                                                        <div>
                                                            Leader Skill
                                                        </div>
                                                    </div>
                                                    <div className={classes.LowerIndividualContainer}>
                                                        <div style={{paddingRight:"20px"}}>
                                                            <img src={item.Leader_Skill.Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                        </div>
                                                        <div style={{wordBreak: 'break-word'}} key={item._id + "1"}>
                                                            {getDescription(item.Leader_Skill.Desc,item.Leader_Skill_Figure)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={classes.skillContainer}>
                                                    <div className={classes.UpperIndividualContainer}>
                                                        <div className={classes.UpperIndividualTitle}>
                                                            {item.Passive_Skill.Name}
                                                        </div>
                                                        <div>
                                                            {item.Astromon_Info.Passive_Skill_Target}
                                                        </div>
                                                    </div>
                                                    <div className={classes.LowerIndividualContainer}>
                                                        <div style={{paddingRight:"20px"}}>
                                                            <img src={item.Passive_Skill.Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                        </div>
                                                        <div style={{wordBreak: 'break-word'}}>
                                                            {getDescription(item.Passive_Skill.Desc,item.Passive_Skill_Figure)}
                                                            <div>
                                                                {item.Passive_Skill.AI_Desc}
                                                            </div>
                                                            <div>
                                                                {item.Passive_Book}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={classes.skillContainer}>
                                                    <div className={classes.UpperIndividualContainer}>
                                                        <div className={classes.UpperIndividualTitle}>
                                                            {item.Active_Skill.Name}
                                                        </div>
                                                        <div>
                                                            {item.Astromon_Info.Active_Skill_Target}
                                                        </div>
                                                    </div>
                                                    <div className={classes.LowerIndividualContainer}>
                                                        <div style={{paddingRight:"20px"}}>
                                                            <img src={item.Active_Skill.Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                        </div>
                                                        <div style={{wordBreak: 'break-word'}}>
                                                            {getDescription(item.Active_Skill.Desc,item.Active_Skill_Figure)}
                                                            <div>
                                                                {item.Active_Skill.AI_Desc}
                                                            </div>
                                                            <div>
                                                                Books: {item.Active_Book}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {item.Ultimate_Skill.Name !== "None" && <div className={classes.skillContainer}>
                                                    <div className={classes.UpperIndividualContainer}>
                                                        <div className={classes.UpperIndividualTitle}>
                                                            {item.Ultimate_Skill.Name}
                                                        </div>
                                                        <div>
                                                            {item.Astromon_Info.Super_Skill_Target}
                                                        </div>
                                                    </div>
                                                    <div className={classes.LowerIndividualContainer}>
                                                        <div style={{paddingRight:"20px"}}>
                                                            <img src={item.Ultimate_Skill.Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                        </div>
                                                        <div style={{wordBreak: 'break-word'}}>
                                                            {getDescription(item.Ultimate_Skill.Desc,item.Ultimate_Skill_Figure)}
                                                        </div>
                                                    </div>
                                                </div>}
                                                <div className={classes.skillContainer}>
                                                    <div className={classes.IndividualElementContainer}>
                                                        <div className={classes.UpperIndividualContainer}>
                                                            <div className={classes.UpperIndividualTitle}>
                                                                {item.Astromon_Info.Passive_Skill_Name}
                                                            </div>
                                                            <div>
                                                                {item.Astromon_Info.Passive_Skill_Target}
                                                            </div>
                                                        </div>
                                                        <div className={classes.LowerIndividualContainer}>
                                                            <div style={{paddingRight:"20px"}}>
                                                                <img src={item.Astromon_Info.Passive_Skill_Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                            </div>
                                                            <div style={{wordBreak: 'break-word'}}>
                                                                {item.Astromon_Info.Passive_Skill_Desc}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={classes.skillContainer}>
                                                    <div className={classes.IndividualElementContainer}>
                                                        <div className={classes.UpperIndividualContainer}>
                                                            <div className={classes.UpperIndividualTitle}>
                                                                {item.Astromon_Info.Active_Skill_Name}
                                                            </div>
                                                            <div>
                                                                {item.Astromon_Info.Active_Skill_Target}
                                                            </div>
                                                        </div>
                                                        <div className={classes.LowerIndividualContainer}>
                                                            <div style={{paddingRight:"20px"}}>
                                                                <img src={item.Astromon_Info.Active_Skill_Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                            </div>
                                                            <div style={{wordBreak: 'break-word'}}>
                                                                {item.Astromon_Info.Active_Skill_Desc}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {item.Astromon_Info.Super_Skill_Name !== "" && <div className={classes.skillContainer}>
                                                    {item.Astromon_Info.Super_Skill_Name !== "" && <div className={classes.IndividualElementContainer}>
                                                        <div className={classes.UpperIndividualContainer}>
                                                            <div className={classes.UpperIndividualTitle}>
                                                                {item.Astromon_Info.Super_Skill_Name}
                                                            </div>
                                                            <div>
                                                                {item.Astromon_Info.Super_Skill_Target}
                                                            </div>
                                                        </div>
                                                        <div className={classes.LowerIndividualContainer}>
                                                            <div style={{paddingRight:"20px"}}>
                                                                <img src={item.Astromon_Info.Super_Skill_Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                            </div>
                                                            <div style={{wordBreak: 'break-word'}}>
                                                                {item.Astromon_Info.Super_Skill_Desc}
                                                            </div>
                                                        </div>
                                                    </div>}
                                                </div>}
                                            </div>
                                        </div>
                                    </div>)}
                                </div>
                            </Tab>}
                            {astromon.SuperEvo3.length > 0 && <Tab eventKey="Super Evo 3" title="Super Evo 3">
                                <div className={classes.MainContainer}>
                                    {astromon.SuperEvo3.map((item,index) => <div className={classes.IndividualContainer} key={item._id || index}>
                                        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                            <div className={classes.conditionalContainer}>
                                                <div className={classes.AtromonWrapperContainer} style={{backgroundImage: `url(${item.URL})`}}>
                                                    <img src={getFrameImageUrl(item)} alt={"..."} className={classes.AstromonFrame}/>
                                                    <img src={getElement(item)} alt={"..."} className={classes.AstromonElement}/>
                                                    <div className={classes.AstromonStarContainer} style={isMobile ? { marginLeft: `${(item.Star - 1) * 17}px` } : { marginLeft: `${(item.Star - 1) * 9}px` }}>
                                                        {[...Array(Number(item.Star))].map((_, index) => (
                                                            <img key={index} src={Star} alt={"..."} className={classes.AstromonStar} style={isMobile ? {transform: `translateX(${index * -18}px)`} : { transform: `translateX(${index * -9}px)` }}/>
                                                        ))}
                                                    </div>
                                                    <div className={classes.TypeContainerA} style={{transform: 'translate(0px, 80px)',fontWeight:'bold',position:'absolute'}}>
                                                        Tank
                                                    </div>
                                                </div>
                                                <div className={classes.TypeContainerB} style={{marginTop:"5px",fontWeight:'bold'}}>
                                                    Tank
                                                </div>
                                                <div className={classes.statContainer} style={{textAlign:'center'}}>
                                                    <div style={{fontWeight:'bold'}}>
                                                        Lv60 Stats
                                                    </div>
                                                    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                        <div style={{paddingRight:'7px'}}>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"HP" + item.HP}>
                                                                    HP:
                                                                </p>
                                                                <p>
                                                                    {item.HP}
                                                                </p>
                                                            </div>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"Attack" + item.Attack}>
                                                                    Attack:
                                                                </p>
                                                                <p>
                                                                    {item.Attack}
                                                                </p>
                                                            </div>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"Defense" + item.Defence}>
                                                                    Defense:
                                                                </p>
                                                                <p>
                                                                    {item.Defence}
                                                                </p>
                                                            </div>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"Recovery" + item.Recovery}>
                                                                    Recovery:
                                                                </p>
                                                                <p>
                                                                    {item.Recovery}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div style={{paddingLeft:'7px'}}>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"CriticalDmg" + item.Critical_Dmg}>
                                                                    Crit Dmg:
                                                                </p>
                                                                <p>
                                                                    {item.Critical_Dmg}
                                                                </p>
                                                            </div>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"CriticalRate" + item.Critical_Rate}>
                                                                    Crit Rate:
                                                                </p>
                                                                <p>
                                                                    {item.Critical_Rate}
                                                                </p>
                                                            </div>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"Resist" + item.Resist}>
                                                                    Resist:
                                                                </p>
                                                                <p>
                                                                    {item.Resist}
                                                                </p>
                                                            </div>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"CriticalResist" + item.Critical_Resist}>
                                                                    Crit Res:
                                                                </p>
                                                                <p>
                                                                    {item.Critical_Resist}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={classes.mediaQueryContainer}>
                                                <div className={classes.skillContainer} key={item._id + item.Leader_Skill.Name}>
                                                    <div className={classes.UpperIndividualContainer}>
                                                        <div className={classes.UpperIndividualTitle}>
                                                            {item.Leader_Skill.Name}
                                                        </div>
                                                        <div>
                                                            Leader Skill
                                                        </div>
                                                    </div>
                                                    <div className={classes.LowerIndividualContainer}>
                                                        <div style={{paddingRight:"20px"}}>
                                                            <img src={item.Leader_Skill.Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                        </div>
                                                        <div style={{wordBreak: 'break-word'}} key={item._id + "1"}>
                                                            {getDescription(item.Leader_Skill.Desc,item.Leader_Skill_Figure)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={classes.skillContainer}>
                                                    <div className={classes.UpperIndividualContainer}>
                                                        <div className={classes.UpperIndividualTitle}>
                                                            {item.Passive_Skill.Name}
                                                        </div>
                                                        <div>
                                                            {item.Astromon_Info.Passive_Skill_Target}
                                                        </div>
                                                    </div>
                                                    <div className={classes.LowerIndividualContainer}>
                                                        <div style={{paddingRight:"20px"}}>
                                                            <img src={item.Passive_Skill.Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                        </div>
                                                        <div style={{wordBreak: 'break-word'}}>
                                                            {getDescription(item.Passive_Skill.Desc,item.Passive_Skill_Figure)}
                                                            <div>
                                                                {item.Passive_Skill.AI_Desc}
                                                            </div>
                                                            <div>
                                                                {item.Passive_Book}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={classes.skillContainer}>
                                                    <div className={classes.UpperIndividualContainer}>
                                                        <div className={classes.UpperIndividualTitle}>
                                                            {item.Active_Skill.Name}
                                                        </div>
                                                        <div>
                                                            {item.Astromon_Info.Active_Skill_Target}
                                                        </div>
                                                    </div>
                                                    <div className={classes.LowerIndividualContainer}>
                                                        <div style={{paddingRight:"20px"}}>
                                                            <img src={item.Active_Skill.Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                        </div>
                                                        <div style={{wordBreak: 'break-word'}}>
                                                            {getDescription(item.Active_Skill.Desc,item.Active_Skill_Figure)}
                                                            <div>
                                                                {item.Active_Skill.AI_Desc}
                                                            </div>
                                                            <div>
                                                                Books: {item.Active_Book}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {item.Ultimate_Skill.Name !== "None" && <div className={classes.skillContainer}>
                                                    <div className={classes.UpperIndividualContainer}>
                                                        <div className={classes.UpperIndividualTitle}>
                                                            {item.Ultimate_Skill.Name}
                                                        </div>
                                                        <div>
                                                            {item.Astromon_Info.Super_Skill_Target}
                                                        </div>
                                                    </div>
                                                    <div className={classes.LowerIndividualContainer}>
                                                        <div style={{paddingRight:"20px"}}>
                                                            <img src={item.Ultimate_Skill.Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                        </div>
                                                        <div style={{wordBreak: 'break-word'}}>
                                                            {getDescription(item.Ultimate_Skill.Desc,item.Ultimate_Skill_Figure)}
                                                        </div>
                                                    </div>
                                                </div>}
                                                <div className={classes.skillContainer}>
                                                    <div className={classes.IndividualElementContainer}>
                                                        <div className={classes.UpperIndividualContainer}>
                                                            <div className={classes.UpperIndividualTitle}>
                                                                {item.Astromon_Info.Passive_Skill_Name}
                                                            </div>
                                                            <div>
                                                                {item.Astromon_Info.Passive_Skill_Target}
                                                            </div>
                                                        </div>
                                                        <div className={classes.LowerIndividualContainer}>
                                                            <div style={{paddingRight:"20px"}}>
                                                                <img src={item.Astromon_Info.Passive_Skill_Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                            </div>
                                                            <div style={{wordBreak: 'break-word'}}>
                                                                {item.Astromon_Info.Passive_Skill_Desc}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={classes.skillContainer}>
                                                    <div className={classes.IndividualElementContainer}>
                                                        <div className={classes.UpperIndividualContainer}>
                                                            <div className={classes.UpperIndividualTitle}>
                                                                {item.Astromon_Info.Active_Skill_Name}
                                                            </div>
                                                            <div>
                                                                {item.Astromon_Info.Active_Skill_Target}
                                                            </div>
                                                        </div>
                                                        <div className={classes.LowerIndividualContainer}>
                                                            <div style={{paddingRight:"20px"}}>
                                                                <img src={item.Astromon_Info.Active_Skill_Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                            </div>
                                                            <div style={{wordBreak: 'break-word'}}>
                                                                {item.Astromon_Info.Active_Skill_Desc}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {item.Astromon_Info.Super_Skill_Name !== "" && <div className={classes.skillContainer}>
                                                    {item.Astromon_Info.Super_Skill_Name !== "" && <div className={classes.IndividualElementContainer}>
                                                        <div className={classes.UpperIndividualContainer}>
                                                            <div className={classes.UpperIndividualTitle}>
                                                                {item.Astromon_Info.Super_Skill_Name}
                                                            </div>
                                                            <div>
                                                                {item.Astromon_Info.Super_Skill_Target}
                                                            </div>
                                                        </div>
                                                        <div className={classes.LowerIndividualContainer}>
                                                            <div style={{paddingRight:"20px"}}>
                                                                <img src={item.Astromon_Info.Super_Skill_Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                            </div>
                                                            <div style={{wordBreak: 'break-word'}}>
                                                                {item.Astromon_Info.Super_Skill_Desc}
                                                            </div>
                                                        </div>
                                                    </div>}
                                                </div>}
                                            </div>
                                        </div>
                                    </div>)}
                                </div>
                            </Tab>}
                            {astromon.Ultimate.length > 0 && <Tab eventKey="Ultimate Evo" title="Ultimate Evo">
                                <div className={classes.MainContainer}>
                                    {astromon.Ultimate.map((item,index) => <div className={classes.IndividualContainer} key={item._id || index}>
                                        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                            <div className={classes.conditionalContainer}>
                                                <div className={classes.AtromonWrapperContainer} style={{backgroundImage: `url(${item.URL})`}}>
                                                    <img src={getFrameImageUrl(item)} alt={"..."} className={classes.AstromonFrame}/>
                                                    <img src={getElement(item)} alt={"..."} className={classes.AstromonElement}/>
                                                    <div className={classes.AstromonStarContainer} style={isMobile ? { marginLeft: `${(item.Star - 1) * 17}px` } : { marginLeft: `${(item.Star - 1) * 9}px` }}>
                                                        {[...Array(Number(item.Star))].map((_, index) => (
                                                            <img key={index} src={Star} alt={"..."} className={classes.AstromonStar} style={isMobile ? {transform: `translateX(${index * -18}px)`} : { transform: `translateX(${index * -9}px)` }}/>
                                                        ))}
                                                    </div>
                                                    <div className={classes.TypeContainerA} style={{transform: 'translate(0px, 80px)',fontWeight:'bold',position:'absolute'}}>
                                                        Tank
                                                    </div>
                                                </div>
                                                <div className={classes.TypeContainerB} style={{marginTop:"5px",fontWeight:'bold'}}>
                                                    Tank
                                                </div>
                                                <div className={classes.statContainer} style={{textAlign:'center'}}>
                                                    <div style={{fontWeight:'bold'}}>
                                                        Lv60 Stats
                                                    </div>
                                                    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                        <div style={{paddingRight:'7px'}}>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"HP" + item.HP}>
                                                                    HP:
                                                                </p>
                                                                <p>
                                                                    {item.HP}
                                                                </p>
                                                            </div>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"Attack" + item.Attack}>
                                                                    Attack:
                                                                </p>
                                                                <p>
                                                                    {item.Attack}
                                                                </p>
                                                            </div>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"Defense" + item.Defence}>
                                                                    Defense:
                                                                </p>
                                                                <p>
                                                                    {item.Defence}
                                                                </p>
                                                            </div>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"Recovery" + item.Recovery}>
                                                                    Recovery:
                                                                </p>
                                                                <p>
                                                                    {item.Recovery}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div style={{paddingLeft:'7px'}}>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"CriticalDmg" + item.Critical_Dmg}>
                                                                    Crit Dmg:
                                                                </p>
                                                                <p>
                                                                    {item.Critical_Dmg}
                                                                </p>
                                                            </div>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"CriticalRate" + item.Critical_Rate}>
                                                                    Crit Rate:
                                                                </p>
                                                                <p>
                                                                    {item.Critical_Rate}
                                                                </p>
                                                            </div>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"Resist" + item.Resist}>
                                                                    Resist:
                                                                </p>
                                                                <p>
                                                                    {item.Resist}
                                                                </p>
                                                            </div>
                                                            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                                <p style={{fontWeight:'bold'}} key={"CriticalResist" + item.Critical_Resist}>
                                                                    Crit Res:
                                                                </p>
                                                                <p>
                                                                    {item.Critical_Resist}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={classes.mediaQueryContainer}>
                                                <div className={classes.skillContainer} key={item._id + item.Leader_Skill.Name}>
                                                    <div className={classes.UpperIndividualContainer}>
                                                        <div className={classes.UpperIndividualTitle}>
                                                            {item.Leader_Skill.Name}
                                                        </div>
                                                        <div>
                                                            Leader Skill
                                                        </div>
                                                    </div>
                                                    <div className={classes.LowerIndividualContainer}>
                                                        <div style={{paddingRight:"20px"}}>
                                                            <img src={item.Leader_Skill.Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                        </div>
                                                        <div style={{wordBreak: 'break-word'}} key={item._id + "1"}>
                                                            {getDescription(item.Leader_Skill.Desc,item.Leader_Skill_Figure)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={classes.skillContainer}>
                                                    <div className={classes.UpperIndividualContainer}>
                                                        <div className={classes.UpperIndividualTitle}>
                                                            {item.Passive_Skill.Name}
                                                        </div>
                                                        <div>
                                                            {item.Astromon_Info.Passive_Skill_Target}
                                                        </div>
                                                    </div>
                                                    <div className={classes.LowerIndividualContainer}>
                                                        <div style={{paddingRight:"20px"}}>
                                                            <img src={item.Passive_Skill.Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                        </div>
                                                        <div style={{wordBreak: 'break-word'}}>
                                                            {getDescription(item.Passive_Skill.Desc,item.Passive_Skill_Figure)}
                                                            <div>
                                                                {item.Passive_Skill.AI_Desc}
                                                            </div>
                                                            <div>
                                                                {item.Passive_Book}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={classes.skillContainer}>
                                                    <div className={classes.UpperIndividualContainer}>
                                                        <div className={classes.UpperIndividualTitle}>
                                                            {item.Active_Skill.Name}
                                                        </div>
                                                        <div>
                                                            {item.Astromon_Info.Active_Skill_Target}
                                                        </div>
                                                    </div>
                                                    <div className={classes.LowerIndividualContainer}>
                                                        <div style={{paddingRight:"20px"}}>
                                                            <img src={item.Active_Skill.Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                        </div>
                                                        <div style={{wordBreak: 'break-word'}}>
                                                            {getDescription(item.Active_Skill.Desc,item.Active_Skill_Figure)}
                                                            <div>
                                                                {item.Active_Skill.AI_Desc}
                                                            </div>
                                                            <div>
                                                                Books: {item.Active_Book}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {item.Ultimate_Skill.Name !== "None" && <div className={classes.skillContainer}>
                                                    <div className={classes.UpperIndividualContainer}>
                                                        <div className={classes.UpperIndividualTitle}>
                                                            {item.Ultimate_Skill.Name}
                                                        </div>
                                                        <div>
                                                            {item.Astromon_Info.Super_Skill_Target}
                                                        </div>
                                                    </div>
                                                    <div className={classes.LowerIndividualContainer}>
                                                        <div style={{paddingRight:"20px"}}>
                                                            <img src={item.Ultimate_Skill.Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                        </div>
                                                        <div style={{wordBreak: 'break-word'}}>
                                                            {getDescription(item.Ultimate_Skill.Desc,item.Ultimate_Skill_Figure)}
                                                        </div>
                                                    </div>
                                                </div>}
                                                <div className={classes.skillContainer}>
                                                    <div className={classes.IndividualElementContainer}>
                                                        <div className={classes.UpperIndividualContainer}>
                                                            <div className={classes.UpperIndividualTitle}>
                                                                {item.Astromon_Info.Passive_Skill_Name}
                                                            </div>
                                                            <div>
                                                                {item.Astromon_Info.Passive_Skill_Target}
                                                            </div>
                                                        </div>
                                                        <div className={classes.LowerIndividualContainer}>
                                                            <div style={{paddingRight:"20px"}}>
                                                                <img src={item.Astromon_Info.Passive_Skill_Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                            </div>
                                                            <div style={{wordBreak: 'break-word'}}>
                                                                {item.Astromon_Info.Passive_Skill_Desc}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={classes.skillContainer}>
                                                    <div className={classes.IndividualElementContainer}>
                                                        <div className={classes.UpperIndividualContainer}>
                                                            <div className={classes.UpperIndividualTitle}>
                                                                {item.Astromon_Info.Active_Skill_Name}
                                                            </div>
                                                            <div>
                                                                {item.Astromon_Info.Active_Skill_Target}
                                                            </div>
                                                        </div>
                                                        <div className={classes.LowerIndividualContainer}>
                                                            <div style={{paddingRight:"20px"}}>
                                                                <img src={item.Astromon_Info.Active_Skill_Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                            </div>
                                                            <div style={{wordBreak: 'break-word'}}>
                                                                {item.Astromon_Info.Active_Skill_Desc}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {item.Astromon_Info.Super_Skill_Name !== "" && <div className={classes.skillContainer}>
                                                   <div className={classes.IndividualElementContainer}>
                                                        <div className={classes.UpperIndividualContainer}>
                                                            <div className={classes.UpperIndividualTitle}>
                                                                {item.Astromon_Info.Super_Skill_Name}
                                                            </div>
                                                            <div>
                                                                {item.Astromon_Info.Super_Skill_Target}
                                                            </div>
                                                        </div>
                                                        <div className={classes.LowerIndividualContainer}>
                                                            <div style={{paddingRight:"20px"}}>
                                                                <img src={item.Astromon_Info.Super_Skill_Url} alt="..." style={{height: "60px", width: "60px"}} />
                                                            </div>
                                                            <div style={{wordBreak: 'break-word'}}>
                                                                {item.Astromon_Info.Super_Skill_Desc}
                                                            </div>
                                                        </div>
                                                   </div>
                                                </div>}
                                            </div>
                                        </div>
                                    </div>)}
                                </div>
                            </Tab>}
                        </Tabs>
                    </div>
                </div>
            </div>}
        </React.Fragment>
    );
};

export default IndividualAstromon;
