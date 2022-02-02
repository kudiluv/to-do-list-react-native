import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {PaginateType} from '../types/PaginateType';
import {CreateTaskDto} from './dto/create.task.dto';
import {Status} from './dto/status.enum';
import {TaskDto} from './dto/task.dto';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  tagTypes: ['Tasks'],
  baseQuery: fetchBaseQuery({baseUrl: 'http://10.0.2.2:3000/'}),
  endpoints: builder => ({
    getTasks: builder.query<PaginateType<TaskDto[]>, unknown>({
      query: (page = 1) => `tasks?sortBy=id:DESC&page=${page}`,
      providesTags: result =>
        result
          ? [
              ...result.data.map(({id}) => ({type: 'Tasks' as const, id})),
              {type: 'Tasks', id: 'PARTIAL-LIST'},
            ]
          : [{type: 'Tasks', id: 'PARTIAL-LIST'}],
    }),
    addTask: builder.mutation({
      query: (body: CreateTaskDto) => ({
        url: 'tasks',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{type: 'Tasks', id: 'PARTIAL-LIST'}],
    }),
    deleteTasks: builder.mutation({
      query: (id: number) => ({
        url: `tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{type: 'Tasks', id: 'PARTIAL-LIST'}],
    }),
    updateStatusTask: builder.mutation({
      query: (body: {id: number; status: Status}) => ({
        url: `tasks/${body.id}`,
        method: 'PUT',
        body: {status: body.status},
      }),
      invalidatesTags: [{type: 'Tasks', id: 'PARTIAL-LIST'}],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useDeleteTasksMutation,
  useUpdateStatusTaskMutation,
} = tasksApi;
