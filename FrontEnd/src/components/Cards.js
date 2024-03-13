import Card from 'react-bootstrap/Card';

import classes from '../styles/Card.module.css';

function TextCard(props) {
    return (
        <Card className={classes.WelcomeContainer}>
            <Card.Body>
                <Card.Title className={classes.TextCardTitle}>{props.Title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{props.SubTitle}</Card.Subtitle>
                <Card.Text style={{whiteSpace:"pre-wrap"}}>
                    <span dangerouslySetInnerHTML={{ __html: props.Message }} />
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

function MemberCard(props) {
    return (
        <Card className={classes.WelcomeContainer}>
            <Card.Body>
                <Card.Title className={classes.TextCardTitle}>{props.Title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                <div className={classes.MemberNameContainer}>
                    {props.Array.map((item, index) => (
                        <p key={index} style={{background:"red",color:"white",margin:"10px",padding:"10px",borderRadius:"5px"}}>
                            {item.Name}
                        </p>
                    ))}
                </div>
            </Card.Body>
        </Card>
    );
}

export {TextCard};
export {MemberCard};
