
import { Button, Checkbox, List } from 'rsuite';
import { deleteTask, setIsDone, oneTaskType } from '../Redux/Reducer/tasksReducer';
import { useDispatch } from 'react-redux';
import style from './tasks.module.css';

type PropsType = {
  filterTasks: oneTaskType[];
};

export const OneTask = ({ filterTasks }: PropsType) => {
  const dispatch = useDispatch();

  const tasksJsx = filterTasks
    ? filterTasks.map((el) => {
        return (
          <List.Item key={el.id} className={!el.isDone ? style.singleTask : style.singleTaskDone}>
            <Checkbox
              checked={el.isDone}
              onCheckboxClick={() => setTaskIsDoneHandler(el.id)}></Checkbox>
            {el.title}
            <Button
              color={'red'}
              onClick={() => {
                onDeleteTaskHandler(el.id);
              }}>
              X
            </Button>
          </List.Item>
        );
      })
    : 'No tasks';

  const onDeleteTaskHandler = (id: string) => {
    dispatch(deleteTask(id));
  };
  const setTaskIsDoneHandler = (id: string) => {
    dispatch(setIsDone(id));
  };

  return <List>{tasksJsx}</List>;
};
