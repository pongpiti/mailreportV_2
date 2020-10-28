const { request } = require("express");
var express = require("express");
var router = express.Router();
var JsSearch = require("js-search");
var multer = require("multer");
var nodemailer = require("nodemailer");
var MongoClient = require("mongodb").MongoClient;
var url =
  "mongodb+srv://pongpiti_1:1234@cluster0-rbtdf.mongodb.net/email?retryWrites=true&w=majority";

function enSureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/users/login");
  }
}

router.get("/", enSureAuthenticated, function (req, res, next) {
  res.render("index");
});

router.get("/profile", enSureAuthenticated, function (req, res, next) {
  res.render("showdatainemail/profile");
});

router.get("/show/:subject", enSureAuthenticated, function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("email");
    var query = { subject: req.params.subject };
    if (req.params.subject == "all") {
      MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("email");
        var query1 = {
          $or: [
            { subject: "ใบเสนอราคา" },
            { subject: "ใบแจ้งหนี้" },
            { subject: "ใบเสร็จ" },
            { subject: "สั่งซื้อสินค้า" },
            { subject: "ใบส่งสินค้า" },
            { subject: "ใบขอซื้อ" },
          ],
        };

        dbo
          .collection("data")
          .find(query1)
          .toArray(async function (err, result) {
            var col = dbo.collection("data");
            const dates = await col.distinct("date");
            if (err) throw err;
            db.close();
            res.render("showdatainemail/all", {
              lists: result,
              datetime: dates,
            });
          });
      });
    } else if (req.params.subject == "ใบเสนอราคา") {
      var chart =
        "<iframe" +
        " " +
        'style="' +
        " " +
        "background: #131313;" +
        " " +
        "border: none;" +
        " " +
        "border-radius: 2px;" +
        " " +
        "box-shadow: 0 2px 10px 0 rgba(70, 76, 79, 0.2);" +
        " " +
        '"' +
        " " +
        "width=100%" +
        " " +
        'height="480"' +
        " " +
        'src="https://charts.mongodb.com/charts-project-0-dpnhp/embed/charts?id=d59d9509-e41b-403b-b401-1704c1125e36&autoRefresh=10&theme=dark"' +
        " " +
        "></iframe>";
      dbo
        .collection("data")
        .find(query)
        .toArray(function (err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
          res.render("showdatainemail/showdata", {
            lists: result,
            charts: chart,
            title: req.params.subject,
          });
        });
    } else if (req.params.subject == "ใบแจ้งหนี้") {
      var chart =
        "<iframe" +
        " " +
        'style="' +
        " " +
        "background: #131313;" +
        " " +
        "border: none;" +
        " " +
        "border-radius: 2px;" +
        " " +
        "box-shadow: 0 2px 10px 0 rgba(70, 76, 79, 0.2);" +
        " " +
        '"' +
        " " +
        "width=100%" +
        " " +
        'height="480"' +
        " " +
        'src="https://charts.mongodb.com/charts-project-0-dpnhp/embed/charts?id=410c9328-fa39-4266-855d-c9819e2642a8&autoRefresh=10&theme=dark"' +
        " " +
        "></iframe>";
      dbo
        .collection("data")
        .find(query)
        .toArray(function (err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
          res.render("showdatainemail/showdata", {
            lists: result,
            charts: chart,
            title: req.params.subject,
          });
        });
    } else if (req.params.subject == "ใบเสร็จ") {
      var chart =
        "<iframe" +
        " " +
        'style="' +
        " " +
        "background: #131313;" +
        " " +
        "border: none;" +
        " " +
        "border-radius: 2px;" +
        " " +
        "box-shadow: 0 2px 10px 0 rgba(70, 76, 79, 0.2);" +
        " " +
        '"' +
        " " +
        "width=100%" +
        " " +
        'height="480"' +
        " " +
        'src="https://charts.mongodb.com/charts-project-0-dpnhp/embed/charts?id=c8f56a99-6531-4420-9a7e-568db12eed3f&autoRefresh=10&theme=dark"' +
        " " +
        "></iframe>";
      dbo
        .collection("data")
        .find(query)
        .toArray(function (err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
          res.render("showdatainemail/showdata", {
            lists: result,
            charts: chart,
            title: req.params.subject,
          });
        });
    } else if (req.params.subject == "สั่งซื้อสินค้า") {
      var chart =
        "<iframe" +
        " " +
        'style="' +
        " " +
        "background: #131313;" +
        " " +
        "border: none;" +
        " " +
        "border-radius: 2px;" +
        " " +
        "box-shadow: 0 2px 10px 0 rgba(70, 76, 79, 0.2);" +
        " " +
        '"' +
        " " +
        "width=100%" +
        " " +
        'height="480"' +
        " " +
        'src="https://charts.mongodb.com/charts-project-0-dpnhp/embed/charts?id=5d3e8ffa-2406-46d8-a110-2994bbe16d83&autoRefresh=10&theme=dark"' +
        " " +
        "></iframe>";
      dbo
        .collection("data")
        .find(query)
        .toArray(function (err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
          res.render("showdatainemail/showdata", {
            lists: result,
            charts: chart,
            title: req.params.subject,
          });
        });
    } else if (req.params.subject == "ใบส่งสินค้า") {
      var chart =
        "<iframe" +
        " " +
        'style="' +
        " " +
        "background: #131313;" +
        " " +
        "border: none;" +
        " " +
        "border-radius: 2px;" +
        " " +
        "box-shadow: 0 2px 10px 0 rgba(70, 76, 79, 0.2);" +
        " " +
        '"' +
        " " +
        "width=100%" +
        " " +
        'height="480"' +
        " " +
        'src="https://charts.mongodb.com/charts-project-0-dpnhp/embed/charts?id=d0ba18bf-2257-47f6-9fea-007349d715e7&autoRefresh=10&theme=dark"' +
        " " +
        "></iframe>";
      dbo
        .collection("data")
        .find(query)
        .toArray(function (err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
          res.render("showdatainemail/showdata", {
            lists: result,
            charts: chart,
            title: req.params.subject,
          });
        });
    } else if (req.params.subject == "ใบขอซื้อ") {
      var chart =
        "<iframe" +
        " " +
        'style="' +
        " " +
        "background: #131313;" +
        " " +
        "border: none;" +
        " " +
        "border-radius: 2px;" +
        " " +
        "box-shadow: 0 2px 10px 0 rgba(70, 76, 79, 0.2);" +
        " " +
        '"' +
        " " +
        "width=100%" +
        " " +
        'height="480"' +
        " " +
        'src="https://charts.mongodb.com/charts-project-0-dpnhp/embed/charts?id=e3f76921-f9d7-4f1f-b1ad-944b8491e1dc&autoRefresh=10&theme=dark"' +
        " " +
        "></iframe>";
      dbo
        .collection("data")
        .find(query)
        .toArray(function (err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
          res.render("showdatainemail/showdata", {
            lists: result,
            charts: chart,
            title: req.params.subject,
          });
        });
    }
  });
});

