import { useNotes } from "../../context/notes-context";

export const NotesCard = ({ id, title, text, isPinned }) => {
  const { notesDispatch, archive } = useNotes();
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
  return (
    <div
      key={id}
      className="w-56 border border-dashed border-slate-400 p-2 rounded-md text-slate-800"
    >
      <div className="flex justify-between border-b-1 border-slate-300">
        <p>{title}</p>
        <button onClick={() => onPinClick(id)}>
          <span
            className={
              isPinned ? "material-icons" : "material-symbols-outlined"
            }
          >
            push_pin
          </span>
        </button>
      </div>
      <div className="flex flex-col">
        <p className="mr-auto">{text}</p>
        <div className="ml-auto">
          <button onClick={() => onArchiveClick(id)}>
            {archive.find((note) => note.id === id) ? (
              <span class="material-icons">archive</span>
            ) : (
              <span class="material-symbols-outlined">archive</span>
            )}
          </button>
          <button>
            <span {...{ class: "material-symbols-outlined" }}>delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};
