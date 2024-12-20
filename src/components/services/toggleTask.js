import { TOGGLE_TASK } from '../../lib/mutations';

export const toggleTask = async (id) => {
  const response = fetch('http://localhost:3000/graphql', {
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