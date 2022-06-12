export type oneTaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
type initialStateType = { tasks: oneTaskType[] };
const initialState: initialStateType = {
  tasks: [],
};

type activeType =
  | ReturnType<typeof deleteTask>
  | ReturnType<typeof addTask>
  | ReturnType<typeof deleteCompleted>
  | ReturnType<typeof setIsDone>;

export const tasksReducer = (
  state: initialStateType = initialState,
  action: activeType,
): initialStateType => {
  switch (action.type) {
    case 'APP/ADD-TASK':
      return {
        ...state,
        tasks: [...state.tasks, { id: action.id, title: action.title, isDone: false }],
      };
    case 'APP/DELETE-TASK':
      return { ...state, tasks: state.tasks.filter((el) => el.id !== action.id) };
    case 'APP/DELETE-COMPLETED-TASKS':
      return { ...state, tasks: state.tasks.filter((el) => !el.isDone) };
    case 'APP/SET-TASK-ISDONE':
      return {
        ...state,
        tasks: state.tasks.map((el) => (el.id === action.id ? { ...el, isDone: !el.isDone } : el)),
      };
    default:
      return { ...state };
  }
};

export const addTask = (title: string, id: string) =>
  ({ type: 'APP/ADD-TASK', title, id } as const);
export const deleteTask = (id: string) => ({ type: 'APP/DELETE-TASK', id } as const);
export const deleteCompleted = () => ({ type: 'APP/DELETE-COMPLETED-TASKS' } as const);
export const setIsDone = (id: string) => ({ type: 'APP/SET-TASK-ISDONE', id } as const);
