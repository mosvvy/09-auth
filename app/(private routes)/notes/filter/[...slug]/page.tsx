import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNoteById, fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

interface NotesByCatProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: NotesByCatProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];

  if (!tag)
    return {
      title: `Notes | NoteHub`,
      description: `All notes`,
      openGraph: {
        title: "Notes page | NoteHub",
        description: "All notes",
        url: "https://08-zustand-seven-self.vercel.app/notes/filter/all",
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: "NoteHub",
          },
        ],
      },
    };

  return {
    title: `Notes: ${tag} | NoteHub`,
    description: `Notes filtered by tag: ${tag}`,

    openGraph: {
      title: `${tag} notes | NoteHub`,
      description: `Notes filtered by tag: ${tag}`,
      url: `https://08-zustand-seven-self.vercel.app/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub",
        },
      ],
    },
  };
}

const NotesByCat = async ({ params }: NotesByCatProps) => {
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, tag],
    queryFn: () => fetchNotes("", 1, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesByCat;
