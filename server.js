var express = require('express');
var mongoose = require('mongoose');
var xl = require("xlsx");
var ejs = require("ejs");
var fs = require("fs");
var excel = require("./excel");
var excelab = require("./excelab");
var app = express();
var fileupload = require('express-fileupload');
var bodya = require("body-parser");
app.use(bodya.urlencoded({ extended: true }));
app.use(bodya.json());
app.use(fileupload());
var url = 'mongodb+srv://Jaideep:Yahvi123@cluster0.eot5t.mongodb.net/?retryWrites=true&w=majority';
//var url = 'mongodb://localhost/cse'
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
var schema_login = mongoose.Schema({ username: { type: String, unique: true }, email: String, password: String });
var model_login = mongoose.model('login', schema_login);
var schema_teacher = mongoose.Schema({ name: String, username: { type: String, unique: true }, email: String, post: String });
var model_teacher = mongoose.model('teacher', schema_teacher);
var schema_batch = mongoose.Schema({ Semester: Number, exam: Array, file: Array });
var model_batch = mongoose.model('batch', schema_batch);
var schema_subject = mongoose.Schema({ Subject: Array });
var model_subject = mongoose.model('subjects', schema_subject);
var schema_conames = mongoose.Schema({ conames: Array, id: Number });
var model_conames = mongoose.model('conames', schema_conames);
var schema_exammark = mongoose.Schema({ exammark: Array, id: Number });
var model_exammark = mongoose.model('exammark', schema_exammark);



