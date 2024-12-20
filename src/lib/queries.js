export const GET_TASKS = `
  query Task{
    tasks {
      id,
      name,
      description,
      stateCd
    }
  }
`;
