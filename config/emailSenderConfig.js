import nodemailer from 'nodemailer';
import { configDotenv } from 'dotenv';
configDotenv()

const mailTransporter = nodemailer.createTransport({
    host: process.env.MAIL_PROVIDER,
    port: process.MAIL_PROVIDER_PORT,
    secure: false,
    auth: {
        user: process.env.ETHEREAL_MAIL_USER,
        pass: process.env.ETHEREAL_USER_PASSWORD
    },
        tls: {
        rejectUnauthorized: false, 
    },
    logger: true,
    debug: true
})

export default mailTransporter;

