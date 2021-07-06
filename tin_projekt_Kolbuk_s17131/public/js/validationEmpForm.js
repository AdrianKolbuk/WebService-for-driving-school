function validateForm() {
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const salaryInput = document.getElementById('salary');
    const bonusInput = document.getElementById('bonus');
    const categoryInput = document.getElementById('category');
    const expDateInput = document.getElementById('expDate');
    const permissonInput = document.getElementById('permisson');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    const errorFirstName = document.getElementById('errorFirstName');
    const errorLastName = document.getElementById('errorLastName');
    const errorEmail = document.getElementById('errorEmail');
    const errorPhone = document.getElementById('errorPhone');
    const errorSalary = document.getElementById('errorSalary');
    const errorBonus = document.getElementById('errorBonus');
    const errorCategory = document.getElementById('errorCategory');
    const errorExpDate = document.getElementById('errorExpDate');
    const errorPermisson = document.getElementById('errorPermisson');
    const errorPassword = document.getElementById('errorPassword');
    const errorConfirmPassword = document.getElementById('errorConfirmPassword');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([firstNameInput, lastNameInput, emailInput, phoneInput, salaryInput, bonusInput, categoryInput, expDateInput, permissonInput, passwordInput, confirmPasswordInput], [errorFirstName, errorLastName, errorEmail, errorPhone, errorSalary, errorBonus, errorCategory, errorExpDate, errorPermisson, errorPassword, errorConfirmPassword], errorsSummary);
    let valid = true;
    //walidacja imie
    if (!checkRequired(firstNameInput.value)) {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = reqMessage;
    } else if (!checkTextLengthRange(firstNameInput.value, 2, 32)) {
        const reqMessage = document.getElementById('errorMessage-lenBetween2and32').innerText;
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = reqMessage;
    }
    //walidacja nazwisko
    if (!checkRequired(lastNameInput.value)) {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = reqMessage;
    } else if (!checkTextLengthRange(lastNameInput.value, 2, 32)) {
        const reqMessage = document.getElementById('errorMessage-lenBetween2and32').innerText;
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = reqMessage;
    }
    //walidacja maila
    if (!checkRequired(emailInput.value)) {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = reqMessage;
    } else if (!checkTextLengthRange(emailInput.value, 5, 60)) {
        const reqMessage = document.getElementById('errorMessage-lenBetween5and60').innerText;
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = reqMessage;
    } else if (!checkEmail(emailInput.value)) {
        const reqMessage = document.getElementById('errorMessage-email').innerText;
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = reqMessage;
    }
    //walidacja nr telefonu
    if (!checkRequired(phoneInput.value)) {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        phoneInput.classList.add("error-input");
        errorPhone.innerText = reqMessage;
    } else if (!checkTextLengthRange(phoneInput.value, 12, 12)) {
        const reqMessage = document.getElementById('errorMessage-lenBetween12and12').innerText;
        valid = false;
        phoneInput.classList.add("error-input");
        errorPhone.innerText = reqMessage;
    }
    //walidacja pensji
    if (!checkRequired(salaryInput.value)) {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        salaryInput.classList.add("error-input");
        errorSalary.innerText = reqMessage;
    } else if (!checkNumber(salaryInput.value)) {
        const reqMessage = document.getElementById('errorMessage-isNumber').innerText;
        valid = false;
        salaryInput.classList.add("error-input");
        errorSalary.innerText = reqMessage;
    } else if (!checkNumberRange(salaryInput.value, 2000, 1_000_000)) {
        const reqMessage = document.getElementById('errorMessage-between2000and1000000').innerText;
        valid = false;
        salaryInput.classList.add("error-input");
        errorSalary.innerText = reqMessage;
    }
    //walidacja premii
    if (!checkRequired(bonusInput.value)) {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        bonusInput.classList.add("error-input");
        errorBonus.innerText = reqMessage;
    } else if (!checkNumber(bonusInput.value)) {
        const reqMessage = document.getElementById('errorMessage-isNumber').innerText;
        valid = false;
        bonusInput.classList.add("error-input");
        errorBonus.innerText = reqMessage;
    } else if (!checkNumberRange(bonusInput.value, 1, 30)) {
        const reqMessage = document.getElementById('errorMessage-between1and30').innerText;
        valid = false;
        bonusInput.classList.add("error-input");
        errorBonus.innerText = reqMessage;
    }
    //walidacja kategorii prawa jazdy
    if (!checkRequired(categoryInput.value)) {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        categoryInput.classList.add("error-input");
        errorCategory.innerText = reqMessage;
    }
    //walidacja daty ważności prawa jazdy
    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    const nowString = [year, month, day].join('-');

    if (!checkRequired(expDateInput.value)) {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        expDateInput.classList.add("error-input");
        errorExpDate.innerText = reqMessage;
    } else if (!checkDate(expDateInput.value)) {
        const reqMessage = document.getElementById('errorMessage-isDate').innerText;
        valid = false;
        expDateInput.classList.add("error-input");
        errorExpDate.innerText = reqMessage;
        // "Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)";
    }

    //walidacja uprawnienia
    if (!checkRequired(permissonInput.value)) {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        permissonInput.classList.add("error-input");
        errorPermisson.innerText = reqMessage;
    }

    //walidacja hasło
    if (!checkRequired(passwordInput.value)) {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = reqMessage;
    } else if (!checkTextLengthRange(passwordInput.value, 5, 40)) {
        const reqMessage = document.getElementById('errorMessage-lenBetween5and40').innerText;
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = reqMessage;
    }

    //walidacja ConfirmHasło
    if (!checkRequired(confirmPasswordInput.value)) {
        const reqMessage = document.getElementById('errorMessage-required').innerText;
        valid = false;
        confirmPasswordInput.classList.add("error-input");
        errorConfirmPassword.innerText = reqMessage;
    } else if (!checkTextLengthRange(confirmPasswordInput.value, 5, 40)) {
        const reqMessage = document.getElementById('errorMessage-lenBetween5and40').innerText;
        valid = false;
        confirmPasswordInput.classList.add("error-input");
        errorConfirmPassword.innerText = reqMessage;
    } else if (!checkConfirmPassword(confirmPasswordInput.value, passwordInput.value)) {
        const reqMessage = document.getElementById('errorMessage-notConfirmedPassword').innerText;
        valid = false;
        confirmPasswordInput.classList.add("error-input");
        errorConfirmPassword.innerText = reqMessage;
    }


    if (!valid) {
        const reqMessage = document.getElementById('errorMessage-formErrors').innerText;
        errorsSummary.innerText = reqMessage;
    }



    return valid;
}