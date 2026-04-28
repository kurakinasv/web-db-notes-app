import * as React from 'react';

import IconTrash from '../../assets/trash.svg?react';
import IconPencil from '../../assets/pencil.svg?react';
import type { EditingNote } from '../../types/note';

import './NoteItem.css';

type Props = {
  note: EditingNote;
  onDelete: (id: number) => void;
  onEdit: (note: EditingNote) => void;
  isEditing: boolean;
}

const NoteItem: React.FC<Props> = ({ note, onDelete, onEdit, isEditing }) => {
  return (
    <div className={`note-card note-item animate-fadeIn ${isEditing ? 'editing' : ''}`}>
      <div className="note-header">
        <h3 className="note-title">{note.title}</h3>
        <div className="note-actions">
          <button onClick={() => onEdit(note)} className="icon-btn" aria-label="Edit note">
            <IconPencil width={16} height={16} className="icon-pencil" />
          </button>
          <button onClick={() => onDelete(note.id)} className="icon-btn" aria-label="Delete note">
            <IconTrash width={16} height={16} />
          </button>
        </div>
      </div>
      <p className="note-content">{note.content}</p>
    </div>
  );
};

export default NoteItem;
