import { useState } from 'react'

import './App.css'

import { SearchBar, NoteForm, NoteList } from './components';
import type { EditingNote } from './types/note';

function App() {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Добро пожаловать!', content: 'Это ваша первая заметка!' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [editingNote, setEditingNote] = useState<EditingNote | null>(null);

  const addNote = (title: string, content: string) => {
    const newNote = { id: Date.now(), title, content };
    setNotes([newNote, ...notes]);
  };

  const deleteNote = (id: number) => setNotes(notes.filter(note => note.id !== id));

  const updateNote = (id: number, title: string, content: string) => {
    setNotes(notes.map(note => note.id === id ? { ...note, title, content } : note));
    setEditingNote(null);
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <div className="app-content">
        <header className="app-header">
          <h1>Ваши заметки</h1>
        </header>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <NoteForm onAddNote={addNote} editingNote={editingNote} onUpdateNote={updateNote} onCancelEdit={() => setEditingNote(null)} />
        <NoteList notes={filteredNotes} onDeleteNote={deleteNote} onEditNote={setEditingNote} editingNote={editingNote} />
      </div>
      <footer className="app-footer">© 2026 Ваши заметки</footer>
    </div >
  );
}

export default App
