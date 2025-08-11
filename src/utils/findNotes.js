export const findNotes = (note_array, note_id) => {
  return note_array.find(({ id }) => id === note_id);
};
