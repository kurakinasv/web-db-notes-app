import { NotesPage } from 'pages/NotesPage';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <div className="app-content">
        <header className="app-header">
          <h1>Ваши заметки</h1>
        </header>
        <NotesPage/>
      </div>
      <footer className="app-footer">© 2026 Ваши заметки</footer>
    </div >
  );
};

export default App;
