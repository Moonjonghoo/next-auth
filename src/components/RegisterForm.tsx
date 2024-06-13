"use client";
import { register } from "@/lib/action";

export default function RegisterForm() {
  return (
    <>
      <form
        action={(formData) => {
          register(formData);
        }}
      >
        <input type="text" name="name" placeholder="Enter your name" />
        <input type="email" name="email" placeholder="Enter your email" />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
        />
        <button>회원가입</button>
      </form>
    </>
  );
}
