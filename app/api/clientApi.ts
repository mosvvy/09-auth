/*
fetchNotes
fetchNoteById
createNote
deleteNote
register
login
logout
checkSession
getMe
updateMe
 */

import axios from "axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface CheckSessionResponse {
  success: boolean;
}

export function fetchNotes() {}

export function fetchNoteById() {}

export function createNote() {}

export function deleteNote() {}

export async function register(payload: RegisterPayload) {
  const { data } = await axios.post("/api/auth/sign-up", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
}

export async function login(payload: LoginPayload) {
  const { data } = await axios.post("/api/auth/sign-in", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
}

export function logout() {}

export function checkSession() {}

export function getMe() {}

export function updateMe() {}
