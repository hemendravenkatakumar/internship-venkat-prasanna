import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '@/routes';
import { LanguageProvider } from '@/context/LanguageContext';

/**
 * Root Application Component
 * Initializes client-side routing provider, multi-language context, and global application routes.
 */
export function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
