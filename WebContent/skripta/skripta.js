function validateString(nekiString) {
    var re = /^[A-Za-z]+$/;
    if (re.test(nekiString))
        return true;
    else
        return false;
}