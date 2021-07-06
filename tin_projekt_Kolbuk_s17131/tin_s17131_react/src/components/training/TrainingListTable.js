import React from 'react';
import TrainingListTableRow from './TrainingListTableRow'

function TrainingListTable(props) {
    const trainings = props.trainingList
    return (
        <table className="table-list" >
            <thead>
                <tr>
                    <th>Typ szkolenia</th>
                    <th>Czas trwania(h)</th>
                    <th>Poziom zaawansowania</th>
                    <th>Cena(zł/h)</th>
                    <th>Akcje</th>
                </tr>
            </thead>
            <tbody>
                {trainings.map(training =>
                    <TrainingListTableRow trainingData={training} key={training._id} />
                )}
            </tbody>
        </table >
    )
}

export default TrainingListTable