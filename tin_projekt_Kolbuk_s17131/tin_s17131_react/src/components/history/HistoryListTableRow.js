import React from 'react';
import { Link } from 'react-router-dom';

function HistoryListTableRow(props) {
    const history = props.historyData
    return (
        <tr>
            <td>{history.employee.firstName}</td>
            <td>{history.employee.lastName}</td>
            <td>{history.training.trainingType}</td>
            <td>{history.training.duration}</td>
            <td>{history.training.level}</td>
            <td>{history.dateFrom}</td>
            <td>{history.dateTo}</td>
            <td>{history.opinion}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`history/details/${history._id}`} className="list-actions-button-details">Szczegóły</Link></li>
                    <li><Link to={`/history/edit/${history._id}`} className="list-actions-button-edit">Edytuj</Link></li>
                    <li><Link to={`history/delete/${history._id}`} className="list-actions-button-delete">Usuń</Link></li>
                </ul>
            </td>
        </tr>
    )
}

export default HistoryListTableRow