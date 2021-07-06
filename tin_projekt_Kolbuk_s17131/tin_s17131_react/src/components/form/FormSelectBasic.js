import React from 'react'
import FormSelectOptionBasic from "./FormSelectOptionBasic"

function FormSelectBasic(props) {
    const className = props.error === '' ? '' : 'error-input'
    const name = props.name
    const errorSpanId = 'error' + name[0].toUpperCase() + name.slice(1)

    return (
        <>
            <label htmlFor={props.name}>
                {props.label} : {props.required && <abbr title="required" aria-label="required">*</abbr>}
            </label>

            <select
                className={className}
                name={props.name}
                id={props.name}
                onChange={props.onChange}>
                <option value={""} selected={""}>--- Wybierz ---</option>
                <FormSelectOptionBasic isCategory={props.isCategory} id={props.id} />

            </select>
            <span id={errorSpanId} className={"errors-text"}>{props.errors}</span>
        </>
    )
}

export default FormSelectBasic