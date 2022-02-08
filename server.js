
const express = require('express');
var Accounts = require('./Models/Accounts');
var Courses = require('./Models/Courses');
var Users = require('./Models/Users');


var app = express();
var mustacheExpress = require('mustache-express');
const path = require('path');

app.engine('html', mustacheExpress());

app.set('view engine', 'html');
app.set('views',path.resolve( __dirname + '/views'));


let ACCESS_TOKEN = '<Access Token>';


const port = process.env.PORT || 8080;


app.get("/", (req, res) => {

    console.log("request");

    let accounts = new Accounts(ACCESS_TOKEN);


    accounts.getAccounts().then((account) => {
        console.log(account);
        res.render('index',{accounts: account});
});
});

app.get("/account/:id/courses", (req, res) => {

    console.log("request courses");

    let account_id = req.params.id;

    console.log("id "+account_id);

    let courses = new Courses(ACCESS_TOKEN,account_id);


    courses.getCourses().then((course) => {
        console.log(course);
        if(course == null || course.length < 1){
            res.json({error:course});
        }else {
            res.json({courses: {name: course[0].name, id: course[0].id}})
        }
        // res.send("index",{accounts:{name:account[0].name, id:account[0].id }});
    });
});

app.get("/account/:id/users", (req, res) => {
console.dir(res);
    console.log("request courses");

    let account_id = req.params.id;

    console.log("id "+account_id);

    let users = new Users(ACCESS_TOKEN,account_id);


    users.getUsers().then((user) => {
        console.log(user);
        if(user == null || user.length < 1){
            res.json({error:user});
        }else {

            //json for random user
            let num = Math.floor(Math.random()*(user.length));
            res.json({user: {drus: user[num].login_id, id: user[num].id}})
        }
    });
});

app.get("/view/account/:id/users", (req, res) => {
    console.dir(res);
    console.log("request users");

    let account_id = req.params.id;

    console.log("id "+account_id);

    let users = new Users(ACCESS_TOKEN,account_id);


    users.getUsers().then((user) => {
        console.log(user);
        if(user == null || user.length < 1){
            res.render('error');
        }else {
            res.render('users',{users: user, account_id:account_id});

        }
    });
});
app.get("/view/account/:id/users/:user_id/courses", (req, res) => {
    console.dir(res);
    console.log("request courses");

    let account_id = req.params.id;
    let user_id = req.params.user_id;

    console.log("id "+account_id+" "+user_id);

    let courses = new Courses(ACCESS_TOKEN,account_id);


    courses.getCoursesByUser(user_id).then((course) => {
        console.log(course);
        if(course == null || course.length < 1){
            res.render('error');
        }else {
            res.render('courses',{courses: course, account_id:account_id});
            //  res.json({user: {drus: user[0].login_id, id: user[0].id}})
        }
        // res.send("index",{accounts:{name:account[0].name, id:account[0].id }});
    });
});


app.use(express.static('public'));

app.listen(port, () => {
    console.log('Server running at http://localhost:'+port);
});
