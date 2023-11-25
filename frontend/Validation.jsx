export function Validation(values) {
    const email_pattern = /^$[^\s@+]+@[^\s@]+\.[^\s@]{2,6}$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    let errors = {}
    

    if (values.text === "" || values.text > 25 ) {
        errors.text = "Name is Required!";
    }

    if (values.email === "") {
        errors.email = "Email is Required!";
    } else if (!email_pattern.test(values.email)) {
        errors.email = "Email didn't match!";
    }

    if (values.password === "") {
        errors.password = "Password Required!";
    } else if (!password_pattern.test(values.password)) {
        errors.password = "Password didn't match!";
    }

   


    return errors;
}
