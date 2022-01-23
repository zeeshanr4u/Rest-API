
import express from 'express';
import jwt from 'jsonwebtoken'
const router = express.Router();
const secretkeyJWT = 'WERWERDFDSF4R4FD';

const users = [];
const tasks = [];

//register new user
router.post('/register', (req, res) => {
    const arrlen = users.length + 1
    const password = req.body.password;
    const email = req.body.email;
    const newobj = { email, password }

    const idgenert = { id: arrlen }
    const userID = idgenert.id;

    const newuserwidID = { ...idgenert, ...newobj }
    //console.log(newuserwidID);

    users.push(newuserwidID);
    res.json({
        message: 'User Registered Successfully',
        User: email,
        id: userID
    })

})

//Login user
router.post('/login', (req, res) => {

    if (req.body.email != users.map(e => e.email).join('')) {
        res.status(404).json({
            message: 'User not found in record'
        })
    }

    const bodypass = req.body.password;

    // console.log(users.map(e => e.password).join(''));
    const token = jwt.sign({ users }, secretkeyJWT)
    //console.log(token);
    if (bodypass === users.map(e => e.password).join('')) {
        res.json({
            message: 'User Login Successfully',
            token
        })

    } else res.json({
        message: 'incorrect password'
    })

})


//get All users
router.get('/', isauthorize, (req, res) => {

    //console.log(users);
    jwt.verify(req.token, secretkeyJWT, (err, authData) => {

        if (err) {
            res.json({
                message: 'Token Authentication failed while register user'
            })
        } else {
            res.json({
                message: 'All Users',
                authData
            })
        }
    })


});



//register new task
router.post('/create-task', isauthorize, (req, res) => {

    const arrrlen = tasks.length + 1;

    const name = req.body.name;
    const newObjj = { id: arrrlen, name }

    jwt.verify(req.token, secretkeyJWT, (err) => {
        tasks.push(newObjj);

        if (err) {
            res.json({
                message: 'Token Authentication failed while register task'
            })
        } else {
            res.json({
                message: 'Task Registered Successfully',
                newObjj
            })
        }
    })



})


//get All tasks
router.get('/list-tasks', isauthorize, (req, res) => {

    jwt.verify(req.token, secretkeyJWT, (err) => {

        if (err) {
            res.json({
                message: 'Token Authentication failed while get tasks'
            })
        } else {
            res.json({
                message: 'All tasks here',
                tasks
            })
        }
    })



});



function isauthorize(req, res, next) {
    //get auth header value
    const bearerheader = req.headers['authorization'];
    //check if bearer is undefined
    if (typeof bearerheader !== 'undefined') {
        //split at the space 
        const bearer = bearerheader.split(' ')
        //get token from array 
        const bearerToken = bearer[1]
        req.token = bearerToken;
        next(); //next middleware
    } else {
        res.json({
            message: 'Porbidden Access'
        })
    }
}


export default router;