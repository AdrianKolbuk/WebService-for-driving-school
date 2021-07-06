import React from 'react';
import { getFormattedDate } from '../../helpers/dateHelper';
import { getPermissonString } from '../../apiCalls/employeeApiCalls';
import { useTranslation } from 'react-i18next';

function EmployeeDetailsData(props) {
    const emp = props.empData
    const { t } = useTranslation();
    return (
        <React.Fragment>
            <p>{t('emp.fields.firstName')}: {emp.firstName}</p>
            <p>{t('emp.fields.lastName')}: {emp.lastName} </p>
            <p>{t('emp.fields.email')}: {emp.email} </p>
            <p>{t('emp.fields.phone')}: {emp.phone} </p>
            <p>{t('emp.fields.salary')}: {emp.salary} </p>
            <p>{t('emp.fields.bonus')}: {emp.bonus} </p>
            <p>{t('emp.fields.category')}: {emp.category} </p>
            <p>{t('emp.fields.expDate')}: {emp.expDate} </p>
            <p>{t('emp.fields.permisson')}: {getPermissonString(emp.permisson)} </p>
            <h2>{t('emp.form.trainingHistory')}</h2>
            <table className="table-list">
                <thead>
                    <tr>
                        <th>{t('training.fields.trainingType')}</th>
                        <th>{t('training.fields.duration')}</th>
                        <th>{t('training.fields.level')}</th>
                        <th>{t('history.fields.dateFrom')}</th>
                        <th>{t('history.fields.dateTo')}</th>
                        <th>{t('history.fields.opinion')}</th>
                    </tr>
                </thead>
                <tbody>
                    {emp.trainingHistory.map(
                        trainingHistory =>
                            <tr key={trainingHistory._id}>
                                <td>{trainingHistory.training.trainingType}</td>
                                <td>{trainingHistory.training.duration}</td>
                                <td>{trainingHistory.training.level}</td>
                                <td>{trainingHistory.dateFrom ? getFormattedDate(trainingHistory.dateFrom) : ""}</td>
                                <td>{trainingHistory.dateTo ? getFormattedDate(trainingHistory.dateTo) : ""}</td>
                                <td>{trainingHistory.opinion}</td>
                            </tr>
                    )}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default EmployeeDetailsData