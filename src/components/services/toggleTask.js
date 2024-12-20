import { TOGGLE_TASK } from '../../lib/mutations';

export const toggleTask = async (id) => {
  const response = fetch('https://yohann-graphql-todo-list-bed98c446341.herokuapp.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: TOGGLE_TASK(id),
    }),
  });
  return response;
}