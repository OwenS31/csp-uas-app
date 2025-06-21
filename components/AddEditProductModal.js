"use client"; 

import { useState, useEffect } from 'react';

export default function AddEditProductModal({ isOpen, onClose, onSubmit, initialData }) {
  
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');

  useEffect(() => {
    if (isOpen && initialData) {
      setProductName(initialData.nama_produk || '');
      setProductPrice(initialData.harga_satuan || '');
      setProductQuantity(initialData.quantity || '');
    } else if (isOpen && !initialData) {
      
      setProductName('');
      setProductPrice('');
      setProductQuantity('');
    }
  }, [isOpen, initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = {
      nama_produk: productName,
      harga_satuan: parseFloat(productPrice),
      quantity: parseInt(productQuantity),
    };
    onSubmit(product); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 p-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl animate-fade-in-down w-full max-w-md">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {initialData ? 'Edit Produk' : 'Tambah Produk Baru'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Nama Produk</label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Harga Satuan</label>
            <input
              type="number"
              id="productPrice"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              step="0.01"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="productQuantity" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Quantity</label>
            <input
              type="number"
              id="productQuantity"
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white sm:text-sm"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-300"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              {initialData ? 'Simpan Perubahan' : 'Tambah'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}