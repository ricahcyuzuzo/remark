import Hapi from '@hapi/joi';

const validateInvite = (user) => {
    const schema = Hapi.object().keys({
        toPersonPhoneNumber: Hapi.string().min(10).max(10).required(),
        toEmail: Hapi.string().email().required(),
        date: Hapi.string().required(),
        time: Hapi.string().required(),
        restaurant: Hapi.string().required()
    });

    return schema.validate(user);
}

export default { validateInvite };