router.post("/show/:subject", enSureAuthenticated, function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("email");
    /*     var query = { subject: req.params.subject }; */
    var date = req.body.date;
    if (req.params.subject == "all") {
      MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("email");
        var query1 = {
          $or: [
            { subject: "ใบเสนอราคา" },
            { subject: "ใบแจ้งหนี้" },
            { subject: "ใบเสร็จ" },
            { subject: "สั่งซื้อสินค้า" },
            { subject: "ใบส่งสินค้า" },
            { subject: "ใบขอซื้อ" },
          ],
        };

        dbo
          .collection("data")
          .find(query1)
          .toArray(async function (err, result) {
            var col = dbo.collection("data");
            const dates = await col.distinct("date");
            if (err) throw err;
            db.close();
            res.render("showdatainemail/all", {
              lists: result,
              datetime: dates,
            });
          });
      });
    } else if (req.params.subject == "ใบเสนอราคา") {
      var chart =
        "<iframe" +
        " " +
        'style="' +
        " " +
        "background: #131313;" +
        " " +
        "border: none;" +
        " " +
        "border-radius: 2px;" +
        " " +
        "box-shadow: 0 2px 10px 0 rgba(70, 76, 79, 0.2);" +
        " " +
        '"' +
        " " +
        "width=100%" +
        " " +
        'height="480"' +
        " " +
        'src="https://charts.mongodb.com/charts-project-0-dpnhp/embed/charts?id=d59d9509-e41b-403b-b401-1704c1125e36&autoRefresh=10&theme=dark"' +
        " " +
        "></iframe>";
      dbo
        .collection("data")
        .find({
          $and: [
            { $or: [{ from: { $regex: date } }, { date: { $regex: date } }] },
            { $or: [{ subject: "ใบเสนอราคา" }] },
          ],
        })
        .toArray(function (err, result) {
          if (err) throw err;
          db.close();
          res.render("showdatainemail/showdata", {
            lists: result,
            title: req.params.subject,
            charts: chart,
          });
        });
    } else if (req.params.subject == "ใบแจ้งหนี้") {
      var chart =
        "<iframe" +
        " " +
        'style="' +
        " " +
        "background: #131313;" +
        " " +
        "border: none;" +
        " " +
        "border-radius: 2px;" +
        " " +
        "box-shadow: 0 2px 10px 0 rgba(70, 76, 79, 0.2);" +
        " " +
        '"' +
        " " +
        "width=100%" +
        " " +
        'height="480"' +
        " " +
        'src="https://charts.mongodb.com/charts-project-0-dpnhp/embed/charts?id=410c9328-fa39-4266-855d-c9819e2642a8&autoRefresh=10&theme=dark"' +
        " " +
        "></iframe>";
      dbo
        .collection("data")
        .find({
          $and: [
            { $or: [{ from: { $regex: date } }, { date: { $regex: date } }] },
            { $or: [{ subject: "ใบแจ้งหนี้" }] },
          ],
        })
        .toArray(function (err, result) {
          if (err) throw err;
          db.close();
          res.render("showdatainemail/showdata", {
            lists: result,
            title: req.params.subject,
            charts: chart,
          });
        });
    } else if (req.params.subject == "ใบเสร็จ") {
      var chart =
        "<iframe" +
        " " +
        'style="' +
        " " +
        "background: #131313;" +
        " " +
        "border: none;" +
        " " +
        "border-radius: 2px;" +
        " " +
        "box-shadow: 0 2px 10px 0 rgba(70, 76, 79, 0.2);" +
        " " +
        '"' +
        " " +
        "width=100%" +
        " " +
        'height="480"' +
        " " +
        'src="https://charts.mongodb.com/charts-project-0-dpnhp/embed/charts?id=c8f56a99-6531-4420-9a7e-568db12eed3f&autoRefresh=10&theme=dark"' +
        " " +
        "></iframe>";
      dbo
        .collection("data")
        .find({
          $and: [
            { $or: [{ from: { $regex: date } }, { date: { $regex: date } }] },
            { $or: [{ subject: "ใบเสร็จ" }] },
          ],
        })
        .toArray(function (err, result) {
          if (err) throw err;
          db.close();
          res.render("showdatainemail/showdata", {
            lists: result,
            title: req.params.subject,
            charts: chart,
          });
        });
    } else if (req.params.subject == "สั่งซื้อสินค้า") {
      var chart =
        "<iframe" +
        " " +
        'style="' +
        " " +
        "background: #131313;" +
        " " +
        "border: none;" +
        " " +
        "border-radius: 2px;" +
        " " +
        "box-shadow: 0 2px 10px 0 rgba(70, 76, 79, 0.2);" +
        " " +
        '"' +
        " " +
        "width=100%" +
        " " +
        'height="480"' +
        " " +
        'src="https://charts.mongodb.com/charts-project-0-dpnhp/embed/charts?id=5d3e8ffa-2406-46d8-a110-2994bbe16d83&autoRefresh=10&theme=dark"' +
        " " +
        "></iframe>";
      dbo
        .collection("data")
        .find({
          $and: [
            { $or: [{ from: { $regex: date } }, { date: { $regex: date } }] },
            { $or: [{ subject: "สั่งซื้อสินค้า" }] },
          ],
        })
        .toArray(function (err, result) {
          if (err) throw err;
          db.close();
          res.render("showdatainemail/showdata", {
            lists: result,
            title: req.params.subject,
            charts: chart,
          });
        });
    } else if (req.params.subject == "ใบส่งสินค้า") {
      var chart =
        "<iframe" +
        " " +
        'style="' +
        " " +
        "background: #131313;" +
        " " +
        "border: none;" +
        " " +
        "border-radius: 2px;" +
        " " +
        "box-shadow: 0 2px 10px 0 rgba(70, 76, 79, 0.2);" +
        " " +
        '"' +
        " " +
        "width=100%" +
        " " +
        'height="480"' +
        " " +
        'src="https://charts.mongodb.com/charts-project-0-dpnhp/embed/charts?id=d0ba18bf-2257-47f6-9fea-007349d715e7&autoRefresh=10&theme=dark"' +
        " " +
        "></iframe>";
      dbo
        .collection("data")
        .find({
          $and: [
            { $or: [{ from: { $regex: date } }, { date: { $regex: date } }] },
            { $or: [{ subject: "ใบส่งสินค้า" }] },
          ],
        })
        .toArray(function (err, result) {
          if (err) throw err;
          db.close();
          res.render("showdatainemail/showdata", {
            lists: result,
            title: req.params.subject,
            charts: chart,
          });
        });
    } else if (req.params.subject == "ใบขอซื้อ") {
      var chart =
        "<iframe" +
        " " +
        'style="' +
        " " +
        "background: #131313;" +
        " " +
        "border: none;" +
        " " +
        "border-radius: 2px;" +
        " " +
        "box-shadow: 0 2px 10px 0 rgba(70, 76, 79, 0.2);" +
        " " +
        '"' +
        " " +
        "width=100%" +
        " " +
        'height="480"' +
        " " +
        'src="https://charts.mongodb.com/charts-project-0-dpnhp/embed/charts?id=e3f76921-f9d7-4f1f-b1ad-944b8491e1dc&autoRefresh=10&theme=dark"' +
        " " +
        "></iframe>";
      dbo
        .collection("data")
        .find({
          $and: [
            { $or: [{ from: { $regex: date } }, { date: { $regex: date } }] },
            { $or: [{ subject: "ใบขอซื้อ" }] },
          ],
        })
        .toArray(function (err, result) {
          if (err) throw err;
          db.close();
          res.render("showdatainemail/showdata", {
            lists: result,
            title: req.params.subject,
            charts: chart,
          });
        });
    }
  });
});

