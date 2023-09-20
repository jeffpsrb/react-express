const {MongoClient} = require('mongodb');

const url = 'mongodb://jeffrey:123456@127.0.0.1:27017/mydb?authSource=admin';
const client = new MongoClient(url);

(async () => {
    try {
        await client.connect();
        console.log('koneksi v1 berhasil')
    } catch (e) {
        console.log(e)
    }
})();

const db = client.db('tugas_mongodb');
module.exports = db;