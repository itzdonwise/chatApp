

const ConfirmationModal = ({isOpen, onClose, onConfirm}) => {
    if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <h3 className="text-lg font-bold text-black">Are you sure you want to logout?</h3>
      <div className="mt-4">
        <button
          onClick={onConfirm}
          className="bg-red-500 text-white px-4 py-2 rounded mr-2"
        >
          Yes
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 text-black px-4 py-2 rounded"
        >
          No
        </button>
      </div>
    </div>
  </div>
  )
}

export default ConfirmationModal