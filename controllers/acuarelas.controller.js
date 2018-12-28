const Acuarela = require('../models/acuarela.model');

exports.acuarela_create = (req, res, next) => {
    let acuarela = new Acuarela({
        name: req.body.name,
        artistId: req.body.authorId,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        image: req.body.image,
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
                rating: acuarela.rating,
            }
        });
    })
};

exports.acuarela_all = (req, res) => {
    Acuarela.find({}, 'name rating technique', (err, acuarelas) => {
        if (err) return next(err);
        res.status(200).send(acuarelas);
    });
}

exports.acuarela_details = (req, res) => {
    Acuarela.findById(req.params.id, (err, acuarela) => {
        if (err) return next(err);
        res.status(200).send(acuarela);
    })
};

exports.acuarela_update = (req, res) => {
    Acuarela.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, acuarela) => {
        if (err) return next(err);
        res.status(200).send('Acuarela udpated.');
    });
};

exports.acuarela_delete = (req, res) => {
    Acuarela.findByIdAndRemove(req.params.id, (err) => {
        if (err) return next(err);
        res.status(204); //no body response
    })
};
