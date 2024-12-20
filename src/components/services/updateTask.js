import { UPDATE_TASK } from '../../lib/mutations';

export const updateTask = async (id, name, description) => {
  const response = fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: UPDATE_TASK(id, name, description),
    }),
  });
  return response;
}