import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

class sendEmail {
    static sendWelcomeEmail(toEmail, name){
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: toEmail,
            from: process.env.SENDER_EMAIL,
            subject: 'Account Creation successful',
            text: 'Remark app',
            html: `<h1>Remark</h1>Hello ${name}, <br><br>Thank you for joining us, hope you enjoy our services.`,
        }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        });
    }
}

export default sendEmail;
