import { Fragment } from "react";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { NotesCard } from "../../components/NotesCard";
import { useNotes } from "../../context/notes-context";

export const Home = () => {
  const { title, text, notes, notesDispatch, archive } = useNotes();
  const onTitleChange = (e) => {
    notesDispatch({
      type: "TITLE",
      payload: e.target.value,
    });
  };

  const onTextChange = (e) => {
    notesDispatch({
      type: "TEXT",
      payload: e.target.value,
    });
  };

  const onAddClick = (e) => {
    notesDispatch({
      type: "ADD_NOTE",
      payload: e.target.value,
    });

    notesDispatch({
      type: "CLEAR_INPUT",
    });
  };

  console.log(archive);

  const pinnedNotes =
    notes?.length > 0 && notes.filter((note) => note.isPinned === true);
  const otherNotes =
    notes?.length > 0 && notes.filter((note) => note.isPinned === false);

  return (
    <Fragment>
      <Navbar />
      <main className="flex gap-3">
        <Sidebar />
        <div className="py-2 flex flex-col items-center w-screen mt-7">
          <div className="flex flex-col w-[300px] border-red-400 relative">
            <input
              value={title}
              className="border border-neutral-800 rounded-t-md focus:outline-none border-b-0 p-1 text-slate-800"
              onChange={onTitleChange}
              placeholder="Enter Title"
            ></input>
            <textarea
              value={text}
              className="border border-neutral-800 rounded-b-md focus:outline-none border-t-0 p-1 text-slate-800"
              onChange={onTextChange}
              placeholder="Enter text"
            ></textarea>
            <button
              disabled={title.length === 0}
              className="absolute bottom-1 right-1 bg-indigo-800 text-slate-50 rounded-full w-7 h-7 flex-align"
              onClick={onAddClick}
            >
              <span class="material-symbols-outlined">add</span>
            </button>
          </div>
          <div className="py-5 flex-wrap">
            {pinnedNotes?.length > 0 && (
              <>
                <h3 className="text-slate-800 text-2xl font-bold flex item-start">
                  Pinned Notes
                </h3>
                <div className="flex-wrap gap-6 py-2">
                  {pinnedNotes?.length > 0 &&
                    pinnedNotes.map(({ id, title, text, isPinned }) => {
                      return (
                        <div className="mt-4">
                          <NotesCard
                            key={id}
                            id={id}
                            title={title}
                            text={text}
                            isPinned={isPinned}
                          />
                        </div>
                      );
                    })}
                </div>
              </>
            )}
          </div>
          <div className="py-5 flex-wrap">
            {pinnedNotes?.length > 0 && (
              <h3 className="text-slate-800 text-2xl font-bold flex item-start">
                Other Notes
              </h3>
            )}
            <div className="flex-wrap gap-6 py-2">
              {otherNotes?.length > 0 &&
                otherNotes.map(({ id, title, text, isPinned }) => {
                  return (
                    <div className="mt-4">
                      <NotesCard
                        key={id}
                        id={id}
                        title={title}
                        text={text}
                        isPinned={isPinned}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};
