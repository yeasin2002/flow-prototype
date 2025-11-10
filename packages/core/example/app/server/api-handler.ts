import { defineEventHandler } from 'h3';

// Simple API handler that routes to individual route files
export default defineEventHandler(async (event) => {
  const url = event.node.req.url || '';
  
  // Route to hello endpoint
  if (url.startsWith('/api/hello')) {
    const { default: helloHandler } = await import('./routes/hello.js');
    return helloHandler(event);
  }
  
  // Default 404
  return {
    error: 'Not Found',
    path: url,
  };
});
