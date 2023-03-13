const nodemailer = require('nodemailer')
const { OAuth2Client } = require('google-auth-library')

const OAUTH_PLAYGROUND = `${process.env.OAUTH_PLAYGROUND}`
const CLIENT_ID = `${process.env.MAIL_CLIENT_ID}`
const CLIENT_SECRET = `${process.env.MAIL_CLIENT_SECRET}`
const REFRESH_TOKEN = `${process.env.MAIL_REFRESH_TOKEN}`
const SENDER_MAIL = `${process.env.SENDER_EMAIL_ADDRESS}`

// send mail
const sendEmail = async (to, url, txt) => {
	const myOAuth2Client = new OAuth2Client(
		CLIENT_ID,
		CLIENT_SECRET,
		OAUTH_PLAYGROUND
	)
	myOAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })
	try {
		const access_token = await myOAuth2Client.getAccessToken()

		const transport = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				type: 'OAuth2',
				user: SENDER_MAIL,
				clientId: CLIENT_ID,
				clientSecret: CLIENT_SECRET,
				refreshToken: REFRESH_TOKEN,
				accessToken: access_token,
			},
		})

		console.log(to)
		const mailOptions = {
			from: SENDER_MAIL,
			to: to,
			subject: 'Manager-Work-App',
			html: `
              <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
              <h2 style="text-align: center; text-transform: uppercase;color: teal;">${txt.title}</h2>
              <p>${txt.des}</p>
              
              <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt.button}</a>
          
              <p>If the button doesn't work for any reason, you can also click on the link below:</p>
          
              <div>${url}</div>
              </div>
            `,
		}

		const result = await transport.sendMail(mailOptions)
		return result
	} catch (err) {
		console.log(err)
	}
}

module.exports = sendEmail
