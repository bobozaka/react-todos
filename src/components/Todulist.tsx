import { useState } from 'react';
import { Button, ButtonGroup, FlexboxGrid, Input, Panel, PanelGroup } from 'rsuite';
import { v1 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../Redux/store';
import { addTask, deleteCompleted, oneTaskType } from '../Redux/Reducer/tasksReducer';
import style from './tasks.module.css';
import { OneTask } from './OneTask';

const Todulist = () => {
  const tasks = useSelector<AppRootStateType, Array<oneTaskType>>(
    (state) => state.tasksReducer.tasks,
  );
  const dispatch = useDispatch();

  const [taskTitle, setTaskTitle] = useState('');
  const [filterType, setFilterType] = useState<'active' | 'done' | ''>('');

  const addTaskHandler = () => {
    if (taskTitle.trim().length) {
      dispatch(addTask(taskTitle, v1()));
      setTaskTitle('');
    }
  };
  const onTitleChangeHandler = (e: string) => {
    setTaskTitle(e);
  };
  const clearCompletedHandler = () => {
    dispatch(deleteCompleted());
  };
  const setFilterHandler = (filter: 'active' | 'done' | '') => {
    setFilterType(filter);
  };

  let filteredTasks = tasks;
  if (filterType === 'active') {
    filteredTasks = tasks.filter((el) => !el.isDone);
  }
  if (filterType === 'done') {
    filteredTasks = tasks.filter((el) => el.isDone);
  }

  //генерируем для "осталось сделать задач"
  const leftTasks = () => {
    return (
      <div>
        {tasks.filter((el) => !el.isDone).length === 1
          ? tasks.filter((el) => !el.isDone).length + ' item left'
          : tasks.filter((el) => !el.isDone).length + ' items left'}
      </div>
    );
  };

  return (
    <FlexboxGrid justify="center">
      <FlexboxGrid.Item colspan={6}>
        <PanelGroup accordion bordered>
          <Panel header={'tasks'}>
            <div className={style.inputTaskForm}>
              <Input
                placeholder={'Enter task title'}
                onChange={onTitleChangeHandler}
                value={taskTitle}
              />
              <Button appearance={'primary'} color={'green'} onClick={addTaskHandler}>
                +
              </Button>
            </div>
            <OneTask filterTasks={filteredTasks} />
            <div className={style.footerContent}>
              <span className={style.tasksLeft}>{leftTasks()}</span>
              <ButtonGroup>
                <Button appearance={'primary'} color={'green'} onClick={() => setFilterHandler('')}>
                  All
                </Button>
                <Button appearance={'primary'} onClick={() => setFilterHandler('active')}>
                  Active
                </Button>
                <Button appearance={'primary'} onClick={() => setFilterHandler('done')}>
                  Completed
                </Button>
              </ButtonGroup>
              <Button onClick={clearCompletedHandler}>Clear completed</Button>
            </div>
          </Panel>
        </PanelGroup>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

export default Todulist;
