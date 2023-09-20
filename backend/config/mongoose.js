const mongoose = require('mongoose');

mongoose.connect('mongodb://jeffrey:123456@127.0.0.1:27017/tugas_mongodb?authSource=admin')

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => console.log('Server database terhubung'))