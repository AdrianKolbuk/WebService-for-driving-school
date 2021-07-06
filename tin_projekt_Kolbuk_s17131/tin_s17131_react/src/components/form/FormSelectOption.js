import React from "react";

function FormSelectOption(props) {
    const element = props.element
    const fieldA = props.isEmployee ? element.firstName : element.trainingType
    const fieldB = props.isEmployee ? element.lastName : ", czas trwania:" + element.duration
    const fieldC = props.isEmployee ? " " : ", poziom:" + element.level

    return (
        <React.Fragment>
            <option selected={element.id === props.id} value={element.id}>{fieldA + " " + fieldB + " " + fieldC}</option>
        </React.Fragment>
    )
}

export default FormSelectOption