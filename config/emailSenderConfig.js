import nodemailer from 'nodemailer';
import { configDotenv } from 'dotenv';
configDotenv()

const mailTransporter = nodemailer.createTransport({
    // host: process.env.MAIL_PROVIDER,
    service: 'gmail',
    port: process.MAIL_PROVIDER_PORT,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.USER_PASSWORD
    },
    logger: true,
    debug: true
})

export default mailTransporter;
