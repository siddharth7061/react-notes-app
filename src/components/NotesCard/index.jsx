import { useNotes } from "../../context/notes-context";
import { Important } from "../../pages/Important";
import { findNotes } from "../../utils/findNotes";

export const NotesCard = ({ id, title, text, isPinned, page }) => {
  const { notesDispatch, important, archive } = useNotes();
  const onPinClick = (id) => {
    notesDispatch({
      type: "PIN",
      payload: { id },
    });
  };

  const onArchiveClick = (id) => {
    notesDispatch({
      type: "ARCHIVE",
      payload: { id },
    });
  };

  const onImportantClick = (id) => {
    notesDispatch({
      type: "IMPORTANT",
      payload: { id },
    });
  };

  // Find note in important to manipulate the icon
  const isImportant = findNotes(important, id) ? true : false;
  return (
    <div
      key={id}
      className="w-56 border border-dashed border-slate-400 p-2 rounded-md text-slate-800"
    >
      <div className="flex justify-between border-b-1 border-slate-300">
        <p>{title}</p>
        <div>
          {page === "home" ? (
            <button onClick={() => onPinClick(id)}>
              <span
                className={
                  isPinned ? "material-icons" : "material-symbols-outlined"
                }
              >
                push_pin
              </span>
            </button>
          ) : (
            <></>
          )}
          {page === "home" || page === "important" ? (
            <button onClick={() => onImportantClick(id)}>
              <span
                className={
                  isImportant ? "material-icons" : "material-symbols-outlined"
                }
              >
                label_important
              </span>
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <p className="mr-auto">{text}</p>
        <div className="ml-auto">
          {page == "home" || page == "archive" ? (
            <button onClick={() => onArchiveClick(id)}>
              {archive.find((note) => note.id === id) ? (
                <span class="material-icons">archive</span>
              ) : (
                <span class="material-symbols-outlined">archive</span>
              )}
            </button>
          ) : (
            <></>
          )}
          <button>
            <span {...{ class: "material-symbols-outlined" }}>delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};
