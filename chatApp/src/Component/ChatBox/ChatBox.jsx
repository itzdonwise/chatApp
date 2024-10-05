import { asset } from "../../assets/asset";
import { TbHelpSquareRoundedFilled } from "react-icons/tb";
import { IoIosSend } from "react-icons/io";
import { GrGallery } from "react-icons/gr";

export const ChatBox = () => {
  return (
    <div className="h-[75vh] relative bg-white">
      {/* Profile Section */}
      <div className="py-3 px-2 flex items-center gap-3 border-b border-gray-300">
        <img src={asset.profile1} alt="profile" className="w-12 rounded-full aspect-square" />
        <p className="flex-1 font-bold text-gray-800">Don Amicable</p>
        <TbHelpSquareRoundedFilled size={30} className="text-blue-900" />
      </div>

      {/* Chat Messages */}
      <div className="h-[78%] p-4 overflow-y-scroll flex flex-col-reverse gap-4">
        {/* Receiver message */}
        <div className="flex items-end justify-end gap-2">
          <p className="bg-blue-500 text-white text-sm p-2 rounded-lg max-w-[60%]">
            Lorem ipsum dolor sit amet...
          </p>
          <img src={asset.profile2} alt="profile" className="w-6 rounded-full aspect-square" />
        </div>

        {/* Friend's message */}
        <div className="flex items-end gap-2">
          <img src={asset.profile2} alt="profile" className="w-6 rounded-full" />
          <p className="bg-gray-300 text-gray-700 text-sm p-2 rounded-lg max-w-[60%]">
            Lorem ipsum dolor sit amet...
          </p>
        </div>


        <div className="flex items-end gap-2">
          <img src={asset.profile2} alt="profile" className="w-6 rounded-full" />
          <p className="bg-gray-300 text-gray-700 text-sm p-2 rounded-lg max-w-[60%]">
            Lorem ipsum dolor sit amet...
          </p>
        </div>


        <div className="flex items-end gap-2">
          <img src={asset.profile2} alt="profile" className="w-6 rounded-full" />
          <p className="bg-gray-300 text-gray-700 text-sm p-2 rounded-lg max-w-[60%]">
            Lorem ipsum dolor sit amet...
          </p>
        </div>
      </div>

      {/* Input Section */}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-100 flex items-center gap-2 p-2">
        <input
          type="text"
          placeholder="Send a message"
          className="flex-1 p-2 bg-white rounded-md outline-none"
        />
        <input type="file" id="image" accept="image/png, image/jpegs" hidden /> 
        <label htmlFor="image" className="flex">
          
          <GrGallery className="cursor-pointer" />
        </label>
        <IoIosSend size={30} className="text-white bg-blue-900 rounded-full p-1 cursor-pointer" />

      
        
      </div>
    </div>
  );
};

