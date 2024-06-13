import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectDB from "./lib/db";
import { Member } from "./lib/schema";
import { compare } from "bcryptjs";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(creddentails) {
        console.log("creddentails", creddentails);
        const { email, password } = creddentails;
        if (!email || !password) {
          throw new CredentialsSignin("입력값이 부족합니다.");
        }
        //DB 연동
        connectDB();
        const member = await Member.findOne({ email }).select(
          "+password +role"
        );
        //비밀번호 비교
        const isMatched = await compare(String(password), member.password);
        if (!isMatched) {
          throw new CredentialsSignin("비밀번호가 일치하지 않습니다.");
        }

        return {
          name: member.name,
          email: member.email,
          role: member.role,
          id: member._id,
          //next-auth 에서 키밸류값을 정해놧는데 role,id 는없어서 인식을못해서 못넘겨받음
        };
      },
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    signIn: async ({ user, account }: { user: any; account: any }) => {
      console.log("signIn", user, account);
      if (account?.provider === "github") {
        // 로직을 구현할꺼니까..
        const { name, email } = user;
        await connectDB(); // mongodb 연결
        const existingUser = await Member.findOne({
          email,
          authProviderId: "github",
        });
        if (!existingUser) {
          // 소셜 가입
          await new Member({
            name,
            email,
            authProviderId: "github",
            role: "user",
          }).save();
        }
        const socialUser = await Member.findOne({
          email,
          authProviderId: "github",
        });
        user.role = socialUser?.role || "user";
        user.id = socialUser?._id || null;
        return true;
      } else {
        // 크레덴셜 통과
        return true;
      }
    },
    async jwt({ token, user }: any) {
      // console.log("jwt", token, user);
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token?.role) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
});
