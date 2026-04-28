import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => (
  <div className="error-page">
    <div className="error-content">
      <h1>Страница не найдена</h1>
      <Link to="/" className="btn-primary">
        На главную
      </Link>
    </div>
  </div>
);

export default NotFoundPage;
