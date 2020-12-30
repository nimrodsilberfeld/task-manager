const sgMail = require('@sendgrid/mail')
//const sendGridApiKey = "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"

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeMail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'nimrod513@gmail.com',
        subject: "Thanks for joining in!",
        text: `Welcome to the app,${name}.let us know how you get along`
    })
}

const sendCancelMail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'nimrod513@gmail.com',
        subject: "Hope to see you Again!",
        text: `We are sorry to see you go ${name},please let us know how we can improve are service`

    })
}

module.exports = {
    sendWelcomeMail,
    sendCancelMail
}