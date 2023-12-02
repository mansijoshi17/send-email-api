const express = require("express");
const router = express.Router();
const emailjs = require("@emailjs/nodejs");
const { config } = require("dotenv");

config();

// Send email
router.post("/send-email", async (req, res) => {
  const values = {
    from_name: "World Wide Link",
    message: req.body.message,
    reply_to: req.body.reply_to,
  };
  await emailjs
    .send(
      process.env.EMAIL_JS_SERVICE_ID,
      process.env.EMAIL_JS_TEMPLATE_ID,
      values,
      {
        publicKey: process.env.EMAIL_JS_USER_ID,
        privateKey: process.env.EMAIL_JS_PRIVATE_KEY,
      }
    )

    .then((result) => {
      console.log(result);
      res
        .status(200)
        .json({ success: true, message: "Email sent successfully" });
    })
    .catch((error) => {
      console.log(error, "error");
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    });
});

module.exports = router;
