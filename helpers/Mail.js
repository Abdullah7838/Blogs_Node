const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "needhelpvcc@gmail.com",
    pass: "pgrn yivy xkjh tquq",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function Mail(email ,name) {
  try {
    const info = await transporter.sendMail({
      from: '"LearningIG" <needhelpvcc@gmail.com>', // sender address
      to: email, 
      subject: "Welcome to LearningIG ✔", // Subject line
      text: `Hi ${name},

Thank you for registering on LearningIG. We're excited to have you join our community!

Stay tuned for the latest news, games, and much more.

If you have any questions or need assistance, feel free to reach out to us at any time.

Happy exploring!

Best regards,
The LearningIG Team

© 2024 LearningIG. All rights reserved.`,
html: `<p>Hi ${name},</p>
<p>Thank you for registering on LearningIG. We're excited to have you join our community!</p>
<p>Stay tuned for the latest news, games, and much more.</p>
<p>If you have any questions or need assistance, feel free to reach out to us at any time.</p>
<p>Happy exploring!</p>
<p>Best regards,<br>The LearningIG Team</p>
<p>© 2024 LearningIG. All rights reserved.</p>`
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email: %s", error.message);
  }
}

module.exports={Mail}