// features/api/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api", // Key in the Redux store
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/",
    // prepareHeaders: (headers, { getState }: any) => {
    //   headers.set("Accept", "application/json");
    //   const {
    //     auth: { accessToken },
    //   }: any = getState();
    //   // if (accessToken !== undefined) {
    //   headers.set("Authorization", `Bearer ${accessToken}`);
    //   // }
    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
    }),
    // Add more endpoints as needed
  }),
});

export const { useGetUsersQuery } = apiSlice; // Hook for component usage
