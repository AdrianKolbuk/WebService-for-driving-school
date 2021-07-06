import React from "react";

function FormSelectOptionBasic(props) {
    const element = props.element
    const fieldA = props.isCategory ? "B" : "Tak"
    const fieldB = props.isCategory ? "A" : "Nie"

    if (props.isCategory) {
        return (
            <React.Fragment>
                <option value={"B"}>{fieldA}</option>
                <option value={"A"}>{fieldB}</option>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <option value={1}>{fieldA}</option>
                <option value={0}>{fieldB}</option>
            </React.Fragment>
        )
    }
}

export default FormSelectOptionBasic