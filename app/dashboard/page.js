
"use client"; 

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase'; 
import NotificationModal from '@/components/NotificationModal';
import ConfirmationModal from '@/components/ConfirmationModal';
import AddEditProductModal from '@/components/AddEditProductModal';
import ProductTable from '@/components/ProductTable';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [confirmationCallback, setConfirmationCallback] = useState(null);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); 
  const router = useRouter();

  
  useEffect(() => {
    const fetchUserAndRole = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser();

      if (!currentUser) {
        
        setMessage('Anda perlu masuk untuk mengakses dashboard.');
        setMessageType('error');
        setTimeout(() => router.push('/signin'), 1500);
        return;
      }

      setUser(currentUser);
      
      const { data: userData, error: userRoleError } = await supabase
        .from('users')
        .select('role')
        .eq('id', currentUser.id)
        .single();

      if (userRoleError && userRoleError.message !== 'Pesan tidak ada data yang ditemukan.') {
        console.error("Error fetching user role:", userRoleError);
        setMessage('Gagal mengambil peran pengguna.');
        setMessageType('error');
        setLoading(false);
        return;
      }
      
      const roleFromDb = userData ? userData.role : 'user';
      setUserRole(roleFromDb);
      console.log("DEBUG: User Role after fetch:", roleFromDb);
      setLoading(false);
    };

    fetchUserAndRole();

    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => { 
      if (event === 'SIGNED_OUT') {
        
        setMessage('Anda telah sign out.');
        setMessageType('info');
        router.push('/signin');
      }
    });

    return () => {
      
      if (subscription) {
        subscription.unsubscribe(); 
      }
    };
  }, [router]);

  
  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('nama_produk', { ascending: true }); 

    if (error) {
      console.error("Error fetching products:", error);
      setMessage('Gagal memuat data produk.');
      setMessageType('error');
      setProducts([]);
    } else {
      setProducts(data);
    }
    setLoading(false);
  };

  
  useEffect(() => {
    if (userRole) { 
      fetchProducts();
    }
  }, [userRole]); 

  
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
      setMessage(`Kesalahan sign-out: ${error.message}`);
      setMessageType('error');
    } else {
      setMessage('Sign-out berhasil!');
      setMessageType('info');
      
    }
  };

  
  const handleAddProduct = async (productData) => {
    console.log("DEBUG: Calling handleAddProduct. Current userRole:", userRole);
    if (userRole !== 'admin') {
        setMessage('Akses Ditolak: Anda bukan administrator.');
        setMessageType('error');
        setLoading(false);
        return; 
    }
    setLoading(true);
    const { error } = await supabase
      .from('products')
      .insert([productData]);

    if (error) {
      console.error("Error adding product:", error);
      setMessage(`Gagal menambahkan produk: ${error.message}`);
      setMessageType('error');
    } else {
      setMessage('Produk berhasil ditambahkan!');
      setMessageType('success');
      setIsAddEditModalOpen(false); 
      fetchProducts(); 
    }
    setLoading(false);
  };

  
  const handleEditProduct = async (productData) => {
    console.log("DEBUG: Calling handleEditProduct. Current userRole:", userRole);
    if (userRole !== 'admin') {
        setMessage('Akses Ditolak: Anda bukan administrator.');
        setMessageType('error');
        setLoading(false);
        return; 
    }
    setLoading(true);
    const { error } = await supabase
      .from('products')
      .update(productData)
      .eq('id', editingProduct.id); 

    if (error) {
      console.error("Error updating product:", error);
      setMessage(`Gagal memperbarui produk: ${error.message}`);
      setMessageType('error');
    } else {
      setMessage('Produk berhasil diperbarui!');
      setMessageType('success');
      setIsAddEditModalOpen(false); 
      setEditingProduct(null); 
      fetchProducts(); 
    }
    setLoading(false);
  };

  
  const handleDeleteProduct = async (productId) => {
    console.log("DEBUG: Calling handleDeleteProduct. Current userRole:", userRole);
    if (userRole !== 'admin') {
        setMessage('Akses Ditolak: Anda bukan administrator.');
        setMessageType('error');
        setLoading(false);
        return; 
    }
    setConfirmationMessage('Apakah Anda yakin ingin menghapus produk ini?');
    setIsConfirmationModalOpen(true);
    setConfirmationCallback(async () => {
      setLoading(true);
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) {
        console.error("Error deleting product:", error);
        setMessage(`Gagal menghapus produk: ${error.message}`);
        setMessageType('error');
      } else {
        setMessage('Produk berhasil dihapus!');
        setMessageType('success');
        fetchProducts(); 
      }
      setLoading(false);
    });
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setIsAddEditModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setIsAddEditModalOpen(true);
  };

  const closeAddEditModal = () => {
    setIsAddEditModalOpen(false);
    setEditingProduct(null);
  };

  const handleSubmitProduct = (productData) => {
    if (editingProduct) {
      handleEditProduct(productData);
    } else {
      handleAddProduct(productData);
    }
  };
 
  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
    setConfirmationMessage('');
    setConfirmationCallback(null);
  };

  const confirmAction = () => {
    closeConfirmationModal();
    if (typeof confirmationCallback === 'function') {
        confirmationCallback();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
        <p className="text-xl text-gray-700 dark:text-gray-200">Memuat dashboard...</p>
        <NotificationModal message={message} type={messageType} onClose={() => setMessage('')} />
      </div>
    );
  }

  
  if (!user || userRole === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
        <p className="text-xl text-gray-700 dark:text-gray-200">Memuat informasi pengguna...</p>
        <NotificationModal message={message} type={messageType} onClose={() => setMessage('')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-800">
      
      <header className="bg-blue-600 dark:bg-blue-800 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold">Dashboard Aplikasi</h1>
        <button
          onClick={handleSignOut}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition duration-300"
        >
          Sign Out
        </button>
      </header>

      <main className="flex-1 p-4 md:p-8">
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Selamat Datang, {user?.email || 'Pengguna'}!
          </h2>
        </div>

        <div id="dashboardContent">
          {userRole === 'admin' ? (
            
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Manajemen Produk</h3>
                <button
                  onClick={openAddModal}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition duration-300"
                >
                  <i className="fas fa-plus-circle mr-2"></i> Tambah Produk
                </button>
              </div>
              <ProductTable
                products={products}
                isAdmin={true}
                onEdit={openEditModal}
                onDelete={handleDeleteProduct}
              />
            </div>
          ) : (
            
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Daftar Produk</h3>
              <ProductTable products={products} isAdmin={false} />
            </div>
          )}
        </div>
      </main>

      <NotificationModal message={message} type={messageType} onClose={() => setMessage('')} />
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        message={confirmationMessage}
        onConfirm={confirmAction}
        onClose={closeConfirmationModal}
      />
      <AddEditProductModal
        isOpen={isAddEditModalOpen}
        onClose={closeAddEditModal}
        onSubmit={handleSubmitProduct}
        initialData={editingProduct}
      />
    </div>
  );
}