router.get("/sendemail", enSureAuthenticated, function (req, res, next) {
  res.render("showdatainemail/sendmail");
});

router.post("/sendemail", enSureAuthenticated, function (req, res, next) {
  var email = req.body.email;
  var subject = req.body.subject;
  var message = req.body.content;
  var fileX = req.body.myfile;

  async function main() {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        // ข้อมูลการเข้าสู่ระบบ
        user: "pongpiti23.23@gmail.com", // email user ของเรา
        pass: "pongpiti1751", // email password
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });
    // เริ่มทำการส่งอีเมล
    let info = await transporter.sendMail({
      from: email, // อีเมลผู้ส่ง
      to: email, // อีเมลผู้รับ สามารถกำหนดได้มากกว่า 1 อีเมล โดยขั้นด้วย ,(Comma)
      subject: subject, // หัวข้ออีเมล
      html: message,
      /*  attachments: [{ filename: fileX, path: fileX }],  */ // plain text body
    });

    MongoClient.connect(url, function (err, db) {
      var a = new Date();
      var b = new Date();
      var c = new Date();
      var day = a.getDate();
      var month = b.getMonth() + 1;
      var year = c.getFullYear();
      if (err) throw err;
      var dbo = db.db("email");
      var myobj = [
        {
          date: day + "-" + month + "-" + year,
          from: email,
          subject: subject,
          body: message,
        },
      ];
      dbo.collection("data").insertMany(myobj, function (err, res) {
        if (err) throw err;
        db.close();
      });
    });
    // log ข้อมูลการส่งว่าส่งได้-ไม่ได้
    console.log("Message sent: %s", info.messageId);
    res.render("index");
  }
  main().catch(console.error);
});

