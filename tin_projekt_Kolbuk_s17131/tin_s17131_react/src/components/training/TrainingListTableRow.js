import React from 'react';
import { Link } from 'react-router-dom';

function TrainingListTableRow(props) {
    const training = props.trainingData
    return (
        <tr>
            <td>{training.trainingType}</td>
            <td>{training.duration}</td>
            <td>{training.level}</td>
            <td>{training.price}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`trainings/details/${training._id}`} className="list-actions-button-details">Szczegóły</Link></li>
                    <li><Link to={`/trainings/edit/${training._id}`} className="list-actions-button-edit">Edytuj</Link></li>
                    <li><Link to={`trainings/delete/${training._id}`} className="list-actions-button-delete">Usuń</Link></li>
                </ul>
            </td>
        </tr>
    )
}

export default TrainingListTableRow