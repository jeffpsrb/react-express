import { Link } from "react-router-dom";
import './index.scss';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'

const Detail = () => {
  const { id } = useParams();
  console.log('ID from URL:', id);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/v2/products/${id}`, {
      method: 'GET',
      headers: {
        'Cache-Control' : 'no-chace',
        'Pragma': 'no-chace'
      }
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('products', data)
      setProduct(data)
    })
    .catch((error) => {
      console.log('Error fetching products', error)
    })
        
  }, [id]);

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">Kembali</Link>

      <table className="table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>: {product.id_stock}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>: {product.name}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>: Rp. {product.price}</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>: {product.stock}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Detail;