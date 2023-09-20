const Product = require('../model/model')
const {ObjectId} = require('bson')

const store = (req, res) => {
    const {id_stock, name, price, stock, status} = req.body;
   Product.create({id_stock, name, price, stock, status})
        .then(result => res.send(result))
        .catch(error => res.send(error))     

}

const view = (req, res) => {
    const { id } = req.params;
    Product.findById(id)
        .then(result => {
            console.log('Result from database:', result);
            res.send(result);
        })
        .catch(error => res.send(error));
};

const index = (req, res) => {
    Product.find()
        .then(result => {
            res.status(200).json({
                success: true,
                data: result
            });
        })
        .catch(error => {
            res.status(500).json({
                success: false,
                error: error.message
            });
        });
}

const update = async (req, res) => {
    const {id} = req.params;
    const { id_stock, name, price, stock, status } = req.body;
    try {
        const result = await Product.findById(id);
        if(!result) {
            return res.status(404)
        }

        result.id_stock = id_stock,
        result.name = name,
        result.price = price,
        result.stock = stock,
        result.status = status
        
        await result.save();
        res.send(result)
    } catch (e) {
        res.send(e)
    }
}

const destroy = async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await Product.deleteOne({ _id: id });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
      });
    } catch (e) {
      res.status(500).json({
        success: false,
        error: e.message
      });
    }
  };


module.exports = {
    store,
    index,
    view,
    update,
    destroy
}
