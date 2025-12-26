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

import { Note } from "@/types/note";
import { api } from "./api";
import { User } from "@/types/user";

interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
};

export interface CheckSessionResponse {
  success: boolean;
}

export type UpdateUserPayload = {
  username?: string;
};

const PER_PAGE = 12;

export async function fetchNotes(
  currentPage: number,
  search?: string,
  tagName?: string
): Promise<NotesHttpResponse> {
  const getParams = {
    params: {
      search,
      page: currentPage,
      perPage: PER_PAGE,
      tag: tagName,
    },
  };

  const { data } = await api.get<NotesHttpResponse>("/notes", getParams);

  return data;
}

export async function fetchNoteById(noteId: string): Promise<Note> {
  const response = await api.get<Note>(`/notes/${noteId}`);
  return response.data;
}

export async function createNote(
  title: string,
  content: string | null,
  tag: string
): Promise<Note> {
  const response = await api.post<Note>("/notes", {
    title: title,
    content: content,
    tag: tag,
  });
  return response.data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const response = await api.delete<Note>(`/notes/${noteId}`);
  return response.data;
}

export async function register(payload: RegisterPayload) {
  const { data } = await api.post<User>("/auth/register", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
}

export async function login(payload: LoginPayload) {
  const { data } = await api.post<User>("/auth/login", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
}

export async function logout(): Promise<void> {
  const { data } = await api.post("/auth/logout");
  return data;
}

export async function checkSession() {
  const res = await api.get<CheckSessionResponse>("/auth/session");
  return res.data;
}

export async function getMe() {
  const { data } = await api.get<User>("/users/me");
  return data;
}

export async function updateMe(payload: UpdateUserPayload) {
  const res = await api.patch<User>("/users/me", payload);
  return res.data;
}
