import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {PaginateType} from '../types/PaginateType';
import {Status} from './dto/status.enum';
import {TaskDto} from './dto/task.dto';
import {API_URL} from '@env';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  tagTypes: ['Tasks'],
  baseQuery: fetchBaseQuery({baseUrl: API_URL}),
  endpoints: builder => ({
    getTasks: builder.query<PaginateType<TaskDto[]>, unknown>({
      query: (page = 1) => `tasks?sortBy=id:DESC&page=${page}`,
      providesTags: result =>
        result
          ? [
              ...result.data.map(({id}) => ({type: 'Tasks' as const, id})),
              {type: 'Tasks', id: 'LIST'},
            ]
          : [{type: 'Tasks', id: 'LIST'}],
    }),
    addTask: builder.mutation({
      query: (body: FormData) => ({
        url: 'tasks',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{type: 'Tasks', id: 'LIST'}],
    }),
    deleteTasks: builder.mutation({
      query: (id: number) => ({
        url: `tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{type: 'Tasks', id: 'LIST'}],
    }),
    updateStatusTask: builder.mutation({
      query: (body: {id: number; status: Status}) => ({
        url: `tasks/${body.id}`,
        method: 'PUT',
        body: {status: body.status},
      }),
      invalidatesTags: [{type: 'Tasks', id: 'LIST'}],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useDeleteTasksMutation,
  useUpdateStatusTaskMutation,
} = tasksApi;
