import { ADD_TASK } from '../../lib/mutations';

export const addTask = async (name, description) => {
  const response = fetch('https://yohann-graphql-todo-list-bed98c446341.herokuapp.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: ADD_TASK(name, description),
    }),
  });
  return response;
}