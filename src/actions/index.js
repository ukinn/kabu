export const GET = 'GET';
export const SAVE = 'SAVE';
export const RESET = 'RESET';

export const getPrice = (
  {type: GET}
);

export const savePrice = (values) => (
  {type: SAVE, values}
);

export const resetPrice = (
  {type: RESET}
);
