import Hapi from '@hapi/joi';
import passwordValidator from 'password-validator';

const validateSignUp = (user) => {
    const schema = Hapi.object().keys({
        firstName: Hapi.string().min(2).required(),
        lastName: Hapi.string().min(2).required(),
        email: Hapi.string().email(),
        phoneNumber: Hapi.string().required().min(10),
        password: Hapi.string().required(),
        gender: Hapi.string().required(),
    });

    return schema.validate(user);
}

const validatePassword = (password) => {
    const schema = new passwordValidator();
    schema
        .is()
        .min(8)
        .is()
        .max(100)
        .has()
        .lowercase()
        .has()
        .uppercase()
        .has()
        .digits()
        .has()
        .not()
        .spaces()
        .has()
        .symbols();
    
    return schema.validate(password);
};

const validateSignIn = (user) => {
    const schema = Hapi.object().keys({
        phoneNumber: Hapi.string().required().min(10).max(10),
        password: Hapi.string().required()
    });

    return schema.validate(user);
}

export default { validateSignUp, validatePassword, validateSignIn }
