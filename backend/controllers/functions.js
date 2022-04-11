

function checkPassword(password, res) {

    const regularExp = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#$%/()@=¿?*+-])(?=(?:([\w\d])\1?(?!\1\1)))(?!(?=.*(palabra1|palabra2|palabraN))).{8,20}$/);
    if (regularExp.test(password)) {
        console.log("Password OK !");
        return true;
    }
    console.log("Format du mot de pass non valide !");
    return false;

}

/**function checkEmail(email) {

    const regularExp = RegExp(/^[\w-\+\.\_]+(\.[\w-\+\.\_]+)*@[\w-\+\.\_]+(\.[\w\+\.\_]+)*(\.[A-Za-z]{2,})$/);
    if (regularExp.test(email)) {
        email.toLowerCase();
        console.log("email OK !");
        return true;
    }
    console.log("Format de l'email non valide !");

    return false;

} */




exports.checkPassword = checkPassword;
//exports.checkEmail = checkEmail;