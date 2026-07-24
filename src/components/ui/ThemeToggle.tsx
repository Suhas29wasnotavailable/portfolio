import { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

type Theme = 'dark' | 'light';

/** Read the theme the pre-paint script already committed to <html>. */
function currentTheme(): Theme {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

/**
 * A single sun/moon switch. It flips the `data-theme` attribute on the
 * root element — every color token in the stylesheet is bound to that,
 * so one attribute change re-paints the whole site. The choice is saved
 * to localStorage and re-applied before first paint (see index.html).
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(currentTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* storage may be unavailable (private mode) — the toggle still works */
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#f4f3ee' : '#050508');
  }, [theme]);

  const isLight = theme === 'light';

  return (
    <button
      type="button"
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      className="cursor-target text-mist transition-colors duration-300 hover:text-holo"
    >
      {isLight ? <FiMoon size={17} /> : <FiSun size={17} />}
    </button>
  );
}
