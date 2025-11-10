import { defineEventHandler } from 'h3';

export default defineEventHandler(() => {
  return {
    message: 'Hello from @flow API!',
    timestamp: new Date().toISOString(),
  };
});
