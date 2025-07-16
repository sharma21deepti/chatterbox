import { apiSlice } from "../../environment/base";

export const contactApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    addContact: builder.mutation({
      query: (data: any) => {
        return {
          url: "/contact",
          method: "PATCH",
          body: data,
        };
      },
    }),
    getAllContactsList: builder.query({
      query: (data: any) => {
        console.log(data, "data");

        return {
          url: `/contact/list/${data?.id}`,
          method: "GET",
          params: data,
        };
      },
    }),
  }),
});
export const {
  useAddContactMutation,
  useLazyGetAllContactsListQuery,
  useGetAllContactsListQuery,
} = contactApiSlice;
