"use server";

import { signIn, signOut } from "@/auth";
import connectDB from "./db";
import { Member } from "./schema";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";

// 회원가입
export async function register(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  if (!name || !email || !password) {
    console.log("입력값이 부족합니다.");
  }

  connectDB();
  // 있는회원인지 조회
  const existingUser = await Member.findOne({ email });
  if (!existingUser) {
    console.log("이미 가입된 회원입니다.");
  }
  // 없으면 회원가입
  const hashedPassword = await hash(String(password), 10);
  const newMember = new Member({
    name,
    email,
    password: hashedPassword,
  });
  newMember.save();
  redirect("/login");
}

export async function login(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  if (!email || !password) {
    console.log("입력값이 부족합니다.");
    return;
  }
  try {
    //auth.js 연동
    // console.log("try", email, password);
    signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error) {
    console.log(error);
  }
  redirect("/");
}

export async function GithubLogin() {
  await signIn("github", { callbackUrl: "/" });
}

export async function Logout() {
  await signOut();
}
