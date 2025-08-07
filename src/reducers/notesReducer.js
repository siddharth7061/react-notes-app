import { v4 as uuid } from "uuid";
export const notesReducer = (state, { type, payload }) => {
  switch (type) {
    case "TITLE":
      return {
        ...state,
        title: payload,
      };

    case "TEXT":
      return {
        ...state,
        text: payload,
      };

    case "ADD_NOTE":
      return {
        ...state,
        notes: [
          ...state.notes,
          { title: state.title, text: state.text, id: uuid(), isPinned: false },
        ],
      };

    case "CLEAR_INPUT":
      return {
        ...state,
        title: "",
        text: "",
      };

    case "PIN":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === payload.id ? { ...note, isPinned: !note.isPinned } : note
        ),
      };

    case "ARCHIVE":
      const notesInArchive = state.archive.find(({ id }) => id === payload.id);
      const noteInNotes = state.notes.find(({ id }) => id === payload.id);

      // Archiving
      if (noteInNotes) {
        return {
          ...state,
          archive: [...state.archive, noteInNotes],
          notes: state.notes.filter(({ id }) => id !== payload.id),
        };
      } else if (notesInArchive) {
        // Unarchiving
        return {
          ...state,
          notes: [
            ...state.notes,
            {
              ...notesInArchive,
              isPinned: false,
            },
          ],
          archive: state.archive.filter(({ id }) => id !== payload.id),
        };
      }

    default:
      return state;
  }
};
