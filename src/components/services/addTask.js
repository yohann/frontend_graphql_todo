import { ADD_TASK } from '../../lib/mutations';

export const addTask = async (name, description) => {
  const response = fetch('http://localhost:3000/graphql', {
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