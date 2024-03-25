import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllApophis, getApophisTeam} from "../stores/actions/auth";
import Table from 'react-bootstrap/Table';
import classes from '../styles/DimensionalDefense.module.css';
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import {useNavigate, useParams} from "react-router-dom";

const DimensionalDefense = () => {
    const { state } = useParams();
    const [key, setKey] = useState(state);
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const navigate= useNavigate();

    useEffect(() => {
        dispatch(getAllApophis());
    },[dispatch]);

    useEffect(()=>{
        dispatch(getApophisTeam(page,key));
        navigate('/dimensional-defense/' + key + '/?page=' + page);
    },[dispatch,page,key])

    const apophisList = useSelector(state => state.auth.apophisList);
    const ApophisTeamList = useSelector(state => state.auth.apophisTeamList);

    const parenthesisFilter = (item) => {
        if (item.includes('(')) {
            return item.split('(')[0].trim();
        } else {
            return item;
        }
    }

    const descriptionFiller = (figure,desc) => {
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

    return (
        <React.Fragment>
            <div style={{width:"100%", textAlign:"center"}}>
                <div style={{fontSize:'xx-large'}}>
                    Dimensional Defense
                </div>
                {apophisList && <div className="container">
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
                                {apophisList.Apophis.map((item) => (
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
                                            <tr className={classes.row}>
                                                <td className={classes.cell}>
                                                    <div>
                                                        <img src={item.PassiveSkill.Url} alt="..."/>
                                                    </div>
                                                    <div>
                                                        <div>
                                                            {parenthesisFilter(item.PassiveSkill.Name)}
                                                        </div>
                                                        <div style={{fontSize:'small'}}>
                                                            {descriptionFiller(item.PassiveSkillFigure,item.PassiveSkill.Desc)}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className={classes.cell}>
                                                    <div>
                                                        <img src={item.ActiveSkill.Url} alt="..."/>
                                                    </div>
                                                    <div>
                                                        <div>
                                                            {parenthesisFilter(item.ActiveSkill.Name)}
                                                        </div>
                                                        <div style={{fontSize:'small'}}>
                                                            {descriptionFiller(item.ActiveSkillFigure,item.ActiveSkill.Desc)}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className={classes.cell}>
                                                    <div>
                                                        <img src={item.AOESkill.Url} alt="..."/>
                                                    </div>
                                                    <div>
                                                        <div>
                                                            {parenthesisFilter(item.AOESkill.Name)}
                                                        </div>
                                                        <div style={{fontSize:'small'}}>
                                                            {descriptionFiller(item.AOESkillFigure,item.AOESkill.Desc)}
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
                        {ApophisTeamList && ApophisTeamList.DimensionalDefenseTeams.map((item, index) => (
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
                        {ApophisTeamList && <div className={classes.pagination}>
                            <nav aria-label="...">
                                <ul className="pagination">
                                    {ApophisTeamList && [...Array(ApophisTeamList.numOfPages).keys()].map((pageNumber) => (
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

export default DimensionalDefense;