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

    case "ARCHIVE": {
      // Fteching note from the Archive array
      const noteInArchive = findNotes(state.archive, payload.id);

      // Fetching note from the Notes array
      const noteInNotes = findNotes(state.notes, payload.id);

      // Archiving
      if (noteInNotes) {
        return {
          ...state,
          archive: [...state.archive, noteInNotes],
          notes: state.notes.filter(({ id }) => id !== payload.id),
        };
      } else if (noteInArchive) {
        // Unarchiving
        return {
          ...state,
          notes: [
            ...state.notes,
            {
              ...noteInArchive,
              isPinned: false,
            },
          ],
          archive: state.archive.filter(({ id }) => id !== payload.id),
        };
      }
    }

    case "IMPORTANT": {
      // Fetchig note from Important notes array
      const noteInImportant = findNotes(state.important, payload.id);

      // Remove Note from important
      if (noteInImportant) {
        return {
          ...state,
          important: state.important.filter(({ id }) => id !== payload.id),
        };
      } else {
        // Add note to important

        // Fetching note from the Notes array
        const note =
          findNotes(state.notes, payload.id) ||
          findNotes(state.archive, payload.id);

        //return state as it is if not found anywhere
        if (!note) return state;

        return {
          ...state,
          important: [...state.important, note],
        };
      }
    }

    case "BIN": {
      // Fetching note from notes array
      const noteInNotes = findNotes(state.notes, payload.id);
      // Fteching note from bin array
      const noteInBin = findNotes(state.bin, payload.id);

      if (noteInNotes) {
        // Delete Note
        return {
          ...state,
          bin: [...state.bin, noteInNotes],
          notes: state.notes.filter((note) => note.id !== payload.id),
          archive: state.archive.filter((note) => note.id !== payload.id),
          important: state.important.filter((note) => note.id !== payload.id),
        };
      } else {
        return {
          ...state,
          notes: [...state.notes, noteInBin],
          bin: state.bin.filter(({ id }) => id !== payload.id),
        };
      }
    }

    default:
      return state;
  }
};
