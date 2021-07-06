import React from "react"
import { Link } from 'react-router-dom'
import { getHistoryApiCall } from '../../apiCalls/historyApiCalls'
import HistoryListTable from './HistoryListTable'

class HistoryList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            history: []
        }
    }

    componentDidMount() {
        this.fetchHistoryList()
    }

    fetchHistoryList = () => {
        getHistoryApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        history: data
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
        const { error, isLoaded, history } = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie danych zatrudnień...</p>
        } else {
            content = <HistoryListTable historyList={history} />
        }

        return (
            <main>
                <p className="success">{this.state.notice}</p>
                <h2>Lista przeprowadzonych szkoleń</h2>
                {content}
                <p className="section-buttons">
                    <Link to="/history/add" className="button-add">Dodaj szkolenie do historii</Link>
                </p>
            </main>
        )
    }
}

export default HistoryList