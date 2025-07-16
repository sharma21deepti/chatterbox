import { apiSlice } from "../../environment/base";
import { apiRoutes } from "../../environment/config";

export const authSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    login: builder.mutation({
      query: (data: any) => {
        return {
          url: `${apiRoutes.AUTH}/login`,
          method: "POST",
          body: data,
        };
      },
    }),
    register: builder.mutation({
      query: (data: any) => {
        return {
          url: `${apiRoutes.AUTH}`,
          method: "POST",
          body: data,
        };
      },
    }),
    getUser: builder.query({
      query:(id:any) => {
        return {
          url:`${apiRoutes.AUTH}/${id}`,
          method:"GET",
        }
      }
    }),
    updateUser: builder.mutation({
      query:(data:any) => {
        return {
          url: `${apiRoutes.AUTH}`,
          method:"PATCH",
          body:data,
        }
      }
    })
  }),
});

export const { useLoginMutation, useRegisterMutation,useGetUserQuery,useUpdateUserMutation } = authSlice;
