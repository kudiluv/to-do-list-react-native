import {Status} from '../api/dto/status.enum';
import {useUpdateStatusTaskMutation} from '../api/tasksApi';

const changeStatus = (currentStatus: Status) => {
  return currentStatus === Status.COMPLETE ? Status.WAITING : Status.COMPLETE;
};

export default () => {
  const [updateTask] = useUpdateStatusTaskMutation();
  return (id: number, currentStatus: Status) => {
    updateTask({id, status: changeStatus(currentStatus)});
  };
};
