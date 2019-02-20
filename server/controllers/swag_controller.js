const swag = require('../models/swag')

module.exports = {
    read: (req, res, next) => { console.log(1111111, swag)
        res.status(200).send(swag)
    }
}