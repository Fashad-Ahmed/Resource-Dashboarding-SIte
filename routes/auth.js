const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check');
const Teacher = require('../models/Teacher');

// sign up

router.post('/teacherSignup', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Include a valid email'),
    check('password', 'enter password of atleast length 6').isLength({ min: 6 }),
    check('status')
],
    async (req, res) => {
        const { name, email, password, status } = req.body
        console.log("name", name)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(404).json({ errors: errors.array() })
        }



        // user exists //encrypt password //return JWT
        try {
            let teacher = await Teacher.findOne({ email });

            if (teacher) {
                return res.status(400).json({ errors: [{ msg: 'Teacher already exists, Unable to register' }] });
            }

            teacher = new Teacher({
                name,
                email,
                password,
                status
            })

            const payload = {
                teacher: {
                    id: teacher.id
                }
            }

            const salt = await bcrypt.genSalt(10);
            teacher.password = await bcrypt.hash(password, salt);
            await teacher.save();

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );

        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error.');
        }
    });

router.get('/checkToken', auth, async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.teacher.id).select('-password');
        res.json(teacher);

    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
});

// log in

router.post('/teacherLogin',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters.').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(404).json({ errors: errors.array() })
        }

        const { email, password } = req.body;

        try {
            let teacher = await Teacher.findOne({ email });

            // compare normal and encerypted passwords

            if (!teacher) {
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
            }
            const isMatch = await bcrypt.compare(password, teacher.password);

            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            const payload = {
                user: {
                    id: teacher.id
                }
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );

        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error')
        }
    })
module.exports = router;