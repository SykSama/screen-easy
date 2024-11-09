export class AuthError extends Error {}

// export const auth = async (): Promise<User | null> => {
//   const supabase = await createClient();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   return user;
// };

// export const requiredAuth = async () => {
//   const user = await auth();

//   if (!user) {
//     throw new AuthError("You must be authenticated to access this resource.");
//   }

//   return user;
// };
