"use client"; 

export default function ProductTable({ products, isAdmin, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
        <thead className="bg-gray-50 dark:bg-gray-600">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider rounded-tl-lg">
              Nama Produk
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
              Harga Satuan
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider rounded-tr-lg">
              Quantity
            </th>
            {isAdmin && (
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider rounded-tr-lg">
                Aksi
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
          {products.length === 0 ? (
            <tr>
              <td colSpan={isAdmin ? 4 : 3} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 text-center">
                Tidak ada produk tersedia.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {product.nama_produk}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  Rp {new Intl.NumberFormat('id-ID').format(product.harga_satuan)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {product.quantity}
                </td>
                {isAdmin && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => onEdit(product)}
                      className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4"
                    >
                      <i className="fas fa-edit"></i> Edit
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <i className="fas fa-trash-alt"></i> Hapus
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}