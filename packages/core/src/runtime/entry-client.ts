/**
 * Client entry point template
 * This will be used to generate the actual entry-client.tsx
 */

export const clientEntryTemplate = `
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

// Import generated routes
import { routes } from 'virtual:@flow-routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

// Restore server data
const initialData = (window as any).__@flow_DATA__;

// Hydrate
hydrateRoot(
  document.getElementById('root')!,
  <App />
);
`;

export function generateClientEntry(routes: any[]) {
  return clientEntryTemplate;
}