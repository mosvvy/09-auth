/*
fetchNotes
fetchNoteById
getMe
checkSession
 */

import { cookies } from "next/headers";
import { api } from "./api";
import { User } from "@/types/user";
import { Note } from "@/types/note";

interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

const PER_PAGE = 12;

export async function fetchNotes(
  currentPage: number,
  search?: string,
  tagName?: string
): Promise<NotesHttpResponse> {
  const cookieStore = await cookies();

  const { data } = await api.get<NotesHttpResponse>("/notes", {
    params: {
      search,
      page: currentPage,
      perPage: PER_PAGE,
      tag: tagName,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
}
export async function fetchNoteById(noteId: Note["id"]): Promise<Note> {
  const cookieStore = await cookies();
  const { data } = await api.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function getMe() {
  const cookieStore = await cookies();
  const { data } = await api.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}
export async function checkSession() {
  const cookieStore = await cookies();
  const res = await api.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
}
