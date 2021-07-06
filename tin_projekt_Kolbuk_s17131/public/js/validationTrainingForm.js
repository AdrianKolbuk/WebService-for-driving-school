function validateForm() {
    const trainingTypeInput = document.getElementById('trainingType');
    const durationInput = document.getElementById('duration');
    const levelInput = document.getElementById('level');
    const priceInput = document.getElementById('price');

    const errorTrainingType = document.getElementById('errorTrainingType');
    const errorDuration = document.getElementById('errorDuration');
    const errorLevel = document.getElementById('errorLevel');
    const errorPrice = document.getElementById('errorPrice');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([trainingTypeInput, durationInput, levelInput, priceInput], [errorTrainingType, errorDuration, errorLevel, errorPrice], errorsSummary);
    let valid = true;
    //walidacja typ szkolenia
    if (!checkRequired(trainingTypeInput.value)) {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        trainingTypeInput.classList.add("error-input");
        errorTrainingType.innerText = reqMessage;
    }
    //walidacja czas trwania
    if (!checkRequired(durationInput.value)) {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        durationInput.classList.add("error-input");
        errorDuration.innerText = reqMessage;
    } else if (!checkNumber(durationInput.value)) {
        const reqMessage = document.getElementById('errorMessage-isNumber').innerText;
        valid = false;
        durationInput.classList.add("error-input");
        errorDuration.innerText = reqMessage;
    } else if (!checkNumberRange(durationInput.value, 1, 3)) {
        const reqMessage = document.getElementById('errorMessage-between1and3').innerText;
        valid = false;
        durationInput.classList.add("error-input");
        errorDuration.innerText = reqMessage;
    }
    //walidacja poziom zaawansowania
    if (!checkRequired(levelInput.value)) {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        levelInput.classList.add("error-input");
        errorLevel.innerText = reqMessage;
    } else if (!checkNumber(levelInput.value)) {
        const reqMessage = document.getElementById('errorMessage-isNumber').innerText;
        valid = false;
        levelInput.classList.add("error-input");
        errorLevel.innerText = reqMessage;
    } else if (!checkNumberRange(levelInput.value, 1, 3)) {
        const reqMessage = document.getElementById('errorMessage-between1and3').innerText;
        valid = false;
        levelInput.classList.add("error-input");
        errorLevel.innerText = reqMessage;
    }
    //walidacja cena za godzinę
    if (!checkRequired(priceInput.value)) {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = reqMessage;
    } else if (!checkNumber(priceInput.value)) {
        const reqMessage = document.getElementById('errorMessage-isNumber').innerText;
        valid = false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = reqMessage;
    } else if (!checkNumberRange(priceInput.value, 100, 500)) {
        const reqMessage = document.getElementById('errorMessage-between100and500').innerText;
        valid = false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = reqMessage;
    }

    if (!valid) {
        const reqMessage = document.getElementById('errorMessage-formErrors').innerText;
        errorsSummary.innerText = reqMessage;
    }

    return valid;
}