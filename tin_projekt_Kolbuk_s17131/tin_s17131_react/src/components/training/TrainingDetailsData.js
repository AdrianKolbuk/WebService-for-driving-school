import React from 'react';
import { getFormattedDate } from '../../helpers/dateHelper';

function TrainingDetailsData(props) {
    const training = props.trainingData
    return (
        <React.Fragment>
            <p>Typ szkolenia: {training.trainingType}</p>
            <p>Czas trwania(h): {training.duration} </p>
            <p>Poziom zaawansowania: {training.level} </p>
            <p>Cena(zł/h): {training.price} </p>
            <h2>Szczegóły pracowników, którzy przeprowadzili to szkolenie</h2>
            <table className="table-list">
                <thead>
                    <tr>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Nr tel</th>
                        <th>Data od</th>
                        <th>Data do</th>
                        <th>Opinia klienta</th>
                    </tr>
                </thead>
                <tbody>
                    {training.trainingHistory.map(
                        trainingHistory =>
                            <tr key={trainingHistory._id}>
                                <td>{trainingHistory.employee.firstName}</td>
                                <td>{trainingHistory.employee.lastName}</td>
                                <td>{trainingHistory.employee.phone}</td>
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

export default TrainingDetailsData