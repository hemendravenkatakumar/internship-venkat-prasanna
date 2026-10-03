import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '@/routes';

/**
 * Root Application Component
 * Initializes client-side routing provider and global application routes.
 */
export function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
