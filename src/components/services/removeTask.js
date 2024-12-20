import { REMOVE_TASK } from '../../lib/mutations';

export const removeTask = async (id) => {
  const response = fetch('https://yohann-graphql-todo-list-bed98c446341.herokuapp.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: REMOVE_TASK(id),
    }),
  });
  return response;
}