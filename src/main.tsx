import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Fonts are bundled locally so the site is fully self-contained.
import '@fontsource-variable/inter/index.css';
import '@fontsource-variable/space-grotesk/index.css';
import '@fontsource-variable/fraunces/opsz.css';
import '@fontsource/ibm-plex-mono/500.css';
import '@fontsource/ibm-plex-mono/600.css';

import './index.css';
import App from './App.tsx';

// The experience is authored to begin at the ASCII introduction.
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