router.post("/all", enSureAuthenticated, function (req, res, next) {
  var date = req.body.date;
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("email");
    dbo
      .collection("data")
      .find({
        $and: [
          {
            $or: [
              { from: { $regex: date } },
              { date: { $regex: date } },
              { subject: { $regex: date } },
            ],
          },
          {
            $or: [
              { subject: "ใบเสนอราคา" },
              { subject: "ใบแจ้งหนี้" },
              { subject: "ใบเสร็จ" },
              { subject: "สั่งซื้อสินค้า" },
              { subject: "ใบส่งสินค้า" },
              { subject: "ใบขอซื้อ" },
            ],
          },
        ],
      })
      .toArray(function (err, result) {
        if (err) throw err;
        db.close();
        res.render("showdatainemail/all", { lists: result });
      });
  });
});

router.get("/all", enSureAuthenticated, function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("email");
    var query1 = {
      $or: [
        { subject: "ใบเสนอราคา" },
        { subject: "ใบแจ้งหนี้" },
        { subject: "ใบเสร็จ" },
        { subject: "สั่งซื้อสินค้า" },
        { subject: "ใบส่งสินค้า" },
        { subject: "ใบขอซื้อ" },
      ],
    };
    dbo
      .collection("data")
      .find(query1)
      .toArray(async function (err, result) {
        var col = dbo.collection("data");
        const dates = await col.distinct("date");
        if (err) throw err;
        db.close();
        res.render("showdatainemail/all", { lists: result, datetime: dates });
      });
  });
});

module.exports = router;
