import { Fragment } from "react";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { NotesCard } from "../../components/NotesCard";
import { useNotes } from "../../context/notes-context";

export const Important = () => {
  const { important } = useNotes();
  return (
    <Fragment>
      <Navbar />
      <main className="flex gap-3">
        <Sidebar />
        <div className="py-2 flex flex-col items-center w-screen mt-7">
          <div className="flex-wrap">
            {important?.length > 0 &&
              important.map((note) => {
                return (
                  <div className="mt-4">
                    <NotesCard
                      key={note.id}
                      id={note.id}
                      title={note.title}
                      text={note.text}
                      page={"important"}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </main>
    </Fragment>
  );
};
