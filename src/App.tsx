import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { LearnPage } from './pages/LearnPage';
import { LessonPage } from './pages/LessonPage';
import { QuizPage } from './pages/QuizPage';
import { IRPlanPage } from './pages/IRPlanPage';
import { ProgressPage } from './pages/ProgressPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="learn" element={<LearnPage />} />
          <Route path="learn/:id" element={<LessonPage />} />
          <Route path="quiz" element={<QuizPage />} />
          <Route path="quiz/:id" element={<QuizPage />} />
          <Route path="irplan" element={<IRPlanPage />} />
          <Route path="progress" element={<ProgressPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
