import { Fragment } from "react";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { useNotes } from "../../context/notes-context";
import { NotesCard } from "../../components/NotesCard";

export const Archive = () => {
  const { title, text, notes, notesDispatch, archive } = useNotes();
  console.log(archive);

  return (
    <Fragment>
      <Navbar />
      <main className="flex gap-3">
        <Sidebar />
        <div className="py-2 flex flex-col items-center w-screen mt-7">
          <div className="flex-wrap ">
            {archive?.length > 0 &&
              archive.map((note) => {
                return (
                  <div className="mt-4">
                    <NotesCard
                      key={note.id}
                      id={note.id}
                      title={note.title}
                      text={note.text}
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
