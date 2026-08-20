import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Ban, Camera, Check, Mail, MessageCircle, Hash, Activity, Cable, X, User } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { toTitleCase } from "../lib/utils.js";
import ProfileSkeleton from "../components/skeletons/ProfileSkeleton";
import { useChatStore } from "../store/useChatStore";
import { useRelationshipStore } from "../store/useRelationshipStore.js";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const { setSelectedUser } = useChatStore();
  const {
    relationship,
    isRelationshipUpdating,
    clearRelationship,
    getRelationshipStatus,
    respondToConnectionRequest,
    sendConnectionRequest,
  } = useRelationshipStore();
  const { userId } = useParams();
  const navigate = useNavigate();
  const [selectedImg, setSelectedImg] = useState(null);
  const [profileUser, setProfileUser] = useState(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState(null);
  const isOwnProfile = !userId || userId === authUser?.userId;

  useEffect(() => {
    const fetchProfile = async () => {
      setIsProfileLoading(true);
      setProfileError(null);

      if (isOwnProfile) {
        setProfileUser(authUser);
        clearRelationship();
        setIsProfileLoading(false);
        return;
      }

      try {
        setProfileUser(null);
        clearRelationship();
        const [profileRes, relationshipRes] = await Promise.all([
          axiosInstance.get(`/users/${userId}`),
          getRelationshipStatus(userId),
        ]);
        setProfileUser(profileRes.data);
        if (relationshipRes === undefined) {
          clearRelationship();
        }
      } catch {
        const message = "Failed to load profile";
        setProfileError(message);
        toast.error(message);
      } finally {
        setIsProfileLoading(false);
      }
    };

    fetchProfile();
  }, [authUser, clearRelationship, getRelationshipStatus, isOwnProfile, userId]);

  const handleImageUpload = async (e) => {
    if (!isOwnProfile) return;

    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  const handleConnect = async () => {
    if (!profileUser || isRelationshipUpdating) return;
    await sendConnectionRequest(profileUser.userId);
  };

  const handleRelationshipResponse = async (status) => {
    if (!profileUser || isRelationshipUpdating) return;
    await respondToConnectionRequest(profileUser.userId, status);
  };

  const handleMessage = () => {
    setSelectedUser(profileUser);
    navigate("/");
  };

  const renderRelationshipAction = () => {
    if (!relationship) {
      return (
        <button
          onClick={handleConnect}
          disabled={isRelationshipUpdating}
          className="text-sm text-zinc-400 flex items-center justify-center gap-2 hover:font-weight-700 hover:scale-105 transition-transform disabled:opacity-60 disabled:hover:scale-100"
        >
          <Cable className="w-5 h-5" />
          {isRelationshipUpdating ? "Sending..." : "Connect"}
        </button>
      );
    }

    if (relationship.status === "pending" && relationship.isRequester) {
      return (
        <button disabled className="text-sm text-zinc-400 flex items-center justify-center gap-2 opacity-70">
          <Activity className="w-5 h-5" />
          Pending
        </button>
      );
    }

    if (relationship.status === "pending" && relationship.isRecipient) {
      return (
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => handleRelationshipResponse("accepted")}
            disabled={isRelationshipUpdating}
            className="text-sm text-success flex items-center justify-center gap-2 hover:scale-105 transition-transform disabled:opacity-60 disabled:hover:scale-100"
          >
            <Check className="w-5 h-5" />
            Accept
          </button>
          <button
            onClick={() => handleRelationshipResponse("rejected")}
            disabled={isRelationshipUpdating}
            className="text-sm text-warning flex items-center justify-center gap-2 hover:scale-105 transition-transform disabled:opacity-60 disabled:hover:scale-100"
          >
            <X className="w-5 h-5" />
            Reject
          </button>
          <button
            onClick={() => handleRelationshipResponse("blocked")}
            disabled={isRelationshipUpdating}
            className="text-sm text-error flex items-center justify-center gap-2 hover:scale-105 transition-transform disabled:opacity-60 disabled:hover:scale-100"
          >
            <Ban className="w-5 h-5" />
            Block
          </button>
        </div>
      );
    }

    if (relationship.status === "blocked" && relationship.isRecipient) {
      return (
        <button
          onClick={() => handleRelationshipResponse("unblock")}
          disabled={isRelationshipUpdating}
          className="text-sm text-zinc-400 flex items-center justify-center gap-2 opacity-70"
        >
          <Ban className="w-5 h-5" />
          Unblock
        </button>
      );
    }

    if (relationship.status === "accepted") {
      return (
        <button
          onClick={handleMessage}
          className="text-sm text-zinc-400 flex items-center justify-center gap-2 hover:font-weight-700 hover:scale-105 transition-transform"
        >
          <MessageCircle className="w-5 h-5" />
          Message
        </button>
      );
    }

    return (
      <button disabled className="text-sm text-zinc-400 flex items-center justify-center gap-2 opacity-70">
        {relationship.status === "blocked" ? <Ban className="w-5 h-5" /> : <X className="w-5 h-5" />}
        {toTitleCase(relationship.status)}
      </button>
    );
  };

  const displayedUser = isOwnProfile ? authUser : profileUser;
  if (isProfileLoading) {
    return <ProfileSkeleton isOwnProfile={isOwnProfile} />;
  }

  if (profileError) {
    return (
      <div className="h-screen pt-20">
        <div className="max-w-2xl mx-auto p-4 py-8">
          <div className="bg-base-300 rounded-xl p-6 text-center space-y-3">
            <User className="size-12 mx-auto text-zinc-400" />
            <h1 className="text-2xl font-semibold">User not found</h1>
            <p className="text-sm text-zinc-400">
              No profile exists for {userId}.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!displayedUser) {
    return null;
  }


  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">{isOwnProfile ? "Your profile information" : "User profile information"}</p>
          </div>

          {/* avatar upload section */}

          <div className="flex flex-col items-center gap-1">
            <div className="relative">
              <img
                src={selectedImg || displayedUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />
              {isOwnProfile && (
                <label
                  htmlFor="avatar-upload"
                  className={`
                    absolute bottom-0 right-0 
                    bg-base-content hover:scale-105
                    p-2 rounded-full cursor-pointer 
                    transition-all duration-200
                    ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                  `}
                >
                  <Camera className="w-5 h-5 text-base-200" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              )}
            </div>
            <p className="text-sm text-zinc-400">
              {isOwnProfile
                ? isUpdatingProfile
                  ? "Uploading..."
                  : "Click the camera icon to update your photo"
                : ""}
            </p>
          </div>

          <div className="space-y-6">
            {isOwnProfile ?
              <>
                <div className="space-y-1">
                  <div className="text-sm text-zinc-400 flex items-center gap-2">
                    <Hash className="w-4 h-4" />
                    UID
                  </div>
                  <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{displayedUser.userId}</p>


                </div>
                <div className="space-y-1.5">

                  <div className="text-sm text-zinc-400 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </div>
                  <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{toTitleCase(displayedUser.fullName)}</p>
                </div>

                <div className="space-y-1.5">
                  <div className="text-sm text-zinc-400 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </div>
                  <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{displayedUser.email}</p>
                </div>
              </>
              :
              <div className="bg-base-300 rounded-xl p-6 pt-1 pb-1">
                <div className="space-y-1 flex items-center justify-center mb-4">
                  {renderRelationshipAction()}
                </div>
                <h2 className="text-lg font-medium mb-4">User Information</h2>
                <div className="space-y-1 flex flex-start gap-2">
                  <div className="text-sm text-zinc-400 flex items-center gap-2">
                    <Hash className="w-4 h-4" />
                    UID
                  </div>
                  <div className="text-sm m-0">
                    {displayedUser.userId}
                  </div>

                </div>
                <div className="space-y-1 flex flex-start gap-2">
                  <div className="text-sm text-zinc-400 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Name
                  </div>
                  <div className="text-sm m-0">
                    {toTitleCase(displayedUser.fullName)}
                  </div>

                </div>


              </div>
            }
          </div>

          <div className="mt-1 bg-base-300 rounded-xl p-6 pt-1">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{displayedUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
