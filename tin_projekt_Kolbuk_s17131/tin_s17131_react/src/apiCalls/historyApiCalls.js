const historyBaseUrl = 'http://localhost:3000/api/history'

export function getHistoryApiCall() {
    const promise = fetch(historyBaseUrl)
    return promise;
}

export function getHistoryByIdApiCall(historyId) {
    const url = `${historyBaseUrl}/${historyId}`;
    const promise = fetch(url);
    return promise;
}

export function addHistoryApiCall(history) {
    const historyString = JSON.stringify(history)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: historyString
    }
    const promise = fetch(historyBaseUrl, options);
    return promise;
}

export function updateHistoryApiCall(historyId, history) {
    const url = `${historyBaseUrl}/${historyId}`
    const historyString = JSON.stringify(history)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: historyString
    }
    const promise = fetch(url, options);
    return promise;
}

