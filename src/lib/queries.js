export const GET_TASKS = (filter) => `
  query Task{
    tasks(state: "${filter}") {
      name,
      description,
      stateCd
    }
  }
`;
