import { use } from "chai";

class userBody {
    static signUpBody (req){
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password,
            gender: req.body.gender
        }

        return user;
    }

    static signInBody (req){
        const user = {
            phoneNumber: req.body.phoneNumber,
            password: req.body.password
        }

        return user;
    }

    static forgotPasswordBody(req){
        const user = {
            email: req.body.email
        }

        return user;
    }
}

export default userBody;
