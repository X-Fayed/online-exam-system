const nodemailer = require(`nodemailer`);

exports.sendEmail = async (from, pass, to, subject, text) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: from, // generated ethereal user
      pass: pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"Fred Foo 👻" <${from}>`, // sender address
    to: `${to.join(`,`)}`, // list of receivers
    subject: `${subject}`, // Subject line
    text: `${text}`, // plain text body
    // html: "<b>Hello world?</b>", // html body
  });
  console.log(info);
  return info;
};
