import React from 'react'
import { Link } from 'react-router-dom'
import { getHistoryByIdApiCall } from '../../apiCalls/historyApiCalls'
import HistoryDetailsData from './HistoryDetailsData'

class HistoryDetails extends React.Component {

    constructor(props) {
        super(props)
        let { historyId } = props.match.params
        this.state = {
            historyId: historyId,
            history: null,
            error: null,
            isLoaded: false
        }
    }

    componentDidMount() {
        this.fetchHistoryDetails()
    }

    fetchHistoryDetails = () => {
        getHistoryByIdApiCall(this.state.historyId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            history: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            history: data,
                            message: null,
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
        const { history, error, isLoaded, message } = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Pobieranie danych historii...</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <HistoryDetailsData historyData={history} />
        }

        return (
            <main>
                <h2>Szczegóły przeprowadzonego szkolenia</h2>
                {content}
                <div className="section-buttons">
                    <Link to="/history" className="form-button-return">Powrót</Link>
                </div>
            </main >
        )
    }
}

export default HistoryDetails