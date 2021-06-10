class invitationBody{
    static inviteBody (req){
        const body = {
            toPersonPhoneNumber: req.body.toPersonPhoneNumber,
            toEmail: req.body.toEmail,
            date: req.body.date,
            time: req.body.time,
            restaurant: req.body.restaurant
        }

        return body;
    }
}

export default invitationBody;