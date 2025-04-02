import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Layout } from './components/Layout';
import { IssueList } from './components/IssueList';
import { CreateIssueForm } from './components/CreateIssueForm';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<IssueList />} />
            <Route path="/create" element={<CreateIssueForm />} />
            <Route path="/my-issues" element={<IssueList />} />
            <Route path="/assigned" element={<IssueList />} />
            <Route path="/labels" element={<div>Labels Page</div>} />
            <Route path="/projects" element={<div>Projects Page</div>} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
