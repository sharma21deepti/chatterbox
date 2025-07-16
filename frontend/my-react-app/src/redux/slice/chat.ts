import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  chatId: string;
}

const initialState: ChatState = {
  chatId: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatId(state: any, action: PayloadAction<ChatState>) {
      state.chatId = action.payload.chatId;
    },
    clearChat(state, action: PayloadAction<string>) {
      state.chatId = "";
    },
  },
});

export const { setChatId, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
