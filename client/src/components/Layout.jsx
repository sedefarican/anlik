// components/Layout.jsx

import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, theme, setTheme }) => {
  return (
    <>
      <Header onThemeToggle={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
