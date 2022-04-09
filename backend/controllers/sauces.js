const Sauce = require('../models/sauces');
const fs = require('fs');

exports.createScauce = (req, res) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    // let reghexChar = new RegExp(/[^*><;$&"]/g);
    const sauce = new Sauce({
        ...sauceObject,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    sauce.save()
        .then(() => {
            res.status(201).json({ message: 'Sauce créer correctement !' });

        }
        ).catch((error) => {
            res.status(400).json({ error: error });
        }
        );
}


exports.getOneThing = (req, res) => {
    Sauce.findOne({
        _id: req.params.id
    }).then((thing) => { res.status(200).json(thing); }
    ).catch((error) => {
        res.status(404).json({ error: error });
    }
    );
};

exports.modifySauce = (req, res) => {
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteThing = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1]
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => {
                        res.status(200).json({ message: 'Sauce supprimé' });
                    })
                    .catch((error) => {
                        res.status(400).json({ error: error });
                    });
            })
        })
};

exports.getAllStuff = (req, res) => {
    Sauce.find()
        .then((sauce) => {
            if (sauce.length == 0) {
                console.log('Pas de sauces !')
            }
            res.status(200).json(sauce);
        }
        ).catch((error) => { res.status(400).json({ error: error }); }
        );
};
exports.likeSauce = (req, res, next) => {
    // If user liked the Sauce
    // Pushing user id in usersLikes array and incrementing likes by 1
    if (req.body.like === 1) {
        Sauce.updateOne({ _id: req.params.id }, {
            $inc: { likes: 1 },
            $push: { usersLiked: req.body.userId },
        })
            .then((sauce) => res.status(200).json({ message: "Un like de plus !" }))
            .catch((error) => res.status(400).json({ error }));
    }

    // If user disliked the Sauce
    // Pushing user id in usersDislikes array and dicrementing likes by 1
    else if (req.body.like === -1) {
        Sauce.updateOne(
            { _id: req.params.id },
            {
                $inc: { dislikes: 1 },
                $push: { usersDisliked: req.body.userId },
            }
        )
            .then((sauce) =>
                res.status(200).json({ message: "Un dislike de plus !" })
            )
            .catch((error) => res.status(400).json({ error }));
    }


    else {
        Sauce.findOne({ _id: req.params.id })
            .then((sauce) => {
                if (sauce.usersLiked.includes(req.body.userId)) {
                    Sauce.updateOne(
                        { _id: req.params.id },
                        { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }
                    )
                        .then((sauce) => {
                            res.status(200).json({ message: "Un like de moins !" });
                        })
                        .catch((error) => res.status(400).json({ error }));
                } else if (sauce.usersDisliked.includes(req.body.userId)) {
                    Sauce.updateOne(
                        { _id: req.params.id },
                        {
                            $pull: { usersDisliked: req.body.userId },
                            $inc: { dislikes: -1 },
                        }
                    )
                        .then((sauce) => {
                            res.status(200).json({ message: "Un dislike de moins !" });
                        })
                        .catch((error) => res.status(400).json({ error }));
                }
            })
            .catch((error) => res.status(400).json({ error }));
    }
};



