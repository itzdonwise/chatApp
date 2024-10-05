
// import { useNavigate } from "react-router-dom";
import { asset } from "../../assets/asset";
import { logout } from "../../Config/Firebase";
import ConfirmationModal from "../../modal/ConfirmationModal";
import { useState } from "react";




const Rightsidebar = () => {
  

  
  
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const handleLogout = async () => {
    await logout();  

  };

  const openModal = () => setIsModalOpen(true); 
  const closeModal = () => setIsModalOpen(false);

  const confirmLogout = () => {
    handleLogout();   // If confirmed, proceed with logout
    closeModal();     // Close modal after logout
  };

  return (
    <div className="bg-blue-950 text-white h-full flex flex-col overflow-y-auto">
      {/* Profile Section */}
      <div className="text-center flex flex-col items-center py-6">
        <img src={asset.profile2} alt="profile" className="w-24 rounded-full mx-auto aspect-square" />
        <h3 className="text-lg mt-3 flex items-center">Don Amicable <img src={asset.greendot} alt="" className="w-3 aspect-square rounded-full" /> </h3>
        <p className="text-gray-300 text-sm">Lorem ipsum dolor sit amet...</p>
      </div>

      <hr className="border-gray-700 my-4" />

      {/* Media Section */}
      <div className="px-5 ">
        <h4 className="text-xl mb-2">Media</h4>
        <div className="grid grid-cols-3 overflow-x-scroll gap-3 max-h-36">
          {Array(30).fill('').map((_, index) => (
            <img key={index} src={asset.profile1} alt="media" className="w-full h-16 rounded-md cursor-pointer" />
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={openModal}
        className="mt-auto bg-blue-600 px-6 py-2 rounded-full mx-auto my-4 text-white"
      >
        Logout
      </button>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmLogout}
      />
    </div>
  );
};

export default Rightsidebar;

