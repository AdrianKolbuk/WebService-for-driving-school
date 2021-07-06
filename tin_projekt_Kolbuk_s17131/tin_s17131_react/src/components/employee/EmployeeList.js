import React from 'react';
import { Link } from 'react-router-dom'
import { getEmployeesApiCall } from '../../apiCalls/employeeApiCalls'
import EmployeeListTable from './EmployeeListTable'
import { withTranslation } from 'react-i18next';

class EmployeeList extends React.Component {
    constructor(props) {
        super(props)
        let notice = props.location.state && props.location.state.notice ? props.location.state.notice : ''
        this.state = {
            error: null,
            isLoaded: false,
            employees: [],
            notice: notice
        }
    }

    handleLanguageChange = (language) => {
        const { i18n } = this.props
        i18n.changeLanguage(language, (err, t) => {
            if (err) return console.log('something went wrong loading', err);
        });
    }

    componentDidMount() {
        this.fetchEmployeeList()
    }

    fetchEmployeeList = () => {
        getEmployeesApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        employees: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { t } = this.props;
        const { error, isLoaded, employees } = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('emp.list.loading')}...</p>
        } else if (Object.keys(employees).length === 0 && employees.constructor === Object) {
            content = <p>{t('emp.list.noData')}</p>
        } else {
            content = <EmployeeListTable empList={employees} />
        }

        return (
            <main>
                <p className="success">{this.state.notice}</p>
                <h2>{t('emp.list.title')}</h2>
                { content}
                <p>
                    <Link to="employees/add" className="button-add">{t('emp.list.addNew')}</Link>
                </p>
            </main >
        )
    }

}

export default withTranslation()(EmployeeList)