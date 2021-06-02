import validateUser from '../helpers/validations/userValidations';
import userBodyModels from '../models/body/userBody.model';
import Auth from '../helpers/authenticate';
import User from '../models/db/users.model';
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
                    .then((result) => {
                        console.log(result);
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
        }
    }
}

export default UserControllers;