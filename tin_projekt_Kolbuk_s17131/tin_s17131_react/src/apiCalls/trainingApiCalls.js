const trainingsBaseUrl = 'http://localhost:3000/api/trainings'

export function getTrainingsApiCall() {
    const promise = fetch(trainingsBaseUrl)
    return promise;
}

export function getTrainingByIdApiCall(trainingId) {
    const url = `${trainingsBaseUrl}/${trainingId}`;
    const promise = fetch(url);
    return promise;
}

export function addTrainingApiCall(training) {
    const trainingString = JSON.stringify(training)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: trainingString
    }
    const promise = fetch(trainingsBaseUrl, options);
    return promise;
}

export function updateTrainingApiCall(trainingId, training) {
    const url = `${trainingsBaseUrl}/${trainingId}`
    const trainingString = JSON.stringify(training)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: trainingString
    }
    const promise = fetch(url, options);
    return promise;
}

