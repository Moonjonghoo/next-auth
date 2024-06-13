"use client";

import { GithubLogin, login } from "@/lib/action";

export default function LoginForm() {
  return (
    <>
      <form
        action={(formData) => {
          login(formData);
        }}
      >
        <input type="email" name="email" placeholder="Enter your email" />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
        />
        <button type="submit">로그인</button>
      </form>
      <form action={GithubLogin}>
        <button type="submit">깃허브로그인</button>
      </form>
    </>
  );
}
