var express = require('express');
var router = express.Router();
var nodeMailer = require('nodemailer');
var mailServer = require('./mailServerInfomation');

/* GET home page. */

router.get('/', function(req, res, next) {
    res.render("index");
});

var acc ={
    email : 'nam@gmail.com',
    pass : '1234'
};
var dataStatus;
router.post('/cal', function (req, res) {
    var num1 =req.body.num1;
    var num2 = req.body.num2;
    if(acc.email === num1 && acc.pass === num2){
        dataStatus = true;
    }else{
        dataStatus = false;
    }
   res.json({data:dataStatus});

});
router.get('/go', function (req, res) {
    res.render('test')
});

router.post('/guimail', function (req, res) {
    var email = req.body.mailUser;
    var name = req.body.ten;
    var mess = req.body.mess;
    var transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
       service: 'Gmail',
       auth:{
           user: mailServer.emailServer.gmailServer,
           pass:mailServer.emailServer.passwordServer
       }
    });
    var option ={
      from: '3PTravel<no-reply@3PTravel>',
      to: [email,"eunravell@gmail.com"],
      subject: "Xac nhan hoa don",
      text: 'Nhan dc mail ne from '+ 'nampham@gmail.com',
        html: text
    };
    transporter.sendMail(option, function (err, info) {
       if(err){
           console.log(err);
           throw err;
       }else{
           console.log('ok');
           res.render('test',{
               email: email,
               name : name,
               mess: mess
           });
       }
    });

});

module.exports = router;
