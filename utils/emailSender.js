import mailTransporter from "../config/emailSenderConfig.js";
import ejs from 'ejs';
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import {__dirname} from '../app.js'

// const template = new ejs.Template('views/verifyPasswordReset.ejs')
const template = ejs.compile('views/passwordResetVerify.ejs')
async function sendMail() {
    let user = {
        email: 'damisco005@gmail.com',
        firstName: 'dami',
        lastName: 'lola',
        token: 't1o2k3e4n5'
    }
    
    let mail = {
        subject: 'password reset',
        type: 'password reset',
        text: 'Reset your password',
        template: await ejs.renderFile(path.join(__dirname, 'views', 'passwordResetVerify.ejs'), {user})
    }   
        const info = await mailTransporter.sendMail({
        from: '"Support" <postmaster@sandbox865594f389264fac85d6b6a2629f735a.mailgun.org>',
        to: user.email,
        subject: mail.subject,
        text: mail.text,
        html: mail.template
    })

console.log(info)
}

sendMail().catch(console.error);