import React from 'react';
import EmployeeListTableRow from './EmployeeListTableRow'
import { useTranslation } from 'react-i18next';

function EmployeeListTable(props) {
    const employees = props.empList
    const { t } = useTranslation();
    return (
        <table className="table-list" >
            <thead>
                <tr>
                    <th>{t('emp.fields.firstName')}</th>
                    <th>{t('emp.fields.lastName')}</th>
                    <th>{t('emp.fields.email')}</th>
                    <th>{t('emp.fields.phone')}</th>
                    <th>{t('emp.fields.salary')}</th>
                    <th>{t('emp.fields.bonus')}</th>
                    <th>{t('emp.fields.category')}</th>
                    <th>{t('emp.fields.expDate')}</th>
                    <th>{t('emp.fields.permisson')}</th>
                    <th>{t('list.actions.title')}</th>
                </tr>
            </thead>
            <tbody>
                {employees.map(emp =>
                    <EmployeeListTableRow empData={emp} key={emp._id} />
                )}
            </tbody>
        </table >
    )
}

export default EmployeeListTable