const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers', 'admins']
};

export const roles = Object.keys(allRoles);
export const roleRights = new Map(Object.entries(allRoles));
