import { GET_TASKS } from '../../lib/queries';

export const fetchTasks = async (filter) => {
  const response = fetch('https://yohann-graphql-todo-list-bed98c446341.herokuapp.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: GET_TASKS(filter),
    }),
  });
  return response;
}