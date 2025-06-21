"use client"; 

export default function ConfirmationModal({ isOpen, message, onConfirm, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 p-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl animate-fade-in-down w-full max-w-md">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Konfirmasi</h3>
        <p className="text-lg text-gray-700 dark:text-gray-200 mb-6">{message}</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-300"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
          >
            Konfirmasi
          </button>
        </div>
      </div>
    </div>
  );
}
