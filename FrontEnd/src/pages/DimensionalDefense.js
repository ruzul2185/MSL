import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllApophis} from "../stores/actions/auth";
import Table from 'react-bootstrap/Table';
import classes from '../styles/DimensionalDefense.module.css';

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
                <div>
                    <Table border="true" hover>
                        <thead>
                        <tr>
                        </tr>
                        </thead>
                        <tbody>
                        {apophisList && apophisList.Apophis.map((item) => (
                            <tr className={classes.tableQuery} key={item._id}>
                                <td className={classes.cell}>
                                    <p style={{fontSize:'large'}}>Apophis ({item.Element})</p>
                                    <img src={item.URL} alt={"..."} />
                                </td>
                                <td className={classes.cell}>
                                    <p style={{fontSize:'medium'}}>{parenthesisFilter(item.PassiveSkill.Name)}</p>
                                    <img src={item.PassiveSkill.Url} alt={"..."} />
                                    <div>{descriptionFiller(item.PassiveSkillFigure,item.PassiveSkill.Desc)}</div>
                                </td>
                                <td className={classes.cell}>
                                    <p style={{fontSize:'medium'}}>{parenthesisFilter(item.ActiveSkill.Name)}</p>
                                    <img src={item.ActiveSkill.Url} alt={"..."} />
                                    <div>{descriptionFiller(item.ActiveSkillFigure,item.ActiveSkill.Desc)}</div>
                                </td>
                                <td className={classes.cell}>
                                    <p style={{fontSize:'medium'}}>{parenthesisFilter(item.AOESkill.Name)}</p>
                                    <img src={item.AOESkill.Url} alt={"..."} />
                                    <div>{descriptionFiller(item.AOESkillFigure,item.AOESkill.Desc)}</div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </React.Fragment>
    );
};

export default DimensionalDefense;