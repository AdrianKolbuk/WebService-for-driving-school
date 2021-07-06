import React from 'react'
import { Link } from 'react-router-dom'
import { getEmployeeByIdApiCall } from '../../apiCalls/employeeApiCalls'
import EmployeeDetailsData from './EmployeeDetailsData'
import { withTranslation } from 'react-i18next';

class EmployeeDetails extends React.Component {

    constructor(props) {
        super(props)
        let { empId } = props.match.params
        this.state = {
            empId: empId,
            emp: null,
            error: null,
            isLoaded: false,
            message: null
        }
    }

    handleLanguageChange = (language) => {
        const { i18n } = this.props
        i18n.changeLanguage(language, (err, t) => {
            if (err) return console.log('something went wrong loading', err);
        });
    }

    componentDidMount() {
        this.fetchEmployeeDetails()
    }

    fetchEmployeeDetails = () => {
        getEmployeeByIdApiCall(this.state.empId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            emp: null,
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

    render() {
        const { emp, error, isLoaded, message } = this.state
        let content;
        const { t } = this.props;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('emp.list.loading')}</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <EmployeeDetailsData empData={emp} />
        }
        return (
            <main>
                <h2>{t('emp.form.details.pageTitle')}</h2>
                {content}
                <Link to="/employees" className="form-button-return">{t('form.actions.return')}</Link>
            </main>
        )
    }
}
export default withTranslation()(EmployeeDetails)