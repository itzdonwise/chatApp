
import { CiMenuKebab } from "react-icons/ci";
import { IoChatboxEllipsesOutline, IoSearchOutline } from "react-icons/io5";
import { asset } from "../../assets/asset";

export const Leftsidebar = () => {
  return (
    <div className="bg-blue-900 h-[75vh] text-white flex flex-col">
      {/* Header Section */}
      <div className="px-3 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
          <IoChatboxEllipsesOutline size={40} className="text-blue-500" />
          <h2 className="text-2xl">ChatApp</h2>
        </div>
        <div className="relative group hover:scale-105 transition-transform duration-300">
          <CiMenuKebab size={30} className="text-gray-300 cursor-pointer" />
          <div className="hidden group-hover:block absolute top-[100%] right-0 w-[130px] bg-white text-black rounded-md p-4 shadow-lg">
            <p className="text-[14px]">Edit Profile</p>
            <hr className="my-2" />
            <p className="text-[14px]">Logout</p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-blue-700 flex items-center p-2 rounded-md mx-3">
        <IoSearchOutline className="text-white mr-2" size={20} />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-transparent placeholder:text-white outline-none"
        />
      </div>

      {/* Chat List (Scrollable) */}
      <div className="flex-1 mt-4 overflow-y-auto space-y-3 px-3">
        {Array(20).fill('').map((_, index) => (
          <div key={index} className="flex items-center gap-3 p-2 hover:bg-blue-600 rounded-lg transition-colors">
            <img src={asset.profile2} alt="profile" className="w-10 rounded-full" />
            <div className="flex flex-col">
              <p>Don Amicable</p>
              <span className="text-gray-300 text-sm">Hello, how are you?</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

