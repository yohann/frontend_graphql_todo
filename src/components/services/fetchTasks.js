import { GET_TASKS } from '../../lib/queries';

export const fetchTasks = async () => {
  const response = fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: GET_TASKS,
    }),
  });
  return response;
}