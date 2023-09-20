import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react'
import './index.scss';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/products', {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-chace',
        'Pragma': 'no-chace'
      }
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('products:', data)
      setProducts(data)
    })
    .catch((error) => {
      console.error('Error fetching products', error)
    })
  }, []);
  return(
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">Tamah Produk</Link>
      <div className="search">
        <input type="text" placeholder="Masukan kata kunci..."/>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
        {products.map((product) => (
            <tr key={product._id}>
              <td>{product.id_stock}</td>
              <td>{product.name}</td>
              <td className="text-right">{`Rp. ${product.price}`}</td>
              <td className="text-center">
                <Link to={`/detail/${product._id}`} className='btn btn-sm btn-info'>Detail</Link>
                <Link to={`/edit/${product._id}`} className='btn btn-sm btn-warning'>Edit</Link>
                <button className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default Home;