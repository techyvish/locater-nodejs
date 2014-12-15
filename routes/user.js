/**
 * Created by Vishal on 15/12/14.
 */
var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth:{
        user: "Your gmail",
        pass: "Gamil pass"
    }
})

exports.send = function (req, res) {

    var rand = Math.floor((Math.random() * 100) + 54 )
    host = req.get('host');
    link = "http://"+req.get('host')+"verify?id="+rand;
    mailOptions = {

        to: req.query.to,
        subject : "Please verify your email",
        html: "Hello, <br> Please click on the link to verify </br> <a href="+ link + ">"
    };

    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error,response){
        if (error)
        {
            console.log("error");
            res.send("failed sending email");
        }
        else
        {
            console.log("Message sent");
            res.send({ message :"Message sent succesfully"});
        }
    });

}