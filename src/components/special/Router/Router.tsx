import { Route, Routes } from 'react-router-dom';

import { ApiNotesPage, NotesPage, NotFoundPage } from 'pages';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<NotesPage />} />
      <Route path="/api-notes" element={<ApiNotesPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
