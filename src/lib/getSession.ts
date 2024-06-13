import { auth } from "@/auth";

//현재 로그인한 사용자정보를 알수있는값

export const getSession = async () => {
  const session = await auth();
  return session;
};
