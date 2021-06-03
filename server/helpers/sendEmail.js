import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

class sendEmail {
    static sendEmail(toEmail, subject, htmlContent){
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: toEmail,
            from: process.env.SENDER_EMAIL,
            subject: subject,
            text: 'Remark app',
            html: htmlContent,
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
