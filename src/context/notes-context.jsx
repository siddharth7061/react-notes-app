import { useContext, useReducer, createContext } from "react";
import { notesReducer } from "../reducers/notesReducer";

const NotesContext = createContext();

const NotesProvider = ({ children }) => {
  const initialState = {
    title: "",
    text: "",
    notes: [],
    archive: [],
    important: [],
    bin: [],
  };

  const [{ title, text, notes, archive, important, bin }, notesDispatch] =
    useReducer(notesReducer, initialState);
  return (
    <NotesContext.Provider
      value={{ title, text, notes, archive, important, bin, notesDispatch }}
    >
      {children}
    </NotesContext.Provider>
  );
};

const useNotes = () => useContext(NotesContext);
export { NotesProvider, useNotes };
