const User = require('../Models/User');
const alertErrors = (err) => {
    let errors = { name: '', age: '', number: '', email: '', password: '' };

    if (err.code === 11000) {
        errors.email = "This Email already exists";
        return errors;
    }

    console.log(err.message);

    if (err.message === 'incorrect email') {
        errors.email = "Incorrect Email";
    }
    if (err.message === "incorrect password") {
        errors.email = "Incorrect password";
    }


    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}

module.exports.signup = async (req, res) => {
    const { name, age, number, email, password } = req.body;
    try {

        const user = await User.create({ name, age, number, email, password });
        res.status(201).json({ user });

    } catch (error) {
        // console.log(error);

        let errors = alertErrors(error);
        console.log(JSON.stringify(errors));

        res.status(401).send({errors});
    }
    // console.log(req.body);
}
module.exports.update = async (req, res) => {
    const { name, age, number, email, password } = req.body;
    try {

        const user = await User.create({ name, age, number, email, password });
        res.status(201).json({ user });

    } catch (error) {
        // console.log(error);

        let errors = alertErrors(error);
        console.log(JSON.stringify(errors));

        res.status(401).send({errors});
    }
    // console.log(req.body);
}
module.exports.login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        res.status(201).json({ user });

    } catch (error) {
        console.log(error);

        let errors = alertErrors(error);
        res.status(401).send({errors});
    }
    console.log(req.body);
}


module.exports.logout = (req, res) => {
    res.send("logout");
}