import React from "react"
import { Link, Redirect } from "react-router-dom"
import formMode from '../../helpers/formHelper'
import { checkRequired, checkTextLengthRange, checkEmail, checkNumber, checkNumberRange, checkDate } from '../../helpers/validationCommon'
import { getEmployeeByIdApiCall, addEmployeeApiCall, updateEmployeeApiCall } from '../../apiCalls/employeeApiCalls'
import FormInput from '../form/FormInput'
import FormButtons from '../form/FormButtons'
import FormSelect from '../form/FormSelect'
import FormSelectBasic from "../form/FormSelectBasic"
import { withTranslation } from 'react-i18next';

class EmployeeForm extends React.Component {
    constructor(props) {
        super(props)

        const paramsEmpId = props.match.params.empId
        const currentFormMode = paramsEmpId ? formMode.EDIT : formMode.NEW

        this.state = {
            empId: paramsEmpId,
            emp: {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                salary: '',
                bonus: '',
                category: '',
                expDate: '',
                permisson: '',
                password: ''
            },
            errors: {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                salary: '',
                bonus: '',
                category: '',
                expDate: '',
                permisson: '',
                password: ''
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }

    handleLanguageChange = (language) => {
        const { i18n } = this.props
        i18n.changeLanguage(language, (err, t) => {
            if (err) return console.log('something went wrong loading', err);
        });
    }

    componentDidMount = () => {
        const currentFormMode = this.state.formMode
        if (currentFormMode === formMode.EDIT) {
            this.fetchEmployeeDetails()
        }
    }

    fetchEmployeeDetails = () => {
        getEmployeeByIdApiCall(this.state.empId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            message: data.message
                        })
                    } else {
                        this.setState({
                            emp: data,
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
        if (fieldName === 'firstName') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = 'Pole powinno zawierać od 2 do 60 znaków'
            }
        }
        if (fieldName === 'lastName') {
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
                errorMessage = 'Pole powinno zawierać od 2 do 60 znaków'
            }
        }
        if (fieldName === 'email') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            } else if (!checkTextLengthRange(fieldValue, 5, 60)) {
                errorMessage = "Pole powinno zawierać od 5 do 60 znaków";
            } else if (!checkEmail(fieldValue)) {
                errorMessage = "Pole powinno zawierać prawidłowy adres email";
            }
        }
        if (fieldName === 'phone') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            } else if (!checkTextLengthRange(fieldValue, 12, 12)) {
                errorMessage = "np. +48xxxxxxxxx";
            }
        }
        if (fieldName === 'salary') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            } else if (!checkNumber(fieldValue)) {
                errorMessage = "Pole powinno być liczbą";
            } else if (!checkNumberRange(fieldValue, 2000, 1_000_000)) {
                errorMessage = "Pole powinno być liczbą w zakresie od 2000 do 1000000";
            }
        }
        if (fieldName === 'bonus') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            } else if (!checkNumber(fieldValue)) {
                errorMessage = "Pole powinno być liczbą";
            } else if (!checkNumberRange(fieldValue, 1, 30)) {
                errorMessage = "Pole powinno być liczbą w zakresie od 2000 do 1000000";
            }
        }
        if (fieldName === 'category') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            }
        }
        if (fieldName === 'expDate') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            } else if (!checkDate(fieldValue)) {
                errorMessage = "Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)";
            }
        }
        if (fieldName === 'permisson') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            }
        }
        if (fieldName === 'password') {
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane";
            } else if (!checkTextLengthRange(fieldValue, 5, 256)) {
                errorMessage = "Pole powinno zawierać min. 5 znaków";
            }
        }

        return errorMessage
    }
    //obłsuga zmiany stanu przy edycji
    handleChange = (event) => {
        const { name, value } = event.target
        const emp = { ...this.state.emp }
        emp[name] = value

        const errorMessage = this.validateField(name, value)
        const errors = { ...this.state.errors }
        errors[name] = errorMessage

        this.setState({
            emp: emp,
            errors: errors
        })
    }
    //obsługa wysłania formularza
    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const
                emp = this.state.emp,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addEmployeeApiCall(emp)

            } else if (currentFormMode === formMode.EDIT) {
                console.log(emp)
                const empId = this.state.empId
                promise = updateEmployeeApiCall(empId, emp)
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
        const emp = this.state.emp
        const errors = this.state.errors
        for (const fieldName in emp) {
            const fieldValue = emp[fieldName]
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
        const { t } = this.props;
        const { redirect } = this.state
        if (redirect) {
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? 'Pomyślnie dodano pracownika' : 'Pomyślnie zaktualizowano nowego pracownika'
            return (
                <Redirect to={{
                    pathname: "/employees",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }

        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : ''
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? 'Nowy pracownik' : 'Edycja pracownika'

        const globalErrorMessage = errorsSummary || fetchError || this.state.message

        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label={t('emp.fields.firstName')}
                        required
                        error={this.state.errors.firstName}
                        name="firstName"
                        placeholder="2-60 znaków"
                        onChange={this.handleChange}
                        value={this.state.emp.firstName}
                    />
                    <FormInput
                        type="text"
                        label={t('emp.fields.lastName')}
                        required
                        error={this.state.errors.lastName}
                        name="lastName"
                        placeholder="2-60 znaków"
                        onChange={this.handleChange}
                        value={this.state.emp.lastName}
                    />
                    <FormInput
                        type="email"
                        label={t('emp.fields.email')}
                        required
                        error={this.state.errors.email}
                        name="email"
                        placeholder="np. nazwa@domena.pl"
                        onChange={this.handleChange}
                        value={this.state.emp.email}
                    />
                    <FormInput
                        type="text"
                        label={t('emp.fields.phone')}
                        required
                        error={this.state.errors.phone}
                        name="phone"
                        placeholder="np. +48xxxxxxxxx"
                        onChange={this.handleChange}
                        value={this.state.emp.phone}
                    />
                    <FormInput
                        type="number"
                        label={t('emp.fields.salary')}
                        required
                        error={this.state.errors.salary}
                        name="salary"
                        placeholder=""
                        onChange={this.handleChange}
                        value={this.state.emp.salary}
                    />
                    <FormInput
                        type="number"
                        label={t('emp.fields.bonus')}
                        required
                        error={this.state.errors.bonus}
                        name="bonus"
                        placeholder=""
                        onChange={this.handleChange}
                        value={this.state.emp.bonus}
                    />
                    {/* <FormInput
                        type="text"
                        label="Kategoria prawa jazdy"
                        required
                        error={this.state.errors.category}
                        name="category"
                        placeholder=""
                        onChange={this.handleChange}
                        value={this.state.emp.category}
                    /> */}
                    <FormSelectBasic
                        label={t('emp.fields.category')}
                        required
                        error={this.state.errors.category}
                        name="category"
                        onChange={this.handleChange}
                        value={this.state.emp.category}
                        isCategory={true}
                        id={this.state.emp.emp_id}
                    />
                    <FormInput
                        type="date"
                        label={t('emp.fields.expDate')}
                        required
                        error={this.state.errors.expDate}
                        name="expDate"
                        placeholder=""
                        onChange={this.handleChange}
                        value={this.state.emp.expDate}
                    />
                    <FormInput
                        type="text"
                        label={t('emp.fields.permisson')}
                        required
                        error={this.state.errors.permisson}
                        name="permisson"
                        placeholder=""
                        onChange={this.handleChange}
                        value={this.state.emp.permisson}
                    />
                    <FormInput
                        type="password"
                        label={t('emp.fields.password')}
                        required
                        error={this.state.errors.password}
                        name="password"
                        placeholder=""
                        onChange={this.handleChange}
                        value={this.state.emp.password}
                    />
                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/employees"
                    />
                </form>
            </main >
        )
    }

    // render() {
    //     return (
    //         <main>
    //             <h2>Nowy pracownik</h2>
    //             <form className="form">
    //                 <label htmlFor="firstName">Imię:<abbr title="required" aria-label="required">*</abbr></label>
    //                 <input type="text" name="firstName" id="firstName" placeholder="2-60 znaków" value="" />
    //                 <span id="errorFirstName" className="errors-text"></span>

    //                 <label htmlFor="lastName">Nazwisko:<abbr title="required" aria-label="required">*</abbr></label>
    //                 <input type="text" name="lastName" id="lastName" placeholder="2-60 znaków" value="" />
    //                 <span id="errorLastName" className="errors-text"></span>

    //                 <label htmlFor="email">Email:<abbr title="required" aria-label="required">*</abbr></label>
    //                 <input type="email" name="email" id="email" placeholder="np. nazwa@domena.pl" value="" />
    //                 <span id="errorEmail" className="errors-text"></span>

    //                 <label htmlFor="phone">Nr tel:<abbr title="required" aria-label="required">*</abbr></label>
    //                 <input type="text" name="phone" id="phone" placeholder="np. +48xxxxxxxxx" value="" />
    //                 <span id="errorPhone" className="errors-text"></span>

    //                 <label htmlFor="salary">Pensja:<abbr title="required" aria-label="required">*</abbr></label>
    //                 <input type="number" name="salary" id="salary" placeholder="" value="" />
    //                 <span id="errorSalary" className="errors-text"></span>

    //                 <label htmlFor="bonus">Premia kwartalna(%):<abbr title="required" aria-label="required">*</abbr></label>
    //                 <input type="number" name="bonus" id="bonus" placeholder="" value="" />
    //                 <span id="errorBonus" className="errors-text"></span>

    //                 <label htmlFor="category">Kategoria prawa jazdy:<abbr title="required" aria-label="required">*</abbr></label>
    //                 <select type="text" name="category" id="category">
    //                     <option value="" selected disabled>-- Wybierz opcję --</option>
    //                     <option value="">A</option>
    //                     <option value="">B</option>
    //                 </select>
    //                 <span id="errorCategory" className="errors-text"></span>

    //                 <label htmlFor="expDate">Data ważności prawa jazdy:<abbr title="required" aria-label="required">*</abbr></label>
    //                 <input type="date" name="expDate" id="expDate" placeholder="" value="" />
    //                 <span id="errorExpDate" className="errors-text"></span>

    //                 <label htmlFor="permisson">Uprawnienia do szkoleń:<abbr title="required" aria-label="required">*</abbr></label>
    //                 <select type="text" name="permisson" id="permisson">
    //                     <option value="" selected disabled>-- Wybierz opcję --</option>
    //                     <option value="">Tak</option>
    //                     <option value="">Nie</option>
    //                 </select>
    //                 <span id="errorPermisson" className="errors-text"></span>

    //                 <label htmlFor="password">Hasło:<abbr title="required" aria-label="required">*</abbr></label>
    //                 <input type="text" name="password" id="password" placeholder="min. 5 znaków" value="" />
    //                 <span id="errorPassword" className="errors-text"></span>

    //                 <div className="form-buttons">
    //                     <p id="errorsSummary" className="errors-text"></p>
    //                     <input className="form-button-submit" type="submit" value="Dodaj" />
    //                     <Link to="/employees" className="form-button-cancel">Anuluj</Link>
    //                 </div>
    //             </form>
    //         </main >
    //     )
    // }
}

export default withTranslation()(EmployeeForm)