import React, {useEffect, useState} from 'react';
import classes from "../styles/Astromon.module.css";
import FilterSelect from "../components/Select";
import {useNavigate} from 'react-router-dom';
import {ELEMENT_LIST, NATURAL_RARITY} from "../constants/WebDefine";
import {useDispatch, useSelector} from "react-redux";
import {getAllAstromons} from "../stores/actions/auth";

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


const Astromon = () => {

    const navigate= useNavigate();

    const isMobile = window.innerWidth <= 768;

    const [element, setElement] = useState('None');
    const [star, setStar] = useState('None');
    const [leaderSkill, setLeaderSkill] = useState('None');
    const [passiveSkill, setPassiveSkill] = useState('None');
    const [activeSkill, setActiveSkill] = useState('None');

    const [page, setPage] = useState(1);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllAstromons(element,star,leaderSkill,passiveSkill,activeSkill,page));
    },[dispatch,element,star,leaderSkill,passiveSkill,activeSkill,page]);

    const updateElementState = (event) => {
        setElement(event.target.value)
        // console.log(event.target.value)
    };
    const updateStarState = (event) => {
        setStar(event.target.value)
        // console.log(event.target.value)
    };

    const updateLeaderSkillState = (event) => {
        setLeaderSkill(event.target.value)
        // console.log(event.target.value)
    };

    const updatePassiveSkillState = (event) => {
        setPassiveSkill(event.target.value)
        // console.log(event.target.value)
    };

    const updateActiveSkillState = (event) => {
        setActiveSkill(event.target.value)
        // console.log(event.target.value)
    };

    const AstromonList = useSelector(state => state.auth.allAstromonList);
    // console.log(AstromonList)

    function getFrameImageUrl(item) {
        if(item.Evolution_Level === 'Evo 1'){
            return bronzeFrame;
        } else if(item.Evolution_Level === 'Evo 2'){
            return silverFrame;
        } else if (item.Evolution_Level === 'Evo 3') {
            return goldenFrame;
        } else if (item.Evolution_Level === 'Super Evo') {
            return superFrame;
        } else if (item.Evolution_Level === 'Ultimate Evo') {
            return superFrame;
        }
    }

    function getElement(item) {
        if(item.Element === 'Fire'){
            return Fire;
        } else if(item.Element === 'Water'){
            return Water;
        } else if (item.Element === 'Wood') {
            return Wood;
        } else if (item.Element === 'Light') {
            return Light;
        } else if (item.Element === 'Dark') {
            return Dark;
        }
    }

    const viewAstromon = (item,Evo) => {
        let id = item.includes("(") && item.includes(")")
            ? item.split("(")[1].split(")")[0].trim()  // Extract substring within parentheses and trim
            : item.trim();
        navigate('/astromon/'+`${id}`+ '/?state=' + Evo);
    }

    return(
        <div className={classes.MainContainer}>
            <div className={classes.TitleContainer}>
                Astromons
            </div>
            {AstromonList && <div className={classes.FilterContainer}>
                <div className={classes.SelectContainer}>
                    <FilterSelect label={"Element:"} options={ELEMENT_LIST} updateFilterState={updateElementState} id={"0001"}/>
                </div>
                <div className={classes.SelectContainer}>
                    <FilterSelect label={"Natural Rarity:"} options={NATURAL_RARITY} updateFilterState={updateStarState} id={"0002"}/>
                </div>
                <div className={classes.SelectContainer}>
                    <FilterSelect label={"Leader Skill:"} options={AstromonList.leaderSkills} updateFilterState={updateLeaderSkillState} id={"0003"}/>
                </div>
                <div className={classes.SelectContainer}>
                    <FilterSelect label={"Passive Skill:"} options={AstromonList.passiveSkills} updateFilterState={updatePassiveSkillState} id={"0004"}/>
                </div>
                <div className={classes.SelectContainer}>
                    <FilterSelect label={"Active Skill:"} options={AstromonList.activeSkills} updateFilterState={updateActiveSkillState} id={"0005"}/>
                </div>
            </div>}
            {AstromonList && <div className={classes.AstromonContainer}>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                {AstromonList.astromonData.map((item) => (
                        <tr key={item._id} className={classes.IndividualAstromonContainer} onClick={()=> viewAstromon(item.Name,item.Evolution_Level)}>
                            <th scope="row">
                                    <div className={classes.AstromonWrapperContainer} style={{backgroundImage: `url(${item.URL})`}}>
                                        <img src={getFrameImageUrl(item)} alt={"..."} className={classes.AstromonFrame}/>
                                        <img src={getElement(item)} alt={"..."} className={classes.AstromonElement}/>
                                        <div className={classes.AstromonStarContainer} style={isMobile ? { marginLeft: `${(item.Star - 1) * 6}px` } : { marginLeft: `${(item.Star - 1) * 9}px` }}>
                                            {[...Array(Number(item.Star))].map((_, index) => (
                                                <img key={index} src={Star} alt={"..."} className={classes.AstromonStar} style={isMobile ? {transform: `translateX(${index * -6}px)`} : { transform: `translateX(${index * -9}px)` }}/>
                                            ))}
                                        </div>
                                    </div>
                            </th>
                            <th scope="row">
                                <div className={classes.NameContainer}>
                                    <div>{item.Name.includes("(") ? item.Name.split("(")[0] : item.Name}</div>
                                </div>
                            </th>
                            <th scope="row">
                                <div className={classes.StatContainer}>
                                    <div style={{color:"#FF0000"}}>HP</div>
                                    <div>{item.HP}</div>
                                </div>
                            </th>
                            <th scope="row">
                                <div className={classes.StatContainer}>
                                    <div style={{color:"#FFA500"}}>ATK</div>
                                    <div>{item.Attack}</div>
                                </div>
                            </th>
                            <th scope="row">
                                <div className={classes.StatContainer}>
                                    <div style={{color:"#0000FF"}}>DEF</div>
                                    <div>{item.Defence}</div>
                                </div>
                            </th>
                            <th scope="row">
                                <div className={classes.StatContainer}>
                                    <div style={{color:"#008000"}}>REC</div>
                                    <div>{item.Recovery}</div>
                                </div>
                            </th>
                            <th scope="row">
                                <img src={item.Passive_Skill_Object.Url} alt={"..."} className={classes.AstromonImage}/>
                            </th>
                            <th scope="row">
                                <img src={item.Active_Skill_Object.Url} alt={"..."} className={classes.AstromonImage}/>
                            </th>
                        </tr>
                ))}
                    </tbody>
                </table>
            </div>}
            <div>
                <nav aria-label="...">
                    <ul className="pagination">
                        {AstromonList && [...Array(AstromonList.numOfPages).keys()].map((pageNumber) => (
                            <li key={pageNumber} className={`page-item ${pageNumber + 1 === page ? 'active' : ''}`}>
                                <button
                                    className={`page-link ${pageNumber + 1 === page ? 'active-link' : ''}`}
                                    onClick={() => setPage(pageNumber + 1)}
                                    style={{ backgroundColor: pageNumber + 1 === page ? 'red' : 'inherit',fontWeight:"bold" }}
                                >
                                    {pageNumber + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Astromon;