app.use(express.static('public'));
app.set('view engine', 'ejs');
var user = {
    username: "",
    password: "",
    email: "",
    name: "",
    post: "",
    generatedfile: "",
}
app.listen(6500, function () {
    console.log("server stated");
});
app.get("/", function (req, res) {
    res.render("login", { st: 2 })
});
app.post("/login", function (req, res) {

    model_login.find({}, function (err, data) {
        var t = 0;
        if ("admin@gmail.com" == req.body.email) {
            if ("admin" == req.body.password) {

                t = 1;
                user.username = "admin2021";
                user.password = "admin";
                user.email = "admin@gmail.com";
            }
            else {
                t = 2;

            }
        }
        if (t == 2)//email matching password not matching
        {
            res.render("login", { st: 1 });
        }
        if (t == 1) {
            model_teacher.find({ username: user.username }, function (err, data) {
                user.name = data[0].name;
                user.post = data[0].post;
                res.render("astaffd", data[0]);
            });
        }
        var t = 0;
        for (i = 0; i < data.length; i++) {
            if (data[i].email == req.body.email) {
                if (data[i].password == req.body.password) {

                    t = 1;
                    user.username = data[i].username;
                    user.password = data[i].password;
                    break;
                }
                else {
                    t = 2;
                    break;
                }
            }
            else {
                t = 0;
            }
        }
        if (t == 0)//email not found
        {
            res.render("login", { st: 0 });
        }
        if (t == 2)//email matching password not matching
        {
            res.render("login", { st: 1 });
        }
        if (t == 1) {
            model_teacher.find({ username: user.username }, function (err, data) {
                // console.log(data[0]);
                res.render("ustaffd", data[0]);
            });
        }
    });
});
app.get("/changepass", function (req, res) {
    if (user.username == "admin2021")
        res.render("achange", { ...user, stats: 0 });
    res.render("uchange", { ...user, stats: 0 });
});
app.post("/password", function (req, res) {

    if (req.body.status == 0) {
        res.render("achange", user);
    } else {
        model_login.findOneAndUpdate({ username: user.username }, { password: req.body.newp }, { upsert: true }, function (params) {
            console.log("updated");
            if (user.username == "admin2021") {
                res.render("achange", { ...user, stats: 1 }); //stats password change successfully
            } else {
                res.render("uchange", { ...user, stats: 1 }) //stats password change successfully
            }

        })
    }
});
app.get("/addsubject", function (req, res) {
    res.render("aaddsubject", { ...user, stats: 0 });
});
app.post("/addsubject1", function (req, res) {
        var subject = req.body.depart + "#" + req.body.batch + "#" + req.body.semester + "#" + req.body.sub + "#" + req.body.co;
        
        model_subject.findOneAndUpdate({id:1},{$push:{Subject:subject}},function(err)
        {
            console.log("ok");
            res.render("aaddsubject", { ...user, stats: 1 });
        })
    
});
app.get("/addteacher", function (req, res) {
    res.render("aaddtecher", { st: 2, username: user.username });
});
app.post("/aaddteacherdata", function (req, res) {
    var newlogin = new model_login;
    var newteach = new model_teacher;
    newlogin.username = req.body.uname;
    newlogin.email = req.body.email;
    newlogin.password = req.body.pass;
    newteach.username = req.body.uname;
    newteach.email = req.body.email;
    newteach.name = req.body.name;
    newteach.post = req.body.post;
    var t = 0;
    newlogin.save(function (err) {
        t = 1;
        newteach.save(function (err) {
            t = 2
            if (t == 0) {
                res.render("aaddtecher", { st: 1, username: user.username });
            }
            if (t == 2) {
                res.render("aaddtecher", { st: 0, username: user.username });
            }
        });

    });
});
app.get("/addexam", function (req, res) {
    model_subject.find({ id: 1 }, function (err, data) {
        res.render("addexam", { status: 0, username: user.username, subjects: data[0].Subject })
    });
});
app.post("/exam", function (req, res) {
    var exam = req.body.depart + "#" + req.body.batch + "#" + req.body.semester + "#" + req.body.subject + "#" + req.body.exam;
    console.log(req.body);
    model_batch.findOneAndUpdate({ Semester: Number(req.body.semester.split(" ")[1]) }, { $push: { exam } }, { upsert: true }, function () {
        model_exammark.findOneAndUpdate({ id: 1 }, { $push: { exammark: exam + "#" + req.body.Total } }, function () {
            model_subject.find({ id: 1 }, function (err, data) {
                res.render("addexam", { status: 1, username: user.username, subjects: data[0].Subject })
            });
        })

    })
})
app.get("/uploadfile", function (req, res) {
    model_subject.find({ id: 1 }, function (err, data) {
        model_batch.find({}, function (err, data1) {
            var exam = [];
            for (i = 0; i < data1.length; i++) {
                for (j = 0; j < data1[i].exam.length; j++)
                    exam.push(data1[i].exam[j]);
            }
            res.render("uploadfile", { username: user.username, subjects: data[0].Subject, exam, status: 0 });
        });
    });
});
app.post("/uploading", function (req, res) {
    if (req.body.pos == undefined) {
        var filename = req.body.depart + "#" + req.body.batch + "#" + req.body.semester + "#" + req.body.subject + "#" + req.body.exam + ".xlsx";
    } else {
        var filename = "Pos" + "#" + req.body.depart + "#" + req.body.batch + "#" + req.body.semester + "#" + req.body.subject + ".xlsx";
    }
    var file = req.files.file;
    file.mv("./public/" + filename, function (err) {
        model_batch.findOneAndUpdate({ Semester: Number(req.body.semester.split(" ")[1]) }, { $push: { file: filename } }, { upsert: true }, function () {
            model_subject.find({ id: 1 }, function (err, data) {
                model_batch.find({}, function (err, data1) {
                    var exam = [];
                    for (i = 0; i < data1.length; i++) {
                        for (j = 0; j < data1[i].exam.length; j++)
                            exam.push(data1[i].exam[j]);
                    }
                    res.render("uploadfile", { username: user.username, subjects: data[0].Subject, exam, status: 1 });
                });
            });
        });
    });
});
app.get("/generatefile", function (req, res) {
    var filemiss = []

    model_subject.find({ id: 1 }, function (err, data) {
        res.render("generatefile", { username: user.username, subjects: data[0].Subject, filemiss, genst: 0 });
    });
});
app.post("/generate", function (req, res) {
    // console.log(req.body);
    var file = req.files.file;
    var filename = req.body.depart + "#" + req.body.batch + "#" + req.body.semester + "#" + req.body.subject + "#" + "Targetfile.xlsx";
    file.mv("./public/" + req.body.depart + "#" + req.body.batch + "#" + req.body.semester + "#" + req.body.subject + "#" + "Targetfile.xlsx", function (err) {
        model_batch.find({}, function (err, data) {
            var exams1 = [];
            var files = [];
            for (i = 0; i < data.length; i++) {
                if (data[i].Semester == (req.body.semester.split(" ")[1])) {
                    exams1 = data[i].exam;
                    files = data[i].file;
                }
            }
            var exams = [];
            for (i = 0; i < exams1.length; i++) {
                var res1 = exams1[i].search(req.body.depart + "#" + req.body.batch + "#" + req.body.semester + "#" + req.body.subject + "#")
                if (res1 != -1) {
                    exams.push(exams1[i]);
                }
            }
            // console.log(exams);
            var filemiss = [];
            var fileavail = [];
            var t = 0;
            for (i = 0; i < exams.length; i++) {
                t = 0;
                for (j = 0; j < files.length; j++) {
                    if (files[j] == (exams[i] + ".xlsx")) {
                        fileavail.push(files[j]);
                        t = 1;
                        break;
                    }
                }
                if (t != 1) {
                    filemiss.push(exams[i] + ".xlsx")
                }
            }
            var t1 = 0;
            for (j = 0; j < files.length; j++) {

                if (files[j] == ("Pos" + "#" + req.body.depart + "#" + req.body.batch + "#" + req.body.semester + "#" + req.body.subject + ".xlsx")) {
                    fileavail.push("Pos" + "#" + req.body.depart + "#" + req.body.batch + "#" + req.body.semester + "#" + req.body.subject + ".xlsx")
                    t1 = 1;
                }
            }
            if (t1 == 0)
                filemiss.push("Pos" + "#" + req.body.depart + "#" + req.body.batch + "#" + req.body.semester + "#" + req.body.subject + ".xlsx")
            // console.log(fileavail);
            if (filemiss.length >= 1) {
                // console.log(filemiss)
                model_subject.find({ id: 1 }, function (err, data) {


                    res.render("generatefile", { username: user.username, subjects: data[0].Subject, filemiss, genst: 0 });
                });
            }
            else if (fileavail.length == 3) {
                model_subject.find({}, function (err, data1) {
                    var nocos = 0;
                    for (i = 0; i < data1[0].Subject.length; i++) {
                        var res1 = data1[0].Subject[i].search(req.body.depart + "#" + req.body.batch + "#" + req.body.semester + "#" + req.body.subject + "#");
                        if (res1 != -1) {
                            nocos = Number(data1[0].Subject[i].split("#")[4]);
                        }
                    }
                    var target = calculatetarget(filename)
                    user.generatedfile = excelab.generatefile(fileavail, req.body, user, target);
                    model_subject.find({ id: 1 }, function (err, data) {
                        res.render("generatefile", { username: user.username, subjects: data[0].Subject, filemiss, genst: 1 });
                    });
                });
            }
            else {
                model_subject.find({}, function (err, data1) {
                    var nocos = 0;
                    for (i = 0; i < data1[0].Subject.length; i++) {
                        var res1 = data1[0].Subject[i].search(req.body.depart + "#" + req.body.batch + "#" + req.body.semester + "#" + req.body.subject + "#");
                        if (res1 != -1) {
                            nocos = Number(data1[0].Subject[i].split("#")[4]);
                        }
                    }
                    var examtotalmark = [];
                    model_exammark.find({}, function (err, datat) {
                        for (i = 0; i < exams.length; i++) {
                            for (j = 0; j < datat[0].exammark.length; j++) {
                                if (datat[0].exammark[j].search(exams[i]) != -1) {
                                    examtotalmark.push(datat[0].exammark[j]);
                                }
                            }
                        }
                        var target = calculatetarget(filename)
                        model_conames.find({}, function (err, dataconames) {
                            for (no = 0; no < dataconames[0].conames.length; no++) {
                                if (dataconames[0].conames[no].search(req.body.depart + "#" + req.body.batch + "#" + req.body.semester + "#" + req.body.subject + "#") != -1) {
                                    user.generatedfile = excel.generatefile(nocos, exams, examtotalmark, fileavail, req.body, user, target, dataconames[0].conames[no]);
                                    model_subject.find({ id: 1 }, function (err, data) {
                                        res.render("generatefile", { username: user.username, subjects: data[0].Subject, filemiss, genst: 1 });
                                    });
                                }
                            }
                        })
                    })
                })
            }
        })
    })
});
app.get("/generatedfile", function (req, res) {
    res.sendFile(__dirname + "\\" + user.generatedfile);
})
app.get("/logout", function (req, res) {
    user = {
        username: "",
        password: "",
        email: "",
        name: "",
        post: "",
        generatedfile: "",
    }
    res.render("login", { st: 2 })
})
app.get("/details", function (req, res) {
    if (user.username == "admin2021") {
        model_teacher.find({ username: user.username }, function (err, data) {
            user.name = data[0].name;
            user.post = data[0].post;
            res.render("astaffd", data[0]);
        });
    }
    else {
        model_teacher.find({ username: user.username }, function (err, data) {
            // console.log(data[0]);
            res.render("ustaffd", data[0]);
        });
    }
});
app.get("/addconames", function (req, res) {
    model_subject.find({ id: 1 }, function (err, data) {
        res.render("conames", { status: 0, username: user.username, subjects: data[0].Subject })
    });
});
app.post("/conames", function (req, res) {
    console.log(req.body);
    var subject = req.body.depart + "#" + req.body.batch + "#" + req.body.semester + "#" + req.body.subject + "#" + req.body.noofcos + "$";
    var conames = "";
    for (i = 1; i <= req.body.noofcos; i++) {
        conames += req.body["co" + i] + "^";
    }
    var conamearray = []
    for (i = 0; i < conames.split("^").length; i++) {
        if (conames.split("^")[i].length > 1) {
            conamearray.push(conames.split("^")[i]);
        }
    }
    subject += conamearray.join("^");
    var ins = 0;
    console.log(subject);
    model_conames.find({}, function (err, data) {
        console.log(data[0]);
        for (i = 0; i < data[0].conames.length; i++) {
            if (data[0].conames[i].search(subject) == -1) {
                ins = 1;

            }
        }
        if (data[0].conames.length == 0) {
            ins = 1;
        }
        if (ins == 1) {
            model_conames.findOneAndUpdate({ id: 1 }, { $push: { conames: subject } }, function (err, sus) {

                console.log(sus)
                model_subject.find({ id: 1 }, function (err, data) {

                    res.render("conames", { status: 1, username: user.username, subjects: data[0].Subject })
                });
            })
        }
    })

});
app.get("/sampleFiles", function (req, res) {
    res.render("samplefile", { username: user.username })
})
app.get("/gradefile", function (req, res) {
    res.render("Gradefile", { ...user, stats: 0 })
});
app.post("/gradefileupload", function (req, res) {
    var file = req.files.file
    file.mv("./public/Grade.xlsx", function (err) {
        res.render("Gradefile", { ...user, stats: 1 })
    })
})
var calculatetarget = (filename) => {
    console.log(filename)
    var xl = require("xlsx");
    var wb1 = xl.readFile("./public/" + filename);
    var ws1 = wb1.Sheets["Sheet1"];
    var data = xl.utils.sheet_to_json(ws1);
    var wbg = xl.readFile("./public/Grade.xlsx");
    var wsg = wbg.Sheets["grade"];
    var datag = xl.utils.sheet_to_json(wsg);
    var universitymarks = []

    for (i = 0; i < data.length; i++) {
        for (j in datag[0]) {
            if (datag[0][j] == data[i].Mark1) {
                if (j.search('100') != -1) {
                    universitymarks.push({ mark1: 100 });
                    break
                }
                if (j.search('90') != -1) {
                    universitymarks.push({ mark1: 90 });
                    break
                }
                if (j.search('80') != -1) {
                    universitymarks.push({ mark1: 80 });
                    break
                }
                if (j.search('70') != -1) {
                    universitymarks.push({ mark1: 70 });
                    break
                }
                if (j.search('60') != -1) {
                    universitymarks.push({ mark1: 60 });
                    break
                }
                if (j.search('0') != -1) {
                    universitymarks.push({ mark1: 0 });
                    break
                }
            }
        }
    }


    for (i = 0; i < data.length; i++) {
        for (j in datag[0]) {
            if (datag[0][j] == data[i].Mark2) {
                if (j.search('100') != -1) {
                    universitymarks[i]["mark2"] = 100
                    break
                }
                if (j.search('90') != -1) {
                    universitymarks[i]["mark2"] = 90;
                    break
                }
                if (j.search('80') != -1) {
                    universitymarks[i]["mark2"] = 80;
                    break
                }
                if (j.search('70') != -1) {
                    universitymarks[i]["mark2"] = 70;
                    break
                }
                if (j.search('60') != -1) {
                    universitymarks[i]["mark2"] = 60;
                    break
                }
                if (j.search('0') != -1) {
                    universitymarks[i]["mark2"] = 0
                    break
                }
            }
        }
    }
    for (i = 0; i < data.length; i++) {
        for (j in datag[0]) {
            if (datag[0][j] == data[i].Mark3) {
                if (j.search('100') != -1) {
                    universitymarks[i]["mark3"] = 100
                    break
                }
                if (j.search('90') != -1) {
                    universitymarks[i]["mark3"] = 90;
                    break
                }
                if (j.search('80') != -1) {
                    universitymarks[i]["mark2"] = 80;
                    break
                }
                if (j.search('70') != -1) {
                    universitymarks[i]["mark3"] = 70;
                    break
                }
                if (j.search('60') != -1) {
                    universitymarks[i]["mark3"] = 60;
                    break
                }
                if (j.search('0') != -1) {
                    universitymarks[i]["mark3"] = 0
                    break
                }
            }
        }
    }

    // console.log(universitymarks);
    // console.log(universitymarks.length);

    var avg = {
        mark1: 0,
        mark2: 0,
        mark3: 0
    }
    for (i = 0; i < data.length; i++) {
        avg.mark1 += universitymarks[i].mark1;
        avg.mark2 += universitymarks[i].mark2;
        avg.mark3 += universitymarks[i].mark3;
    }
    avg.mark1 = Number((avg.mark1 / data.length).toFixed(2))
    avg.mark2 = Number((avg.mark2 / data.length).toFixed(2))
    avg.mark3 = Number((avg.mark3 / data.length).toFixed(2))

    var perst = {
        mark1: 0,
        mark2: 0,
        mark3: 0
    }
    for (i = 0; i < data.length; i++) {
        if (universitymarks[i].mark1 > avg.mark1)
            perst.mark1++;
        if (universitymarks[i].mark2 > avg.mark2)
            perst.mark2++;
        if (universitymarks[i].mark3 > avg.mark3)
            perst.mark3++;
    }

    var avgstin3years;  //Average % of Students Scoring more than Average Marks in Previous Three Years		
    avgstin3years = (perst.mark1 + perst.mark2 + perst.mark3) / 3;

    var target;
    if (avgstin3years >= 0 && avgstin3years <= 36)
        target = 40;
    if (avgstin3years >= 0 && avgstin3years <= 36)
        target = 40;
    if (avgstin3years >= 37 && avgstin3years <= 46)
        target = 50;
    if (avgstin3years >= 47 && avgstin3years <= 56)
        target = 60;
    if (avgstin3years >= 57 && avgstin3years <= 61)
        target = 65;
    if (avgstin3years >= 62 && avgstin3years <= 66)
        target = 70;
    if (avgstin3years >= 67 && avgstin3years <= 71)
        target = 75;
    if (avgstin3years >= 72 && avgstin3years <= 76)
        target = 80;
    if (avgstin3years >= 77 && avgstin3years <= 81)
        target = 85;
    if (avgstin3years >= 82 && avgstin3years <= 86)
        target = 90;
    if (avgstin3years >= 87 && avgstin3years <= 91)
        target = 95;
    if (avgstin3years >= 92 && avgstin3years <= 100)
        target = 100;

    console.log(target);
    return target;
}