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
  };

  const [{ title, text, notes, archive, important }, notesDispatch] =
    useReducer(notesReducer, initialState);
  return (
    <NotesContext.Provider
      value={{ title, text, notes, archive, important, notesDispatch }}
    >
      {children}
    </NotesContext.Provider>
  );
};

const useNotes = () => useContext(NotesContext);
export { NotesProvider, useNotes };
