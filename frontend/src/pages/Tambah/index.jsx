import React, { useState } from 'react';
import Input from '../../components/Input';
import './index.scss';
import { useNavigate } from 'react-router-dom';

const Tambah = () => {
  const [product, setProduct] = useState({
    id_stock: '',
    name: '',
    price: '',
    stock: 0,
    status: true
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send product data to the backend for creation
    fetch('http://localhost:3000/api/v1/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then((response) => response.json())
      .then((data) => {
          alert('Data berhasil ditambahkan');
          navigate('/');
      })
      .catch((error) => {
        console.error('Error adding product:', error);
      });
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <Input
            name="id_stock"
            type="text"
            placeholder="ID Produk..."
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
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <input
              type="checkbox"
              id="status"
              name="status"
              checked={product.status}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Tambah;