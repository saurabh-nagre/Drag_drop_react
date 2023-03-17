import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const UsersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["users"],

  endpoints: (builder) => ({
    getUsersList: builder.query({
      query: (id: number) => `persons/${id}`,
      providesTags: ["users"],
    }),

    deleteUser: builder.mutation({
      query: ({ id, details }) => ({
        url: `persons/${id}`,
        method: "DELETE",
        body: details,
      }),
      invalidatesTags: ["users"],
    }),
    
    deleteList: builder.mutation({
      query: (id: number) => ({
        url: `list/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
    
    postUserOver: builder.mutation({
      query: ({ id, overId, details }) => ({
        url: `persons/${id}`,
        method: "POST",
        body: { overId, details },
      }),
      invalidatesTags: ["users"],
    }),
    
    pushUser: builder.mutation({
      query: ({ id, details }) => ({
        url: `persons/push/${id}`,
        method: "POST",
        body: details,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetUsersListQuery,
  useDeleteUserMutation,
  useDeleteListMutation,
  usePostUserOverMutation,
  usePushUserMutation,
} = UsersApi;
