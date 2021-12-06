const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/authStudent');
const { check, validationResult } = require('express-validator/check');
const Student = require('../models/Student');

router.post('/studentSignup',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Include a valid email'),
        check('password', 'enter password of atleast length 6').isLength({ min: 6 }),
        check('status'),
    ],
    async (req, res) => {
        console.log('enter howa ')
        const errors = validationResult(req);
        console.log(`hello`)
        if (!errors.isEmpty()) {
            return res.status(404).json({ errors: errors.array() })
        }
        console.log(`hello2`)
        const { name, email, password, status } = req.body;
        console.log(`hello3`)
        try {
            let student = await Student.findOne({ email });

            if (student) {
                return res.status(400).json({ errors: [{ msg: 'Student already exists, Unable to register' }] });
            }

            student = new Student({
                name,
                email,
                password,
                status
            })

            const payload = {
                student: {
                    id: student.id
                }
            }

            const salt = await bcrypt.genSalt(10);
            student.password = await bcrypt.hash(password, salt);
            await student.save();

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
    }
)


router.get('/checkToken', auth, async (req, res) => {
    try {
        const student = await Student.findById(req.student.id).select('-password');
        res.json({ student });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})

// student log in

router.post('/studentLogin',
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
            let student = await Student.findOne({ email });

            // compare normal and encerypted passwords

            if (!student) {
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
            }
            const isMatch = await bcrypt.compare(password, student.password);

            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            const payload = {
                user: {
                    id: student.id
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