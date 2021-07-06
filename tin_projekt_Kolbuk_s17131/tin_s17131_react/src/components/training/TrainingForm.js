import React from "react"
import { Redirect } from "react-router-dom"
import formMode from '../../helpers/formHelper'
import { checkRequired, checkTextLengthRange, checkEmail, checkNumber, checkNumberRange, checkDate } from '../../helpers/validationCommon'
import { getTrainingByIdApiCall, addTrainingApiCall, updateTrainingApiCall } from '../../apiCalls/trainingApiCalls'
import FormInput from '../form/FormInput'
import FormButtons from '../form/FormButtons'

class TrainingForm extends React.Component {
    constructor(props) {
        super(props)

        const paramsTrainingId = props.match.params.trainingId
        const currentFormMode = paramsTrainingId ? formMode.EDIT : formMode.NEW

        this.state = {
            trainingId: paramsTrainingId,
            training: {
                trainingType: '',
                duration: '',
                level: '',
                price: ''
            },
            errors: {
                trainingType: '',
                duration: '',
                level: '',
                price: ''
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }

    componentDidMount = () => {
        const currentFormMode = this.state.formMode
        if (currentFormMode === formMode.EDIT) {
            this.fetchTrainingDetails()
        }
    }

    fetchTrainingDetails = () => {
        getTrainingByIdApiCall(this.state.trainingId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            message: data.message
                        })
                    } else {
                        this.setState({
                            training: data,
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
        if (fieldName === 'trainingType') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            } else if (!checkTextLengthRange(fieldValue, 2, 64)) {
                errorMessage = 'Pole powinno zawierać od 2 do 64 znaków'
            }
        }
        if (fieldName === 'duration') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            } else if (!checkNumberRange(fieldValue, 1, 3)) {
                errorMessage = 'Pole powinno być liczbą w zakresie 1-3'
            } else if (!checkNumber(fieldValue)) {
                errorMessage = 'Pole powinno być liczbą'
            }
        }
        if (fieldName === 'level') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            } else if (!checkNumberRange(fieldValue, 1, 3)) {
                errorMessage = 'Pole powinno być liczbą w zakresie 1-3'
            } else if (!checkNumber(fieldValue)) {
                errorMessage = 'Pole powinno być liczbą'
            }
        }
        if (fieldName === 'price') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            } else if (!checkNumberRange(fieldValue, 100, 500)) {
                errorMessage = 'Pole powinno być liczbą w zakresie 100-500'
            } else if (!checkNumber(fieldValue)) {
                errorMessage = 'Pole powinno być liczbą'
            }
        }

        return errorMessage
    }
    //obłsuga zmiany stanu przy edycji
    handleChange = (event) => {
        const { name, value } = event.target
        const training = { ...this.state.training }
        training[name] = value

        const errorMessage = this.validateField(name, value)
        const errors = { ...this.state.errors }
        errors[name] = errorMessage

        this.setState({
            training: training,
            errors: errors
        })
    }
    //obsługa wysłania formularza
    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const
                training = this.state.training,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addTrainingApiCall(training)

            } else if (currentFormMode === formMode.EDIT) {
                console.log(training)
                const trainingId = this.state.trainingId
                promise = updateTrainingApiCall(trainingId, training)
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
        const training = this.state.training
        const errors = this.state.errors
        for (const fieldName in training) {
            const fieldValue = training[fieldName]
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
            const notice = currentFormMode === formMode.NEW ? 'Pomyślnie dodano nowe szkolenie' : 'Pomyślnie zaktualizowano szkolenie'
            return (
                <Redirect to={{
                    pathname: "/trainings",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }

        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? 'Nowe szkolenie' : 'Edycja szkolenia'

        const globalErrorMessage = errorsSummary || fetchError || this.state.message

        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label="Typ szkolenia"
                        required
                        error={this.state.errors.trainingType}
                        name="trainingType"
                        placeholder="2-64 znaków"
                        onChange={this.handleChange}
                        value={this.state.training.trainingType}
                    />
                    <FormInput
                        type="number"
                        label="Czas trwania(h)"
                        required
                        error={this.state.errors.duration}
                        name="duration"
                        placeholder="1-3 h"
                        onChange={this.handleChange}
                        value={this.state.training.duration}
                    />
                    <FormInput
                        type="number"
                        label="Poziom zaawansowania"
                        required
                        error={this.state.errors.level}
                        name="level"
                        placeholder="(początkujący)1-3(zaawansowany)"
                        onChange={this.handleChange}
                        value={this.state.training.level}
                    />
                    <FormInput
                        type="number"
                        label="Cena(zł/h)"
                        required
                        error={this.state.errors.price}
                        name="price"
                        placeholder=""
                        onChange={this.handleChange}
                        value={this.state.training.price}
                    />
                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/trainings"
                    />
                </form>
            </main >
        )
    }
    // render() {
    //     return (
    //         <main>
    //             <h2>Nowe szkolenie</h2>
    //             <form className="form">
    //                 <label htmlFor="trainingType">Typ szkolenia:<abbr title="required" aria-label="required">*</abbr></label>
    //                 <input type="text" name="trainingType" id="trainingType" placeholder="2-64 znaków" value="" />
    //                 <span id="errorTrainingType" className="errors-text"></span>

    //                 <label htmlFor="duration">Czas trwania(h):<abbr title="required" aria-label="required">*</abbr></label>
    //                 <input type="number" name="duration" id="duration" placeholder="1-3 h" value="" />
    //                 <span id="errorDuration" className="errors-text"></span>

    //                 <label htmlFor="level">Poziom zaawansowania:<abbr title="required" aria-label="required">*</abbr></label>
    //                 <input type="number" name="level" id="level" placeholder="(początkujący)1-3(zaawansowany)" value="" />
    //                 <span id="errorLevel" className="errors-text"></span>

    //                 <label htmlFor="price">Cena(zł/h):<abbr title="required" aria-label="required">*</abbr></label>
    //                 <input type="number" name="price" id="price" placeholder="" value="" />
    //                 <span id="errorPrice" className="errors-text"></span>

    //                 <div className="form-buttons">
    //                     <p id="errorsSummary" className="errors-text"></p>
    //                     <input className="form-button-submit" type="submit" value="Dodaj" />
    //                     <Link to="/trainings" className="form-button-cancel">Anuluj</Link>
    //                 </div>
    //             </form>
    //         </main >
    //     )
    // }
}

export default TrainingForm