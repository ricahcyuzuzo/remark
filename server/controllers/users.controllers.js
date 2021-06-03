import validateUser from '../helpers/validations/userValidations';
import userBodyModels from '../models/body/userBody.model';
import Auth from '../helpers/authenticate';
import User from '../models/db/users.model';
import sendEmail from '../helpers/sendEmail';
import Mongoose from 'mongoose';

class UserControllers {
    static signup (req, res){
        const { firstName, lastName, email, phoneNumber, password, gender } = req.body;
        const lowerEmail = email.toLowerCase();
        const { error } = validateUser.validateSignUp(userBodyModels.signUpBody(req));

        if (error){
            return res.status(400).json({
                status: 400,
                message: error.details[0].message.replace(/"/g, '')
            });
        }

        if(validateUser.validatePassword(password) === true){
            User.find({ phoneNumber: phoneNumber }, (err, docs) => {
                if(docs.length){
                    return res.status(409).json({
                        status: 409,
                        message: 'This phone number is already used, please try again with another!'
                    });
                }

                const hashedPassword = Auth.hashPassword(password);
                const user = new User({
                    _id: new Mongoose.Types.ObjectId(),
                    firstName: firstName,
                    lastName: lastName,
                    email: lowerEmail,
                    phoneNumber: phoneNumber,
                    password: hashedPassword,
                    gender: gender,
                    role: 'client'
                });

                user
                    .save()
                    .then(() => {
                        const htmlContent = `<h1>Remark</h1>Hello ${firstName}, <br><br>Thank you for joining us, hope you enjoy our services.`
                        sendEmail.sendEmail(lowerEmail, 'Account creation success' , htmlContent);
                    })
                    .catch((err) => {
                        console.log(err);
                    });                
                
                res.status(201).json({
                    status: 201,
                    message: 'Registration successful',
                    createdUser: user,
                    token: Auth.generateToken(user)
                });

            });
        }else{
            return res.status(400).json({
                status: 400,
                message: 'Password must not be empty, it has to be at least 8 characters long,  it has to be at least 1 lowercase letter,  it has to be at least 1 uppercase letter,  it has to be at least one digit and it has to be at least one special character',
            });
        }
    }

    static signin(req, res){
        const { phoneNumber, password } = req.body;
        const { error } = validateUser.validateSignIn(userBodyModels.signInBody(req));

        if(error){
            return res.status(409).json({
                status: 409,
                message: error.details[0].message.replace(/"/g, '')
            });
        }

        User.findOne({ phoneNumber: phoneNumber })
            .exec()
            .then((docs) => {
                console.log('From Database: ', docs);
                const compare = Auth.checkPassword(password, docs.password);
                if(compare){
                    if(docs){
                        res.status(201).json({
                            status: 201,
                            message: 'Login Successful',
                            token: Auth.generateToken(docs)
                        });
                    }else{
                        res.status(404).json({
                            status: 404,
                            message: 'Wrong phone number or password'
                        });
                    }
                }else{
                    res.status(404).json({
                        status: 404,
                        message: 'Wrong phone number or password'
                    });
                }
            })
            .catch((err) => {
                res.status(500).json({
                    status: 500,
                    error: err
                });
            });
    }


    static forgotPassword(req, res){
        const { email } = req.body;
        const lowerEmail = email.toLowerCase();
        const { error } = validateUser.validateForgotPassword(userBodyModels.forgotPasswordBody(req));

        if(error){
            return res.status(400).json({
                status: 400,
                message: error.details[0].message.replace(/"/g, '')
            });
        }

        const randomNumber = Math.floor(Math.random() * 899999 + 100000);
        
        User.findOneAndUpdate({ email: lowerEmail },{ verificationCode: randomNumber })
            .then((result) => {
                if(result){
                    const htmlContent = `<h1>Remark</h1>Hello again ${result.firstName}, 
                                        <br><br>This is the verification email it contains the code for verification <h2>${randomNumber}</h2>`
                    sendEmail.sendEmail(lowerEmail, 'Password reset email', htmlContent);
                    res.status(201).json({
                        status: 201,
                        message: 'Verification email sent'
                    });
                }else{
                    res.status(404).json({
                        status: 404,
                        message: 'Email not found!'
                    });
                }
            })
            .catch((err) => {
                res.status(500).json({
                    status: 500,
                    error: err
                });
            });
    }

    static changePassword (req, res) {
        const { password, code } = req.body;
        const { error } = validateUser.validateChangePassword(userBodyModels.changePasswordBody(req));
        const hashedPassword = Auth.hashPassword(password);

        if(error){
            return res.status(400).json({
                status: 201,
                message: error.details[0].message.replace(/"/g, '')
            })
        }

        if (validateUser.validatePassword(password) === true) {
            User.findOneAndUpdate({ verificationCode: code }, { password: hashedPassword })
            .then((result) => {
                if(result){
                    const htmlContent = `<h1>Remark</h1>Hello again ${result.firstName}, 
                                        <br>Password changed successful`
                    sendEmail.sendEmail(result.email, 'Password reset email', htmlContent);

                    res.status(201).json({
                        status: 201,
                        message: 'Password changed successful'
                    });
                }else{
                    res.status(404).json({
                        status: 404,
                        message: 'You got the wrong code!'
                    });
                }
            })
            .catch((err) => {
                res.status(500).json({
                    status: 500,
                    error: err
                });
            });
        }else{
            return res.status(400).json({
                status: 400,
                message: 'Password must not be empty, it has to be at least 8 characters long,  it has to be at least 1 lowercase letter,  it has to be at least 1 uppercase letter,  it has to be at least one digit and it has to be at least one special character',
            });
        }
    }
}

export default UserControllers;