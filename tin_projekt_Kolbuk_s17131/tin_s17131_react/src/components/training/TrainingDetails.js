import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { getTrainingByIdApiCall } from '../../apiCalls/trainingApiCalls'
import TrainingDetailsData from './TrainingDetailsData'
import { getFormattedDate } from '../../helpers/dateHelper'

class TrainingDetails extends React.Component {

    constructor(props) {
        super(props)
        let { trainingId } = props.match.params
        this.state = {
            trainingId: trainingId,
            training: null,
            error: null,
            isLoaded: false,
            message: null
        }
    }

    componentDidMount() {
        this.fetchTrainingDetails()
    }

    fetchTrainingDetails = () => {
        getTrainingByIdApiCall(this.state.trainingId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            training: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            training: data,
                            message: null
                        })
                    }
                    this.setState({
                        isLoaded: true,
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                })
    }

    render() {
        const { training, error, isLoaded, message } = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie danych pracownika</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <TrainingDetailsData trainingData={training} />
        }
        return (
            <main>
                <h2>Szczegóły szkolenia</h2>
                {content}
                <Link to="/trainings" className="form-button-return">Powrót</Link>
            </main>
        )
    }
}
export default TrainingDetails