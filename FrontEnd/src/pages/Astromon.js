import React, {useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import classes from "../styles/Astromon.module.css";
import FilterSelect from "../components/Select";
import {ELEMENT_LIST, NATURAL_RARITY} from "../constants/WebDefine";
import {useDispatch, useSelector} from "react-redux";
import {getAllAstromons} from "../stores/actions/auth";



const Astromon = () => {


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
        console.log(event.target.value)
    };
    const updateStarState = (event) => {
        setStar(event.target.value)
        console.log(event.target.value)
    };

    const updateLeaderSkillState = (event) => {
        setLeaderSkill(event.target.value)
        console.log(event.target.value)
    };

    const updatePassiveSkillState = (event) => {
        setPassiveSkill(event.target.value)
        console.log(event.target.value)
    };

    const updateActiveSkillState = (event) => {
        setActiveSkill(event.target.value)
        console.log(event.target.value)
    };

    const AstromonList = useSelector(state => state.auth.allAstromonList);
    console.log(AstromonList)
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
                        <tr key={item._id} className={classes.IndividualAstromonContainer}>
                            <th scope="row">
                                    <img src={item.URL} alt={"..."} className={classes.AstromonImage}/>
                            </th>
                            <th scope="row">
                                <div className={classes.NameContainer}>
                                    <div>{item.Name}</div>
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
{/*<div key={item._id} className={classes.IndividualAstromonContainer}>*/}
{/*<img src={item.URL} alt={"..."} className={classes.AstromonImage}/>*/}
{/*<div className={classes.NameContainer}>*/}
{/*    <div>{item.Name}</div>*/}
{/*</div>*/}
{/*<div className={classes.StatContainer}>*/}
{/*    <div style={{color:"#FF0000"}}>HP</div>*/}
{/*    <div>{item.HP}</div>*/}
{/*</div>*/}
{/*<div className={classes.StatContainer}>*/}
{/*    <div style={{color:"#FFA500"}}>ATK</div>*/}
{/*    <div>{item.Attack}</div>*/}
{/*</div>*/}
{/*<div className={classes.StatContainer}>*/}
{/*    <div style={{color:"#0000FF"}}>DEF</div>*/}
{/*    <div>{item.Defence}</div>*/}
{/*</div>*/}
{/*<div className={classes.StatContainer}>*/}
{/*    <div style={{color:"#008000"}}>REC</div>*/}
{/*    <div>{item.Recovery}</div>*/}
{/*</div>*/}
{/*<img src={item.Passive_Skill_Object.Url} alt={"..."} className={classes.AstromonImage}/>*/}
{/*<img src={item.Active_Skill_Object.Url} alt={"..."} className={classes.AstromonImage}/>*/}
{/*</div>*/}
export default Astromon;
