import React from 'react';
import { Link } from 'react-router-dom'
import { getTrainingsApiCall } from '../../apiCalls/trainingApiCalls'
import TrainingListTable from './TrainingListTable'

class TrainingList extends React.Component {
    constructor(props) {
        super(props)
        let notice = props.location.state && props.location.state.notice ? props.location.state.notice : ''
        this.state = {
            error: null,
            isLoaded: false,
            trainings: [],
            notice: notice
        }
    }

    componentDidMount() {
        this.fetchTrainingList()
    }

    fetchTrainingList = () => {
        getTrainingsApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        trainings: data
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
        const { error, isLoaded, trainings } = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie danych o dostępnych szkoleniach...</p>
        } else if (Object.keys(trainings).length === 0 && trainings.constructor === Object) {
            content = <p>Brak danych o dostępnych szkoleniach</p>
        } else {
            content = <TrainingListTable trainingList={trainings} />
        }

        return (
            <main>
                <p className="success">{this.state.notice}</p>
                <h2>Lista dostępnych szkoleń</h2>
                { content}
                <p>
                    <Link to="/trainings/add" className="button-add">Dodaj nowe szkolenie</Link>
                </p>
            </main >
        )
    }
}

export default TrainingList