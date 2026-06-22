import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IntroAnimation } from './pages/IntroAnimation';
import { router } from './app/router';
import './locales/i18n';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './components/layout/Header/useTheme';
import { CursorBlur } from './components/ui/CursorBlur/CursorBlur';
import { Toaster } from '../src/components/shared/Toastify/sonner';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <CursorBlur />
          <IntroAnimation>
            <Toaster position="bottom-right" />
            <RouterProvider router={router} />
          </IntroAnimation>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
