export const ADD_TASK = (name, description) => `
  mutation CreateTask{
    createTask(name: "${name}", description: "${description}")
  }
`;

export const REMOVE_TASK = (id) => `
  mutation DestroyTask{
    destroyTask(taskId: "${id}")
  }
`;

export const TOGGLE_TASK = (id) => `
  mutation ToggleTask{
    toggleTask(taskId: "${id}")
  }
`;
