const Aquarelle = require('../models/aquarelle.model');

exports.aquarelle_create = (req, res, next) => {
    let aquarelle = new Aquarelle({
        name: req.body.name,
        authorId: req.body.authorId,
        author: req.body.author,
        createdDate: req.body.createdDate,
        images: req.body.images,
        technique: req.body.technique,
        material: req.body.material,
        country: req.body.country,
        approved: req.body.approved === 'true' ? true : false,
        rating: req.body.rating
    });

    aquarelle.save(err => {
        if (err) return next(err);

        // 201 always for created
        res.status(201).send({
            message: 'Aquarelle Created successfully',
            data: {
                name: aquarelle.name,
                author: aquarelle.author,
                rating: aquarelle.rating,
            }
        });
    })
};

exports.aquarelle_all = (req, res) => {
    Aquarelle.find({}, 'name author authorId rating technique images', (err, aquarelles) => {
        if (err) return next(err);

        res.status(200).send({
            data: aquarelles
        });
    });
}

exports.aquarelle_all_from = (req, res) => {
    Aquarelle.find({ authorId: req.params.id }, 'name author rating technique images', (err, aquarelles) => {
        if (err) return next(err);

        res.status(200).send({
            data: aquarelles
        });
    });
}

exports.aquarelle_details = (req, res) => {
    Aquarelle.findById(req.params.id, (err, aquarelle) => {
        if (err) return next(err);

        res.status(200).send({
            data: aquarelle
        });
    })
};

exports.aquarelle_update = (req, res) => {
    Aquarelle.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, acuarela) => {
        if (err) return next(err);

        res.status(200).send({
            data: 'Acuarela udpated.'
        });
    });
};

exports.aquarelle_delete = (req, res) => {
    Aquarelle.findByIdAndRemove(req.params.id, (err) => {
        if (err) return next(err);
        res.status(204); //no body response
    })
};
