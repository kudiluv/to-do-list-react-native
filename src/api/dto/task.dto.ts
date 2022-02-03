import {Status} from './status.enum';

export type TaskDto = {
  id: number;
  text: string;
  status: Status;
  img?: string;
  createdAt: string;
  updatedAt: string;
};
