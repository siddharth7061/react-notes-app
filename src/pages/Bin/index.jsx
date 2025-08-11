import { Fragment } from "react";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { useNotes } from "../../context/notes-context";
import { NotesCard } from "../../components/NotesCard";

export const Bin = () => {
  const { bin } = useNotes();
  return (
    <Fragment>
      <Navbar />
      <main className="flex gap-3">
        <Sidebar />
        <div className="py-2 flex flex-col items-center w-screen mt-7">
          <div className="flex-wrap">
            {bin?.length > 0 &&
              bin.map((note) => {
                return (
                  <NotesCard
                    key={note.id}
                    id={note.id}
                    title={note.title}
                    text={note.text}
                    page={"bin"}
                  />
                );
              })}
          </div>
        </div>
      </main>
    </Fragment>
  );
};
