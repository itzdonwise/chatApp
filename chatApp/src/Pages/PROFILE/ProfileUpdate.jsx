import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { asset } from "../../assets/asset";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../Config/Firebase"; // Removed 'doc' from import
import { useNavigate } from "react-router-dom";
import { getDoc, doc, setDoc } from "firebase/firestore"; // Added setDoc for updating Firestore
import { toast } from "react-toastify";
import upload from "../../Lab/UpLoad";

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const [Image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [uid, setUid] = useState("");
  const [prevImage, setprevImage] = useState("");

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      if (!prevImage && !Image) {
        toast.error("Please upload a profile image");
        return;
      }
      const docRef = doc(db, "users", uid);
      if (Image) {
        const imgUrl = await upload(Image);
        setprevImage(imgUrl);
        await setDoc(
          docRef,
          {
            avatar: imgUrl,
            bio: bio,
            name: name,
          },
          { merge: true }
        ); // Using setDoc to update the user document
      } else {
        await setDoc(
          docRef,
          {
            bio: bio,
            name: name,
          },
          { merge: true }
        );
      }
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile.");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setName(docSnap.data().name || "");
          setBio(docSnap.data().bio || "");
          setprevImage(docSnap.data().avatar || "");
        }
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe(); // Clean up the onAuthStateChanged listener
  }, [navigate]); // Added dependency array

  return (
    <div className="bg-gradient-to-tr from-blue-500 to-red-400 w-full h-screen flex p-2 items-center justify-center">
      <div className="bg-white rounded-lg w-full md:w-[700px] flex flex-col-reverse md:flex-row items-center gap-20 p-5">
        <form onSubmit={updateProfile} className="flex flex-col p-10 gap-3">
          <h3 className="text-xl font-[500]">Profile Details</h3>
          <label
            htmlFor="avatar"
            className="flex text-center gap-[10px] text-gray-600 cursor-pointer"
          >
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
            />
            <img
              src={
                Image ? URL.createObjectURL(Image) : prevImage || asset.profile2
              }
              alt=""
              className="w-12 aspect-square rounded-full"
            />
            Upload profile image
          </label>

          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Your name"
            className="min-w-[300px] p-3 border-2 border-gray-500 rounded-md outline-blue-500"
          />
          <textarea
            onChange={(e) => setBio(e.target.value)} // Changed to e.target.value
            placeholder="Write profile bio"
            value={bio}
            className="p-3 min-w-[300px] border-2 border-gray-500 rounded-md outline-blue-600"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Save
          </button>
        </form>

        {Image ? (
          <img
            src={URL.createObjectURL(Image)}
            alt=""
            className="w-32 aspect-square rounded-full"
          />
        ) : prevImage ? (
          <img
            src={prevImage}
            alt=""
            className="w-32 aspect-square rounded-full"
          />
        ) : (
          <IoChatboxEllipsesOutline
            size={80}
            className="text-blue-500 aspect-square rounded-full border-2"
          />
        )}
      </div>
    </div>
  );
};

export default ProfileUpdate;
