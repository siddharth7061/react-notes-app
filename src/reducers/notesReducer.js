import { v4 as uuid } from "uuid";
import { findNotes } from "../utils/findNotes";
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
      // Fteching note from the Archive array
      const notesInArchive = findNotes(state.archive, payload.id);

      // Fetching note from the
      const noteInNotes = findNotes(state.notes, payload.id);

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
