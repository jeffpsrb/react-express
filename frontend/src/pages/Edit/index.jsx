import Input from "../../components/Input";
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    id_stock: '',
    name: '',
    price: '',
    stock: 0,
    status: false
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product details based on id and set the product state
    fetch(`http://localhost:3000/api/v1/products/${id}`)
      .then(response => response.json())
      .then((data) => {
        setProduct(data)
      })

  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send updated product data to the backend for updating
    fetch(`http://localhost:3000/api/v1/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(response => response.json())
      .then(data => {
          alert('Data berhasil diubah');
          navigate('/');
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <Input
            name="id_stock"
            type="text"
            placeholder="ID"
            label="ID"
            value={product.id_stock}
            onChange={handleChange}
          />
          <Input
            name="name"
            type="text"
            placeholder="Nama Produk..."
            label="Nama"
            value={product.name}
            onChange={handleChange}
          />
          <Input
            name="price"
            type="number"
            placeholder="Harga Produk..."
            label="Harga"
            value={product.price}
            onChange={handleChange}
          />
          <Input
            name="stock"
            type="number"
            placeholder="Stock Produk..."
            label="Stock"
            value={product.stock}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  )
}

export default Edit;