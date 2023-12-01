// to show a message after all the validation check are checked and the format of the data is correct

function setForm() {
    document.forms[0].onsubmit = function () {
        if (this.checkValidity()) alert("Thank you for your response." + "\n" + "We will be contacting you soon.");
        return true;
    }
}

