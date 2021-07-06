import React from 'react';
import { Link } from 'react-router-dom';
import { getPermissonString } from '../../apiCalls/employeeApiCalls'
import { useTranslation } from 'react-i18next';


function EmployeeListTableRow(props) {
    const emp = props.empData
    const { t } = useTranslation();
    return (
        <tr>
            <td>{emp.firstName}</td>
            <td>{emp.lastName}</td>
            <td>{emp.email}</td>
            <td>{emp.phone}</td>
            <td>{emp.salary}</td>
            <td>{emp.bonus}</td>
            <td>{emp.category}</td>
            <td>{emp.expDate}</td>
            <td>{getPermissonString(emp.permisson)}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`employees/details/${emp._id}`} className="list-actions-button-details">{t('list.actions.details')}</Link></li>
                    <li><Link to={`/employees/edit/${emp._id}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link></li>
                    <li><Link to={`employees/delete/${emp._id}`} className="list-actions-button-delete">{t('list.actions.delete')}</Link></li>
                </ul>
            </td>
        </tr>
    )
}

export default EmployeeListTableRow