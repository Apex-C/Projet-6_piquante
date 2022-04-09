
const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const cryptoJS = require("crypto-js");
const functions = require("./functions");

exports.signup = (req, res, next) => {
    // Hash the email the have a unique validation
    let emailHashed = cryptoJS.MD5(req.body.email).toString();
    // Encrypt the email with crypto-js ( Secret passphrase needs to be changed in production )
    let emailEncrypted = cryptoJS.AES.encrypt(
        req.body.email,
        "Secret Passphrase"
    );
    if (functions.checkPassword(req.body.password) && functions.checkEmail(req.body.email)) {

        bcrypt.hash(req.body.password, 10)

            .then(hash => {
                const user = new User({
                    email: emailEncrypted,
                    emailHash: emailHashed,
                    password: hash
                });

                user.save()
                    .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                    .catch(error => res.status(520).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));

    }

};

exports.login = (req, res, next) => {

    let emailHashed = cryptoJS.MD5(req.body.email).toString();

    User.findOne({ emailHash: emailHashed })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    })
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};