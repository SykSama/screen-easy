export const generateDefaultOrgName = (email: string) => {
  const nameWithoutDomain = email.split("@")[0];
  return `${nameWithoutDomain}'s org`;
};
