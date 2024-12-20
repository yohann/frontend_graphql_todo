import { REMOVE_TASK } from '../../lib/mutations';

export const removeTask = async (id) => {
  const response = fetch('http://localhost:3000/graphql', {
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