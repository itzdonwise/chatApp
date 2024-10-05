
import { Leftsidebar } from '../../Component/Leftsidebar/Leftsidebar'
import { ChatBox } from '../../Component/ChatBox/ChatBox'
import Rightsidebar from '../../Component/RightSidebar/Rightsidebar'

const Chat = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-800 place-items-center grid">
      <div className="w-[96%] h-[75vh] max-w-[1000px] bg-white rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-3">
        <Leftsidebar />
        <ChatBox />
        <Rightsidebar />
      </div>
    </div>
  );
};
export default Chat;
