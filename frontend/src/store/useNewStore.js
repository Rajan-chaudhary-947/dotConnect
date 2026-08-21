import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import toast from "react-hot-toast";

export const useNewStore = create((set) => ({
  posts: [],
  jobs: [],
  events: [],
  resources: [],
  isLoading: false,
  isCreatingPost: false,
  isCreatingJob: false,
  isDeletingJob: false,
  isCreatingEvent: false,
  isAddingComment: false,
  isUpdatingComment: false,
  isDeletingComment: false,
  isUpdatingPost: false,
  isDeletingPost: false,
  isSharing: false,

  fetchPosts: async () => {
    set({ isLoading: true });
    const res = await axiosInstance.get("/posts");
    set({ posts: res.data, isLoading: false });
  },

  createPost: async (postData) => {
    set({ isCreatingPost: true });
    try {
      const res = await axiosInstance.post("/posts/share-post", postData);
      set((state) => ({ posts: [res.data, ...state.posts] }));
      return res.data;
    } catch (error) {
      throw error;
    } finally {
      set({ isCreatingPost: false });
    }
  },

  deletePost: async (postId) => {
    set({ isDeletingPost: true });
    try {
      await axiosInstance.delete(`/posts/${postId}`);
      set((state) => ({ posts: state.posts.filter((post) => post._id !== postId) }));
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to delete post");
    } finally {
      set({ isDeletingPost: false });
    }
  },

  addComment: async (postId, replyText) => {
    set({ isAddingComment: true });
    try {
      const { authUser } = useAuthStore.getState();
      console.log(authUser);
      const commentData = {
        commenterId: authUser?.userId,
        commenter: authUser?.fullName,
        reply: replyText,
      };
      const res = await axiosInstance.post(`/posts/${postId}/comment`, commentData);
      set((state) => ({
        posts: state.posts.map((post) => (post._id === postId ? res.data : post)),
      }));
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to add comment");
    } finally {
      set({ isAddingComment: false });
    }
  },

  updateComment: async (postId, commentId, replyText) => {
    set({ isUpdatingComment: true });
    try {
      const res = await axiosInstance.put(`/posts/${postId}/comment/${commentId}`, { reply: replyText });
      set((state) => ({
        posts: state.posts.map((post) => (post._id === postId ? res.data : post)),
      }));
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to update comment");
    } finally {
      set({ isUpdatingComment: false });
    }
  },

  deleteComment: async (postId, commentId) => {
    set({ isDeletingComment: true });
    try {
      const res = await axiosInstance.delete(`/posts/${postId}/comment/${commentId}`);
      set((state) => ({
        posts: state.posts.map((post) => (post._id === postId ? res.data : post)),
      }));
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to delete comment");
    } finally {
      set({ isDeletingComment: false });
    }
  },

  fetchJob: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/job");
      set({ jobs: res.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching jobs:", error);
      set({ isLoading: false });
    }
  },

  createJob: async (data) => {
    set({ isCreatingJob: true });
    try {
      const res = await axiosInstance.post("/job/share-job", data);
      set((state) => ({ jobs: [res.data, ...state.jobs] }));
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to share job");
    } finally {
      set({ isCreatingJob: false });
    }
  },

  deleteJob: async (jobId) => {
    set({ isDeletingJob: true });
    try {
      await axiosInstance.delete(`/job/${jobId}`);
      set((state) => ({ jobs: state.jobs.filter((post) => post._id !== jobId) }));
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to delete job");
    } finally {
      set({ isDeletingJob: false });
    }
  },

  fetchEvents: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/event");
      set({ events: Array.isArray(res.data) ? res.data : res.data.events || [], isLoading: false });
    } catch (error) {
      console.error("Error fetching events:", error);
      set({ isLoading: false });
    }
  },

  createEvent: async (data) => {
    set({ isCreatingEvent: true });
    try {
      const res = await axiosInstance.post("/event/share-event", data);
      const createdEvent = res.data.event || res.data;
      set((state) => ({ events: [createdEvent, ...state.events] }));
      return createdEvent;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to share event");
    } finally {
      set({ isCreatingEvent: false });
    }
  },

  deleteEvent: async (eventId) => {
    set({ isDeletingEvent: true });
    try {
      await axiosInstance.delete(`/event/${eventId}`);
      set((state) => ({ events: state.events.filter((event) => event._id !== eventId) }));
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to delete event");
    } finally {
      set({ isDeletingEvent: false });
    }
  },

  fetchResource: async (resourceType) => {
    set({isLoading: true});
    try{
      const res = await axiosInstance.get(`/resources/${resourceType}`);
      set({resources: Array.isArray(res.data) ? res.data : res.data?.ressources || [], isLoading: false});
    } catch (err){
      toast.error("Can't Fetch Resource");
    } finally {
      set({isLoading: false});
    }
  },

  createResource: async (resData) => {
    set({isSharing: true});
    try{
      const resourceData = resData.formData || resData;
      const body = new FormData();
      body.append("resourceType", resourceData.resourceType);
      body.append("title", resourceData.title);
      body.append("file", resourceData.file);

      const res = await axiosInstance.post("/resources", body);
      set((state) => ({ resources: [res.data, ...state.resources]}));
      return res.data;
    } catch (err){
      toast.error(err.response?.data?.message || "Failed to share resource");
      throw err;
    } finally {
      set({isSharing: false});
    }
  }
}));