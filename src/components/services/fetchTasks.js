import { GET_TASKS } from '../../lib/queries';

export const fetchTasks = async (filter) => {
  const response = fetch('http://localhost:3000/graphql', {
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