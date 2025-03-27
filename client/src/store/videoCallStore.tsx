// // client/src/store/videoCallStore.ts
// import { create } from "zustand";

// type VideoCallState = {
//   localStream: MediaStream | null;
//   remoteStream: MediaStream | null;
//   isCallActive: boolean;
//   setLocalStream: (stream: MediaStream) => void;
//   setRemoteStream: (stream: MediaStream) => void;
//   setCallActive: (active: boolean) => void;
// };

// export const useVideoCallStore = create<VideoCallState>((set) => ({
//   localStream: null,
//   remoteStream: null,
//   isCallActive: false,
//   setLocalStream: (stream) => set({ localStream: stream }),
//   setRemoteStream: (stream) => set({ remoteStream: stream }),
//   setCallActive: (active) => set({ isCallActive: active }),
// }));
