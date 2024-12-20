export const GET_TASKS = (filter) => `
  query Task{
    tasks(state: "${filter}") {
      id,
      name,
      description,
      stateCd
    }
  }
`;
