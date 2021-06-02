import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class Authentication {
    static generateToken(user) {
        return jwt.sign({user}, 'agriAppWeb', { expiresIn: '1h' });
    }

    static hashPassword(password){
        return bcrypt.hashSync(password, 15);
    }

    static checkPassword(plainPassword, hashedPassword){
        return bcrypt.compareSync(plainPassword, hashedPassword);
    }
}

export default Authentication;
