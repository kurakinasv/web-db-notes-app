import { Header, Router } from 'components/special';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <div className="app-content">
        <Header />
        <Router />
      </div>
      <footer className="app-footer">© 2026 Ваши заметки</footer>
    </div >
  );
};

export default App;
