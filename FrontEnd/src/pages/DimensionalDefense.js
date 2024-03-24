import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllApophis} from "../stores/actions/auth";
import Table from 'react-bootstrap/Table';
import classes from '../styles/DimensionalDefense.module.css';
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

const DimensionalDefense = () => {

    const isMobile = window.innerWidth <= 768;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllApophis());
    },[dispatch]);

    const apophisList = useSelector(state => state.auth.apophisList);

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
                                defaultActiveKey="Dark"
                                id="uncontrolled-tab-example"
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
                    </div>
                </div>}
            </div>
        </React.Fragment>
    );
};

export default DimensionalDefense;