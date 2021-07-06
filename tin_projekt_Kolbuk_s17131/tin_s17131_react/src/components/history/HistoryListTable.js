import React from 'react';
import HistoryListTableRow from './HistoryListTableRow'

function HistoryListTable(props) {
    const history = props.historyList
    return (
        <table className="table-list">
            <thead>
                <tr>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Typ szkolenia</th>
                    <th>Czas trwania(h)</th>
                    <th>Poziom zaawansowania</th>
                    <th>Data od</th>
                    <th>Data do</th>
                    <th>Opinia klienta</th>
                    <th>Akcje</th>
                </tr>
            </thead>
            <tbody>
                {history.map(trainingHistory =>
                    <HistoryListTableRow historyData={trainingHistory} key={trainingHistory._id} />
                )}
            </tbody>
        </table>
    )
}

export default HistoryListTable