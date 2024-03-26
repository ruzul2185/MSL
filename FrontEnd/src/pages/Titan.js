import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllTitan, getTitanAdvice} from "../stores/actions/auth";
import Table from "react-bootstrap/Table";
import classes from "../styles/DimensionalDefense.module.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import {useNavigate, useParams} from "react-router-dom";
import {TextCard} from "../components/Cards";

const Titan = () => {
    const { state } = useParams();
    const navigate= useNavigate();
    const [key, setKey] = useState(state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllTitan());
    },[dispatch]);

    useEffect(() => {
        dispatch(getTitanAdvice(state));
    },[dispatch,state]);

    useEffect(()=>{
        navigate('/titan/' + key);
    },[key])

    const TitanList = useSelector(state => state.auth.titanList);
    const TitanAdviceArray = useSelector(state => state.auth.titanAdvice);

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

    return(
        <React.Fragment>
            <div style={{width:"100%", textAlign:"center",display:'flex',flexDirection:'column',alignItems:"center"}}>
                <div style={{fontSize:'xx-large'}}>
                    Region Defense
                </div>
                {TitanList && <div className="container">
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
                                {TitanList.map((item) => (
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
                                            </tr>
                                            </tbody>
                                        </Table>
                                    </Tab>
                                ))}
                            </Tabs>
                        </div>
                    </div>
                </div>}
                {TitanAdviceArray && TitanAdviceArray.map((item) => (
                    <TextCard key={item._id} Title={item.Title} SubTitle={""} Message={item.Body} />
                ))}
            </div>
        </React.Fragment>
    );
};

export default Titan;