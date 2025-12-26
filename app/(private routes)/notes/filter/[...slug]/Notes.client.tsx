/**
 * Реалізуйте сторінковий компонент Notes у маршруті /notes як SSR-компонент,
 * де заздалегідь виконується prefetch (попереднє завантаження даних через
 * TanStack Query) з гідратацією кешу. Усю клієнтську логіку (отримання списку
 * нотаток за допомогою useQuery та їх відображення) винесіть в окремий файл
 * компонента app/notes/Notes.client.tsx.
 */

"use client";

import { useEffect, useState } from "react";
import { fetchNotes } from "@/lib/api/clientApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";

import css from "../NotesPage.module.css";
import Link from "next/link";

interface NotesClientProps {
  tag?: string;
}

function NotesClient({ tag }: NotesClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useQuery({
    queryKey: ["notes", currentPage, searchQuery, tag],
    queryFn: () => fetchNotes(currentPage, searchQuery, tag),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  const handleSearch = async (newQuery: string) => {
    setSearchQuery(newQuery);
    setCurrentPage(1);
  };

  const onSearchQueryChange = useDebouncedCallback(
    (query: string) => handleSearch(query),
    300
  );

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox onChange={onSearchQueryChange} />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageClick={setCurrentPage}
        />
        {
          <Link className={css.button} href="/notes/action/create">
            Create note +
          </Link>
        }
      </div>
      {data && data.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        <p>No notes found</p>
      )}
    </div>
  );
}

export default NotesClient;
