import { useEffect, useMemo, useState, type FC } from 'react';

import { NoteForm, NoteList, SearchBar } from 'components';
import type { Note } from 'types/note';

const LOCAL_STORAGE_KEY = 'notes-app-items';
const DEFAULT_NOTES: Note[] = [
  { id: 1, title: 'Добро пожаловать!', content: 'Это ваша первая заметка!' },
];

const NotesPage: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!savedNotes) {
      return DEFAULT_NOTES;
    }

    try {
      const parsedNotes = JSON.parse(savedNotes) as Note[];
      return parsedNotes.length ? parsedNotes : DEFAULT_NOTES;
    } catch {
      return DEFAULT_NOTES;
    }
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const addNote = (title: string, content: string) => {
    const newNote = { id: Date.now(), title, content };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  const deleteNote = (id: number) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    if (editingNote?.id === id) {
      setEditingNote(null);
    }
  };

  const updateNote = (id: number, title: string, content: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, title, content } : note))
    );
    setEditingNote(null);
  };

  const filteredNotes = useMemo(
    () =>
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [notes, searchTerm]
  );

  return (
    <>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <NoteForm
        onAddNote={addNote}
        editingNote={editingNote}
        onUpdateNote={updateNote}
        onCancelEdit={() => setEditingNote(null)}
      />
      <NoteList
        notes={filteredNotes}
        onDeleteNote={deleteNote}
        onEditNote={setEditingNote}
        editingNote={editingNote}
      />
    </>
  );
};

export default NotesPage;
