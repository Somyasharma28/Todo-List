const router = require('express').Router();
const UserModel = require('../model/UserModel');
const { userschema } = require('./validationSchema');
const bcrypt = require('bcrypt');

const SALT = 11;

const isNullOrUndefined = (val) => val === null || val === undefined;

//Register
router.post('/register', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    await userschema.validateAsync(req.body)
        .then(async (result) => {
            // Returns null otherwise return the single documen
            const existingUser = await UserModel.findOne({ email });
            if (isNullOrUndefined(existingUser)) {
                const hashPassword = bcrypt.hashSync(password, SALT);
                const newUser = new UserModel({ username, email, password: hashPassword });
                await newUser.save()
                    .then(() => {
                        //req.body.userId=newUser._id;
                        req.session.userId = newUser._id;
                        res.status(201).send({ success: "SignUp successfull" });
                    })
                    .catch((err) => {
                        const message = err.errors.password ?? err.errors.email ?? err.errors.username ?? { message: "Please enter all details correctly" };
                        res.status(400).send({ err: message.message });
                    })
            } else {

                res.status(400).send({ err: `${email} is already present` });
            }
        })
        .catch((error) => {

            res.status(400).send({ err: "Please enter details correctly" })
        });
});

//Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (isNullOrUndefined(existingUser)) {
        res.status(401).send({ err: `Please enter correct details` });
    } else {
        const verifyPwd = bcrypt.compareSync(password, existingUser.password);
        if (verifyPwd) {
            //req.body.userId=existingUser._id;
            req.session.userId = existingUser._id;
            res.status(200).send({ success: "Login successfull" });
        } else {
            res.status(401).send({ err: `Please enter correct details` });
        }
    }
});

//Logout
router.route('/logout').get((req, res) => {
    if (!isNullOrUndefined(req.session.userId)) {
        req.session.destroy(() =>
            res.status(200).send({ success: true }
            ))
    } else {
        res.status(200).send({ success: true });
    }
});


//MiddleWare
const AuthMiddleWare = async (req, res, next) => {
    if (isNullOrUndefined(req.session) || isNullOrUndefined(req.session.userId) ) {
        res.status(401).send({ err: "Not logged in" });
      } else {
        next();
      }
};

//UserData
router.get('/userInfo', AuthMiddleWare, async (req, res) => {
    await UserModel.findOne({ _id: req.session.userId })
        .then((existingUser) => {
            let username = "";
            const user = existingUser.username.split(" ");
            user.forEach(element => {
                username += element.toUpperCase() + " ";
            });
            res.status(200).send({ username: username.trim() });

        })
        .catch(err => res.status(400).send({
            err: "Error Occurred",
        }))
});

module.exports = router;