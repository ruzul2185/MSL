import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllDimensionalGolem, getGolemTeam,} from "../stores/actions/auth";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from "react-bootstrap/Table";
import classes from '../styles/DimensionalGolem.module.css';
import sections from "../styles/Titan.module.css";
import {useNavigate, useParams} from "react-router-dom";

const DimensionalGolem = () => {
    const navigate = useNavigate();
    const { state } = useParams();
    const dispatch = useDispatch();
    const [key, setKey] = useState(state);
    const [page, setPage] = useState(1);
    useEffect(() => {
        dispatch(getAllDimensionalGolem());
    },[dispatch]);

    useEffect(()=>{
        dispatch(getGolemTeam(page,key));
        navigate('/dimensional-golem/' + key + '/?page=' + page);
    },[dispatch,page,key])

    const DimensionalGolemList = useSelector(state => state.auth.dimensionalGolemList);
    const GolemTeamList = useSelector(state => state.auth.golemTeamList);
    const descriptionFiller = (figure,desc) => {
        const elements = figure.split(",");
        const newDescParts = desc.split('&');
        if(elements[0] === '0'){
            return desc;
        }
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
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:"100%"}}>
            <div style={{fontSize:'xx-large'}}>
                Dimensional Golem
            </div>
            {DimensionalGolemList && <div className="container">
                <div className="row">
                    <div className="col">
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={key}
                            onSelect={(k) => {
                                setKey(k);
                            }}
                            className="mb-3"
                        >
                            {DimensionalGolemList.map((item) => (
                                <Tab key={item._id} eventKey={item.Element} title={item.Element}>
                                    <Table hover>
                                        <thead>
                                        <tr>
                                            <th colSpan={3} style={{textAlign:"center",padding:'10px'}}>
                                                <img src={item.URL} alt={"..."}/>
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td style={{textAlign:"center",fontWeight:'bold'}} colSpan="3">Abilities</td>
                                        </tr>
                                        <tr className={classes.row}>
                                            <td className={classes.cell}>
                                                <div>
                                                    <img src={item.SkillOneUrl} alt="..."/>
                                                </div>
                                                <div>
                                                    <div>
                                                        {item.SkillOne}
                                                    </div>
                                                    <div style={{fontSize:'small'}}>
                                                        {item.SkillOneDesc}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={classes.cell}>
                                                <div>
                                                    <img src={item.SkillSecondUrl} alt="..."/>
                                                </div>
                                                <div>
                                                    <div>
                                                        {item.SkillSecond}
                                                    </div>
                                                    <div style={{fontSize:'small'}}>
                                                        {item.SkillSecondDesc}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={classes.cell}>
                                                <div>
                                                    <img src={item.SkillThirdUrl} alt="..."/>
                                                </div>
                                                <div>
                                                    <div>
                                                        {item.SkillThird}
                                                    </div>
                                                    <div style={{fontSize:'small'}}>
                                                        {item.SkillThirdDesc}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className={classes.row}>
                                            <td className={classes.cell}>
                                                <div>
                                                    <img src={item.PassiveSkillOne.Url} alt="..."/>
                                                </div>
                                                <div>
                                                    <div>
                                                        {item.PassiveSkillOne.Name}
                                                    </div>
                                                    <div style={{fontSize:'small'}}>
                                                        {descriptionFiller(item.PassiveSkillOneFigure,item.PassiveSkillOne.Desc)}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={classes.cell}>
                                                <div>
                                                    <img src={item.PassiveSkillSecond.Url} alt="..."/>
                                                </div>
                                                <div>
                                                    <div>
                                                        {item.PassiveSkillSecond.Name}
                                                    </div>
                                                    <div style={{fontSize:'small'}}>
                                                        {descriptionFiller(item.PassiveSkillSecondFigure,item.PassiveSkillSecond.Desc)}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={classes.cell}>
                                                <div>
                                                    <img src={item.PassiveSkillThird.Url} alt="..."/>
                                                </div>
                                                <div>
                                                    <div>
                                                        {item.PassiveSkillThird.Name}
                                                    </div>
                                                    <div style={{fontSize:'small'}}>
                                                        {descriptionFiller(item.PassiveSkillThirdFigure,item.PassiveSkillThird.Desc)}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{textAlign:"center",fontWeight:'bold'}} colSpan="3">Passive Buffs</td>
                                        </tr>
                                        <tr className={classes.row}>
                                            <td className={classes.cell}>
                                                <div>
                                                    <img src={item.PassiveBuffOneUrl} alt="..."/>
                                                </div>
                                                <div>
                                                    <div>
                                                        {item.PassiveBuffOne}
                                                    </div>
                                                    <div style={{fontSize:'small'}}>
                                                        {item.PassiveBuffOneDesc}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={classes.cell}>
                                                <div>
                                                    <img src={item.PassiveBuffSecondUrl} alt="..."/>
                                                </div>
                                                <div>
                                                    <div>
                                                        {item.PassiveBuffSecond}
                                                    </div>
                                                    <div style={{fontSize:'small'}}>
                                                        {item.PassiveBuffSecondDesc}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={classes.cell}>
                                                <div>
                                                    <img src={item.PassiveBuffThirdUrl} alt="..."/>
                                                </div>
                                                <div>
                                                    <div>
                                                        {item.PassiveBuffThird}
                                                    </div>
                                                    <div style={{fontSize:'small'}}>
                                                        {descriptionFiller(item.PassiveBuffThirdFigure,item.PassiveBuffThirdDesc)}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                </Tab>
                            ))}
                        </Tabs>
                    </div>
                    {GolemTeamList && GolemTeamList.DimensionalGolemTeams.map((item, index) => (
                        <div>
                            <div style={{fontSize:"large",fontWeight:"bold"}}>
                                {item.Name}
                            </div>
                            <div>
                                <div className={classes.imageContainer}>
                                    <img src={item.TeamURL} alt={'...'} className={classes.image}/>
                                    <img src={item.TeamDamage} alt={'...'} className={classes.image}/>
                                </div>
                            </div>
                        </div>
                    ))}
                    {GolemTeamList && <div className={classes.pagination}>
                        <nav aria-label="...">
                            <ul className="pagination">
                                {GolemTeamList && [...Array(GolemTeamList.numOfPages).keys()].map((pageNumber) => (
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
                    </div>}
                </div>
            </div>}
            </div>
        </React.Fragment>
    );
};

export default DimensionalGolem;