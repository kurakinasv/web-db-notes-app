import * as React from 'react';

import type { EditingNote } from '../../types/note';

import './NoteForm.css';

type Props = {
  onAddNote: (title: string, content: string) => void;
  editingNote: EditingNote | null;
  onUpdateNote: (id: number, title: string, content: string) => void;
  onCancelEdit: () => void;
}

const NoteForm: React.FC<Props> = ({ onAddNote, editingNote, onUpdateNote, onCancelEdit }) => {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [isExpanded, setIsExpanded] = React.useState(false);

  React.useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
      setIsExpanded(true);
    }
  }, [editingNote]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() && !content.trim()) return;

    if (editingNote) {
      onUpdateNote(editingNote.id, title, content);
    } else {
      onAddNote(title || 'Untitled', content);
    }
    setTitle(''); setContent(''); setIsExpanded(false);
  };

  const handleCancel = () => {
    setTitle(''); setContent(''); setIsExpanded(false);
    if (editingNote) onCancelEdit();
  };

  return (
    <form onSubmit={handleSubmit} className="note-form note-card animate-fadeIn" data-name="note-form" data-file="components/NoteForm.js">
      <input type="text" placeholder="Заголовок заметки..." value={title} onChange={(e) => setTitle(e.target.value)}
        onFocus={() => setIsExpanded(true)} className="title-input" aria-label="Note title" />
      {isExpanded && (
        <div className="animate-fadeIn">
          <textarea placeholder="Текст заметки..." value={content} onChange={(e) => setContent(e.target.value)}
            rows={3} className="content-input" aria-label="Note content" />
          <div className="form-actions">
            <button type="button" onClick={handleCancel} className="btn-secondary">Отмена</button>
            <button type="submit" className="btn-primary">
              {editingNote ? 'Обновить' : 'Добавить заметку'}
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default NoteForm;
