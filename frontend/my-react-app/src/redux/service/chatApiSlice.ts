import { apiSlice } from "../../environment/base";

export const ChatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getChatHistory: builder.query({
      query: (data: any) => {
        console.log(data, "data");

        return {
          url: `/chat/histroy/${data?.id}`,
          method: "GET",
          //   params: data,
        };
      },
    }),
    deleteMessage: builder.mutation({
      query: (id: any) => {
        return {
          url: `/chat/${id}`,
          method: "DELETE",
        };
      },
    }),
    downloadMsg: builder.query({
      query:(id:any) => {
        return {
          url:`/chat/download/${id}`,
          method:"GET",

        }
      }
    })
  }),
});
export const { useLazyGetChatHistoryQuery, useGetChatHistoryQuery, useDeleteMessageMutation,useLazyDownloadMsgQuery} = ChatApiSlice;
