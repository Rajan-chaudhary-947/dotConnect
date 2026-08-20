import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useRelationshipStore = create((set, get) => ({
  relationship: null,
  isRelationshipLoading: false,
  isRelationshipUpdating: false,

  getRelationshipStatus: async (userId) => {
    set({ isRelationshipLoading: true });
    try {
      const res = await axiosInstance.get(`/connect/${userId}/status`);
      set({ relationship: res.data.relationship });
      return res.data.relationship;
    } finally {
      set({ isRelationshipLoading: false });
    }
  },

  sendConnectionRequest: async (userId) => {
    if (get().isRelationshipUpdating) return null;

    set({ isRelationshipUpdating: true });
    try {
      const res = await axiosInstance.post(`/connect/${userId}`);
      const relationship = {
        _id: res.data.relationship._id,
        status: res.data.relationship.status,
        isRequester: true,
        isRecipient: false,
      };

      set({ relationship });
      toast.success("Connection request sent");
      return relationship;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send connection request");
      return null;
    } finally {
      set({ isRelationshipUpdating: false });
    }
  },

  respondToConnectionRequest: async (userId, status) => {
    if (get().isRelationshipUpdating) return null;

    set({ isRelationshipUpdating: true });
    try {
      const res = await axiosInstance.patch(`/connect/${userId}/response`, {
        status,
      });

      if (status === "unblock") {
        set({ relationship: null });
        return null;
      }

      const relationship = {
        ...get().relationship,
        _id: res.data._id,
        status: res.data.status,
        isRequester: false,
        isRecipient: true,
      };

      set({ relationship });
      return relationship;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update connection");
      return null;
    } finally {
      set({ isRelationshipUpdating: false });
    }
  },

  clearRelationship: () => set({ relationship: null }),
}));
