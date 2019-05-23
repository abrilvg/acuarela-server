const Acuarela = require('../models/acuarela.model');

exports.acuarela_create = (req, res, next) => {
    let acuarela = new Acuarela({
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

    acuarela.save(err => {
        if (err) return next(err);

        // 201 always for created
        res.status(201).send({
            message: 'Acuarela Created successfully',
            data: {
                name: acuarela.name,
                author: acuarela.author,
                rating: acuarela.rating,
            }
        });
    })
};

exports.acuarela_all = (req, res) => {
    Acuarela.find({}, 'name author authorId rating technique images', (err, acuarelas) => {
        if (err) return next(err);

        res.status(200).send({
            data: acuarelas
        });
    });
}

exports.acuarela_all_from = (req, res) => {
    Acuarela.find({ authorId: req.params.id }, 'name author rating technique images', (err, acuarelas) => {
        if (err) return next(err);

        res.status(200).send({
            data: acuarelas
        });
    });
}

exports.acuarela_details = (req, res) => {
    Acuarela.findById(req.params.id, (err, acuarela) => {
        if (err) return next(err);

        res.status(200).send({
            data: acuarela
        });
    })
};

exports.acuarela_update = (req, res) => {
    Acuarela.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, acuarela) => {
        if (err) return next(err);

        res.status(200).send({
            data: 'Acuarela udpated.'
        });
    });
};

exports.acuarela_delete = (req, res) => {
    Acuarela.findByIdAndRemove(req.params.id, (err) => {
        if (err) return next(err);
        res.status(204); //no body response
    })
};
