import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import formMode from '../../helpers/formHelper'
import { checkRequired, checkTextLengthRange, checkEmail, checkNumber, checkNumberRange, checkDate, checkDateIfAfter } from '../../helpers/validationCommon'
import { getEmployeesApiCall, getEmployeeByIdApiCall } from '../../apiCalls/employeeApiCalls'
import { getHistoryApiCall, getHistoryByIdApiCall, addHistoryApiCall, updateHistoryApiCall } from '../../apiCalls/historyApiCalls'
import FormInput from '../form/FormInput'
import FormButtons from '../form/FormButtons'
import FormSelect from "../form/FormSelect";
import { getTrainingsApiCall, getTrainingByIdApiCall } from '../../apiCalls/trainingApiCalls'

class HistoryForm extends React.Component {
    constructor(props) {
        super(props)

        const paramsTrainingHistoryId = props.match.params.historyId
        const currentFormMode = paramsTrainingHistoryId ? formMode.EDIT : formMode.NEW

        this.state = {
            historyId: paramsTrainingHistoryId,
            history: {
                emp_id: '',
                training_id: '',
                dateFrom: '',
                dateTo: '',
                opinion: '',
            },
            errors: {
                emp_id: '',
                training_id: '',
                dateFrom: '',
                dateTo: '',
                opinion: '',
            },
            formMode: currentFormMode,
            redirect: false,
            error: null,
            allEmps: [],
            allTrainings: []
        }
    }

    componentDidMount = () => {
        const currentFormMode = this.state.formMode
        if (currentFormMode === formMode.EDIT) {
            this.fetchHistoryForm()
        }

        getTrainingsApiCall()
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    allTrainings: data
                })
            })
        getEmployeesApiCall()
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    allEmps: data
                })
            })
    }

    fetchHistoryForm = () => {
        getHistoryByIdApiCall(this.state.historyId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            message: data.message
                        })
                    } else {
                        this.setState({
                            history: data,
                            message: null
                        })
                    }
                    this.setState({
                        isLoaded: true,
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                })
    }
    //walidacje
    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';
        if (fieldName === 'emp_id') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            }
        }
        if (fieldName === 'training_id') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            }
        }
        if (fieldName === 'dateFrom') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            } else if (!checkDate(fieldValue)) {
                errorMessage = "Pole powinno zawierać od 5 do 60 znaków";
            }
        }
        if (fieldName === 'dateTo') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            } else if (!checkDate(fieldValue)) {
                errorMessage = "Data ma niewłaściwy format";
            }
        }
        if (fieldName === 'opinion') {
            if (!checkTextLengthRange(fieldValue, 0, 256)) {
                errorMessage = "Max.256 znaków";
            }
        }

        return errorMessage
    }
    //obłsuga zmiany stanu przy edycji
    handleChange = (event) => {
        const { name, value } = event.target
        const history = { ...this.state.history }
        history[name] = value

        const errorMessage = this.validateField(name, value)
        const errors = { ...this.state.errors }
        errors[name] = errorMessage

        this.setState({
            history: history,
            errors: errors
        })
    }
    //obsługa wysłania formularza
    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const
                history = this.state.history,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addHistoryApiCall(history)

            } else if (currentFormMode === formMode.EDIT) {
                console.log(history)
                const historyId = this.state.historyId
                promise = updateHistoryApiCall(historyId, history)
            }
            if (promise) {
                promise
                    .then(
                        (data) => {
                            response = data
                            if (response.status === 201 || response.status === 500) {
                                return data.json()
                            }
                        })
                    .then(
                        (data) => {
                            if (!response.ok && response.status === 500) {
                                console.log(data)
                                for (const i in data) {
                                    const errorItem = data[i]
                                    const errorMessage = errorItem.message
                                    const fieldName = errorItem.path
                                    const errors = { ...this.state.errors }
                                    errors[fieldName] = errorMessage
                                    this.setState({
                                        errors: errors,
                                        error: null
                                    })
                                }
                            } else {
                                this.setState({ redirect: true })
                            }
                        },
                        (error) => {
                            this.setState({ error })
                            console.log(error)
                        }
                    )
            }

        }
    }

    validateForm = () => {
        const history = this.state.history
        const errors = this.state.errors
        for (const fieldName in history) {
            const fieldValue = history[fieldName]
            const errorMessage = this.validateField(fieldName, fieldValue)
            errors[fieldName] = errorMessage
        }
        this.setState({
            errors: errors
        })
        return !this.hasErrors()
    }

    hasErrors = () => {
        const errors = this.state.errors
        for (const errorField in this.state.errors) {
            if (errors[errorField].length > 0) {
                return true
            }
        }
        return false
    }

    render() {
        const { redirect } = this.state
        if (redirect) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? 'Pomyślnie dodano szkolenie do historii' : 'Pomyślnie zaktualizowano przeprowadzone szkolenie'
            return (
                <Redirect to={{
                    pathname: "/history/",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }

        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? 'Dodawanie szkolenia do historii' : 'Edycja przeprowadzonego szkolenia'
        const globalErrorMessage = errorsSummary || fetchError || this.state.message

        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormSelect
                        label="Pracownik"
                        required
                        error={this.state.errors.emp_id}
                        name="emp_id"
                        onChange={this.handleChange}
                        value={this.state.history.emp_id}
                        list={this.state.allEmps}
                        isEmployee={true}
                        id={this.state.history.emp_id}
                    />
                    <FormSelect
                        label="Szkolenie"
                        required
                        error={this.state.errors.training_id}
                        name="training_id"
                        onChange={this.handleChange}
                        value={this.state.history.training_id}
                        list={this.state.allTrainings}
                        isEmployee={false}
                        id={this.state.history.training_id}
                    />
                    <FormInput
                        type="date"
                        label="Data od"
                        required
                        error={this.state.errors.dateFrom}
                        name="dateFrom"
                        placeholder=" "
                        onChange={this.handleChange}
                        value={this.state.history.dateFrom}
                    />
                    <FormInput
                        type="date"
                        label="Data do"
                        required
                        error={this.state.errors.dateTo}
                        name="dateTo"
                        placeholder=""
                        onChange={this.handleChange}
                        value={this.state.history.dateTo}
                    />
                    <FormInput
                        type="text"
                        label="Opinia klienta"
                        required
                        error={this.state.errors.opinion}
                        name="opinion"
                        placeholder=""
                        onChange={this.handleChange}
                        value={this.state.history.opinion}
                    />
                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/history"
                    />
                </form>
            </main >
        )
    }
}

export default HistoryForm