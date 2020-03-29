export const GET = 'GET';
export const SAVE = 'SAVE';

export const getPrice = (
  {type: GET}
);

export const savePrice = (values) => (
  {type: SAVE, values}
);
