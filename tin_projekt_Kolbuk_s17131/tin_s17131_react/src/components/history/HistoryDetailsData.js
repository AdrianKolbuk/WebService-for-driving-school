import React from 'react';
import { getFormattedDate } from '../../helpers/dateHelper';

function HistoryDetailsData(props) {
    const history = props.historyData
    const historyDateFrom = history.dateFrom ? getFormattedDate(history.dateFrom) : ""
    const historyDateTo = history.dateTo ? getFormattedDate(history.dateTo) : ""
    return (
        <React.Fragment>
            <p>Imię: {history.employee.firstName}</p>
            <p>Nazwisko: {history.employee.lastName} </p>
            <p>Typ szkolenia: {history.training.trainingType} </p>
            <p>Czas trwania(h): {history.training.duration} </p>
            <p>Poziom zaawansowania: {history.training.level} </p>
            <p>Data od: {historyDateFrom} </p>
            { historyDateTo && <p>Data do: {historyDateTo} </p>}
            <p>Opinia klienta: {history.opinion} </p>
        </React.Fragment>
    )
}

export default HistoryDetailsData