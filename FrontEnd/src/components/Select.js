import Form from 'react-bootstrap/Form';

function FilterSelect(props) {
    return (
        <div>
            <label htmlFor={props.id} style={{display:"block",textAlign:"center",fontWeight:"bold"}}>{props.label}</label>
            <Form.Select id={props.id} aria-label={props.label} style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} onChange={props.updateFilterState}>
                <option key={"None"} value={"None"}>None</option>
                {props.options.map(option => (
                    <option key={option._id} value={option.Name}>{option.Name}</option>
                ))}
            </Form.Select>
        </div>
    );
}

export default FilterSelect;
