const db = require('../../config/mongodb')
const {ObjectId} = require('bson')

const index = (req, res) => {
    db.collection('products').find()
    .toArray()
    .then(result => res.send(result))
    .catch(error => res.send(error))
}

const view = (req, res) => {
    const {id} = req.params;
    const objectId = new ObjectId(id)

    db.collection('products').findOne({_id: objectId})
    .then(result => res.send(result))
    .catch(error => res.send(error))
}

const store = (req, res) => {
    const {id_stock, name, price, stock, status} = req.body;
    db.collection('products').insertOne({id_stock, name, price, stock, status})
    .then(result => res.send(result))
    .catch(error => res.send(error))
}

const update = (req, res) => {
    const { id } = req.params;
    const { id_stock, name, price, stock, status } = req.body;
    const objectId = new ObjectId(id);

    db.collection('products').updateOne(
        { _id: objectId },
        { $set: { id_stock, name, price, stock, status } }
    )
    .then(result => res.send(result))
    .catch(error => res.send(error));
};



module.exports = {
    index,
    view,
    store,
    update
}