import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import Footer from '../Footer/Footer';
import { ScrollToTop } from './ScrollToTop.ts';
import { AuthPromptModal } from '../../ui/AuthPromptModal';
import { useState, useEffect } from 'react';
import { BookAdvisorChat } from '../../shared/BookAdvisorChat';
import { SoundMenu } from '../../shared/SoundMenu/SoundMenu.tsx';

export function AppLayout() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenAuthModal = () => {
      setIsAuthModalOpen(true);
    };

    window.addEventListener('openAuthModal', handleOpenAuthModal);

    return () => {
      window.removeEventListener('openAuthModal', handleOpenAuthModal);
    };
  }, []);

  return (
    <>
      <ScrollToTop />

      <Header
        isAuthModalOpen={isAuthModalOpen}
        setIsAuthModalOpen={setIsAuthModalOpen}
      />

      <main className="main-content">
        <Outlet />
      </main>

      <Footer />
      <SoundMenu />

      <AuthPromptModal />

      <BookAdvisorChat />
    </>
  );
}
