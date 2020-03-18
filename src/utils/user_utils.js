/* eslint-disable linebreak-style */
export const getPublicProfile = userObject => {
  const publicUser = {
    id: userObject.id,
    first_name: userObject.first_name,
    last_name: userObject.last_name,
    email: userObject.email,
  };
  return publicUser;
};

export const paginator = (page = 1, limit, model) => {
  if (!limit) {
    return { data: model };
  }
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const next = page + 1;
  const previous = page - 1;
  const maxPages = model.length / limit;
  let pageObj;
  if (previous < 1) pageObj = { next };
  else if (next > maxPages + 1) pageObj = { previous };
  else pageObj = { next, previous };
  const data = model.slice(startIndex, endIndex);
  return { data, pagination: pageObj };
};
