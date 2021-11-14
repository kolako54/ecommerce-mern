import validator from 'validator'
// const validation = (name, email, password, cf_password) => {
//     if(!name || !email || !password || !cf_password){
//         return 'Please add all fields.'
//     }
//     if(!validationEmail(email)){
//         return 'Invalid emails'
//     }
//     if(password.length < 6){
//         return 'Password must be at least 6 charachters.'
//     }
//     if(password !== cf_password){
//         return 'Confirm password did not match.'
//     }
// }
// function validateEmail(email){
//     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }

const validate = (ins) => {
    let errs = { passwordErr: false, emailErr: false, cf_password: false };


    if (ins['password']) {
        // if()
        if (validator.isStrongPassword(ins['password'], {
            minLength: 4,
            // minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            errs = { ...errs, passwordErr: true }
            // return;
            //   return 'Is Strong Password'
        } else {
            errs = { ...errs, passwordErr: false }
            // return 'Is Not Strong Password'
        }

    }
    console.log(errs)
    return errs;
}
export default validate;