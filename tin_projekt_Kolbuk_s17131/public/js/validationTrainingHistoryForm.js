function validateForm() {
    const employeeInput = document.getElementById('employee');
    const trainingInput = document.getElementById('training');
    // const durationInput = document.getElementById('duration');
    // const levelInput = document.getElementById('level');
    const dateFromInput = document.getElementById('dateFrom');
    const dateToInput = document.getElementById('dateTo');
    const opinionInput = document.getElementById('opinion');

    const errorEmployee = document.getElementById('errorEmployee');
    const errorTraining = document.getElementById('errorTraining');
    // const errorDuration = document.getElementById('errorDuration');
    // const errorLevel = document.getElementById('errorLevel');
    const errorDateFrom = document.getElementById('errorDateFrom');
    const errorDateTo = document.getElementById('errorDateTo');
    const errorOpinion = document.getElementById('errorOpinion');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([employeeInput, trainingInput, dateFromInput, dateToInput, opinionInput], [errorEmployee, errorTraining, errorDateFrom, errorDateTo, errorOpinion], errorsSummary);
    let valid = true;
    //walidacja Pracownik
    if (!checkRequired(employeeInput.value)) {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        employeeInput.classList.add("error-input");
        errorEmployee.innerText = reqMessage;
    }
    //walidacja Trening
    if (!checkRequired(trainingInput.value)) {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        trainingInput.classList.add("error-input");
        errorTraining.innerText = reqMessage;
    }
    // //walidacja typ szkolenia
    // if (!checkRequired(trainingTypeInput.value)) {
    //     valid = false;
    //     trainingTypeInput.classList.add("error-input");
    //     errorTrainingType.innerText = "Pole jest wymagane";
    // }
    // //walidacja czas trwania
    // if (!checkRequired(durationInput.value)) {
    //     valid = false;
    //     durationInput.classList.add("error-input");
    //     errorDuration.innerText = "Pole jest wymagane";
    // } else if (!checkNumber(durationInput.value)) {
    //     valid = false;
    //     durationInput.classList.add("error-input");
    //     errorDuration.innerText = "Pole powinno być liczbą";
    // } else if (!checkNumberRange(durationInput.value, 1, 3)) {
    //     valid = false;
    //     durationInput.classList.add("error-input");
    //     errorDuration.innerText = "Pole powinno być liczbą w zakresie od 1 do 3";
    // }
    // //walidacja poziom zaawansowania
    // if (!checkRequired(levelInput.value)) {
    //     valid = false;
    //     levelInput.classList.add("error-input");
    //     errorLevel.innerText = "Pole jest wymagane";
    // } else if (!checkNumber(levelInput.value)) {
    //     valid = false;
    //     levelInput.classList.add("error-input");
    //     errorLevel.innerText = "Pole powinno być liczbą";
    // } else if (!checkNumberRange(levelInput.value, 1, 3)) {
    //     valid = false;
    //     levelInput.classList.add("error-input");
    //     errorLevel.innerText = "Pole powinno być liczbą w zakresie od 1 do 3";
    // }
    //walidacja data od
    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    const nowString = [year, month, day].join('-');

    if (!checkRequired(dateFromInput.value)) {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText = reqMessage;
    } else if (!checkDate(dateFromInput.value)) {
        const reqMessage = document.getElementById('errorMessage-isDate').innerText;
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText = reqMessage;
    } else if (checkDateIfAfter(dateFromInput.value, nowString)) {
        const reqMessage = document.getElementById('errorMessage-dateFromFuture').innerText;
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText = reqMessage;
    }
    //walidacja data do
    let nowDateTo = new Date(),
        monthTo = '' + (nowDateTo.getMonth() + 1),
        dayTo = '' + nowDateTo.getDate(),
        yearTo = nowDateTo.getFullYear();

    if (monthTo.length < 2)
        monthTo = '0' + monthTo;
    if (dayTo.length < 2)
        dayTo = '0' + dayTo;
    const nowStringTo = [yearTo, monthTo, dayTo].join('-');

    if (!checkRequired(dateToInput.value)) {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        dateToInput.classList.add("error-input");
        errorDateTo.innerText = reqMessage;
    } else if (!checkDate(dateToInput.value)) {
        const reqMessage = document.getElementById('errorMessage-isDate').innerText;
        valid = false;
        dateToInput.classList.add("error-input");
        errorDateTo.innerText = reqMessage;
    } else if (checkDateIfAfter(dateToInput.value, nowStringTo)) {
        const reqMessage = document.getElementById('errorMessage-dateFromFuture').innerText;
        valid = false;
        dateToInput.classList.add("error-input");
        errorDateTo.innerText = reqMessage;
    } else if (checkRequired(dateToInput.value) && checkDate(dateToInput.value)
        && !checkDateIfAfter(dateToInput.value, dateFromInput.value)) {
        //jeśli data od oraz data do jest poprawna, sprawdzamy kolejność dat
        const reqMessage = document.getElementById('errorMessage-dateFromIsAfterDateTo').innerText;
        valid = false;
        dateToInput.classList.add("error-input");
        errorDateTo.innerText = reqMessage;
    }
    //walidacja opinia
    if (opinionInput.value.length > 256) {
        const reqMessage = document.getElementById('errorMessage-lenBetween0and256').innerText;
        valid = false;
        opinionInput.classList.add("error-input");
        errorOpinion.innerText = reqMessage;
    }

    if (!valid) {
        const reqMessage = document.getElementById('errorMessage-formErrors').innerText;
        errorsSummary.innerText = reqMessage;
    }

    return valid;
}