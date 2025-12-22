"use client";

import { useId } from "react";
import css from "./NoteForm.module.css";
import { createNote } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { CreateNoteData } from "@/types/note";
import { useNoteDraft } from "@/lib/store/noteStore";

export default function NoteForm() {
  const fieldId = useId();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteDraft();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateNoteData) =>
      createNote(data.title, data.content, data.tag),
  });

  const handleSubmit = (formData: FormData) => {
    const title = (formData.get("title") as string).trim();
    const content = (formData.get("content") as string).trim();
    const tag = formData.get("tag") as string;

    if (!title || !content) {
      alert("Please fill all the fields to create new note");
      return;
    }

    mutate(
      { title: title, content: content, tag: tag },
      {
        onSuccess: (data) => {
          console.log("Created note:", data);
          queryClient.invalidateQueries({ queryKey: ["notes"] });
          clearDraft();
          router.push("/notes/filter/all");
        },
        onError: (error) => {
          console.log(error.message);
        },
      }
    );
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setDraft({ ...draft, [name]: value });
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          type="text"
          name="title"
          id={`${fieldId}-title`}
          value={draft.title}
          className={css.input}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          rows={8}
          name="content"
          id={`${fieldId}-content`}
          value={draft.content}
          className={css.textarea}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select
          name="tag"
          id={`${fieldId}-tag`}
          value={draft.tag}
          className={css.select}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          onClick={() => router.push("/notes/filter/all")}
          className={css.cancelButton}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={css.submitButton}
          disabled={isPending && true}
        >
          {isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
}
