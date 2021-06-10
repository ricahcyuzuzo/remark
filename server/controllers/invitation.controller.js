import Mongoose from 'mongoose';
import inviteValidation from '../helpers/validations/inviteValidations';
import inviteBody from '../models/body/inviteBody.model'; 
import Invitation from '../models/db/invitation.model';
import sendEmail from '../helpers/sendEmail'; 
import User from '../models/db/users.model';

class InvitationController {
    static sendInvitation(req, res){
        const { toPersonPhoneNumber, date, time, restaurant, toEmail } = req.body;
        const { error } = inviteValidation.validateInvite(inviteBody.inviteBody(req));

        if (error) {
            return res.status(400).json({
                status: 400,
                message: error.details[0].message.replace(/"/g, '')
            });
        }

        const invitation = new Invitation({
            _id: new Mongoose.Types.ObjectId(),
            toPersonPhoneNumber: toPersonPhoneNumber,
            toEmail: toEmail,
            date: date,
            time: time,
            restaurant: restaurant,
            status: 'pending'
        });
        
        invitation
            .save()
            .then(() => {
                res.status(201).json({
                    status: 201,
                    message: 'Invitaion Sent'
                });

                const htmlContent = `<h1>Remark</h1> You have got a new invite, please check it out in the app.`
                sendEmail.sendEmail(toEmail, 'Notification' , htmlContent);
            })
            .catch((err) => {
                res.status(500).json({
                    status: 500,
                    error: err 
                })
            });
    }

    static getAllInvites(req, res){
        const { phonenumber } = req.query;

        Invitation.find({ toPersonPhoneNumber: phonenumber})
            .exec()
            .then((docs) => {
                if(docs.length > 0){
                    res.status(200).json({
                        status: 200,
                        data: docs
                    });
                }else{
                    res.status(404).json({
                        status: 404,
                        message: 'No invites'
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

    static getOneInvite(req, res){
        const { invitation_id } = req.query;

        Invitation.findById(invitation_id)
            .exec()
            .then((docs) => {
                if (docs) {
                    res.status(200).json({
                        status:200,
                        data: docs
                    });
                }else{
                    res.status(404).json({
                        status: 404,
                        message: 'Invite not found'
                    });
                }
            })
            .catch((err) => {
                res.status(500).json({
                    status: 500,
                    error: err
                })
            });
    }

    static acceptInvite(req, res){
        const { invitation_id } = req.query;

        Invitation.findByIdAndUpdate(invitation_id, { status: 'accepted' })
            .then(() => {
                res.status(201).json({
                    status: 201,
                    message: 'You have Accepted this invite',
                });
            })
            .catch((err) => {
                res.status(500).json({
                    status: 500,
                    error: err
                });
            });
    }

    static denyInvite(req, res){
        const { invitation_id } = req.query;

        Invitation.findByIdAndUpdate(invitation_id, { status: 'denied' })
            .then(() => {
                res.status(201).json({
                    status: 201,
                    message: 'You have Denied this invite',
                });
            })
            .catch((err) => {
                res.status(500).json({
                    status: 500,
                    error: err
                });
            });
    }

    static viewAllUsers(req, res){
        User.find()
            .exec()
            .then((docs) => {
                if (docs.length >= 0) {
                    res.status(200).json({
                        status: 200,
                        data: docs
                    });
                }else{
                    res.status(404).json({
                        status: 404,
                        message: 'No users found!'
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
}

export default InvitationController;