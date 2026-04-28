import * as React from 'react';
import { NoteItem } from '../NoteItem';

import type { EditingNote } from '../../types/note';

import './NoteList.css';

type Props = {
  notes: EditingNote[];
  onDeleteNote: (id: number) => void;
  onEditNote: (note: EditingNote) => void;
  editingNote: EditingNote | null;
}

const NoteList: React.FC<Props> = ({ notes, onDeleteNote, onEditNote, editingNote }) => {
  if (notes.length === 0) {
    return (
      <div className="empty-state animate-fadeIn">
        <h3>Нет заметок</h3>
        <p>Начните добавлять заметки</p>
      </div>
    );
  }

  return (
    <div className="notes-grid" role="list">
      {notes.map(note => (
        <NoteItem key={note.id} note={note} onDelete={onDeleteNote} onEdit={onEditNote} isEditing={editingNote?.id === note.id} />
      ))}
    </div>
  );
};

export default NoteList;
